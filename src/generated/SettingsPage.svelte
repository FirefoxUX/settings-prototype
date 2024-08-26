<script lang="ts" context="module">
  export type PageContent =
    | {
        kind: 'custom-component'
        name: string
      }
    | ({
        kind: 'card'
      } & CardConfig)
</script>

<script lang="ts">
  import PageHeader from '@src/components/PageHeader.svelte'
  import configStore, { SEARCH_PAGE_ID } from '@src/ConfigStore'
  import type { CardConfig } from './SettingsCard.svelte'
  import SettingsCard from './SettingsCard.svelte'
  import CustomComponent from './CustomComponent.svelte'

  function getPageData(pageId: string, store: typeof $configStore) {
    return store.config.pageDefinitions[pageId]
  }

  $: currentPageId = $configStore.path[$configStore.path.length - 1]
  $: currentPageData = getPageData(currentPageId, $configStore)

  // remove last element
  $: breadcrumbs = $configStore.path.slice(0, -1).map((pageId) => {
    return {
      label: getPageData(pageId, $configStore).title,
      onClick: () => configStore.popToPage(pageId),
    }
  })
</script>

<PageHeader
  title={currentPageData.title}
  iconName={currentPageData.icon}
  {breadcrumbs}
/>

{#each currentPageData.content as content}
  {#if content.kind === 'custom-component'}
    <CustomComponent name={content.name} />
  {:else if content.kind === 'card'}
    <SettingsCard {content} />
  {/if}
{/each}

<style lang="sass">

</style>
