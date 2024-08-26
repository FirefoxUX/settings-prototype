<script lang="ts">
  import MozButton from '@src/atoms/MozButton.svelte'
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import MozIcon from '@src/atoms/MozIcon.svelte'
  import MozInput from '@src/atoms/MozInput.svelte'
  import { SEPARATOR } from '@src/config-schema'
  import configStore from '@src/ConfigStore'
  import PageContentEditor from './PageContentEditor.svelte'
  import IconDropdown from './input/IconDropdown.svelte'

  let currentPage: string | undefined = undefined

  $: allPages = Object.keys($configStore.config.pageDefinitions).map(
    (page) => ({
      value: page,
      label: page,
    }),
  )

  function updateCurrentPage(allPages: any[]) {
    if (
      !currentPage ||
      !allPages.map((page) => page.value).includes(currentPage)
    ) {
      currentPage = allPages[0]?.value
    }
  }
  $: updateCurrentPage(allPages)

  let deleteClicked = false

  function deleteCurrentPage() {
    if (deleteClicked) {
      if (currentPage === undefined) return
      configStore.update((store) => {
        delete $configStore.config.pageDefinitions[currentPage!]
        return store
      })
      currentPage = allPages[0]?.value
      deleteClicked = false
    } else {
      deleteClicked = true
    }
  }

  function addPage() {
    const newPageId = prompt('Enter the new page id')
    if (!newPageId) return
    configStore.update((store) => {
      store.config.pageDefinitions[newPageId] = {
        title: newPageId,
        content: [],
      }
      return store
    })
    currentPage = newPageId
  }
</script>

<div class="editor">
  <section class="inputs top">
    <label for="page">Page</label>
    <MozDropdown
      id="page"
      bind:value={currentPage}
      items={allPages}
      fillWidth
    />
    <MozButton
      iconName="delete-16"
      type={deleteClicked ? 'destructive' : 'default'}
      on:click={deleteCurrentPage}
      on:blur={() => (deleteClicked = false)}
    />
    <MozButton iconName="add-16" on:click={addPage} />
  </section>
  {#if currentPage}
    <section class="inputs">
      <label for="page-id">ID</label>
      <MozInput id="page-id" disabled value={currentPage} />
      <label for="page-title">Title</label>
      <MozInput
        id="page-title"
        bind:value={$configStore.config.pageDefinitions[currentPage].title}
      />
      <label for="page-title">Icon</label>
      <IconDropdown
        id="page-icon"
        bind:valueObj={$configStore.config.pageDefinitions[currentPage]}
        valueKey="icon"
        canBeUndefined
      />
    </section>
    <PageContentEditor
      bind:pagecontent={$configStore.config.pageDefinitions[currentPage]
        .content}
    />
  {/if}
</div>

<style lang="sass">
.editor
  padding: utils.$size-16

.inputs
  display: grid
  grid-template-columns: auto 1fr
  gap: utils.$size-8 utils.$size-32
  align-items: center
  margin-block-end: utils.$size-32
  &.top
    grid-template-columns: auto 1fr auto auto
    gap: utils.$size-8
</style>
