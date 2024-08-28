<script lang="ts">
  import MozButton from '@src/atoms/MozButton.svelte'
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import MozInput from '@src/atoms/MozInput.svelte'
  import prefStore, { defaultPrefs } from '@src/PrefStore'

  const PREF_TYPES = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
  ]

  let search = ''
  let newPrefType = PREF_TYPES[0].value

  let editMode: string | undefined = undefined
  let editValue: string | undefined = undefined

  function valueHasBeenChanged(name: string, prefStore: any) {
    return defaultPrefs[name] !== prefStore[name]
  }

  function enterEditMode(name: string) {
    editMode = name
    editValue = `${$prefStore[name]}`
  }

  function cancelEditMode() {
    editMode = undefined
    editValue = undefined
  }

  function saveEditMode() {
    if (editMode === undefined || editValue === undefined) return
    if (typeof $prefStore[editMode] === 'boolean') {
      const value = editValue.toLowerCase()
      if (value === 'true' || value === 'false') {
        prefStore.setPref(editMode, value === 'true')
      } else {
        cancelEditMode()
        return
      }
    } else if (typeof $prefStore[editMode] === 'number') {
      const value = Number(editValue)
      if (!isNaN(value)) {
        prefStore.setPref(editMode, value)
      } else {
        cancelEditMode()
        return
      }
    } else {
      prefStore.setPref(editMode, `${editValue}`)
    }
    cancelEditMode()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      cancelEditMode()
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      saveEditMode()
    }
  }

  function createPref() {
    if (search === '') return
    // create pref with default value of the selected type
    switch (newPrefType) {
      case 'string':
        prefStore.setPref(search, '')
        editMode = search
        break
      case 'number':
        prefStore.setPref(search, 0)
        editMode = search
        break
      case 'boolean':
        prefStore.setPref(search, false)
        break
    }
    newPrefType = PREF_TYPES[0].value
  }

  $: filteredPrefs = Object.entries($prefStore).filter(([name, value]) => {
    if (search === '') return true
    return name.includes(search)
  })
</script>

<div class="prefs">
  <MozInput
    bind:value={search}
    iconName="search-16"
    placeholder="Search"
    clearButton
  />

  {#if filteredPrefs.length > 0}
    <table id="prefs">
      {#each filteredPrefs as [name, value]}
        <tr class:changed={valueHasBeenChanged(name, $prefStore)}>
          <td class="name">{name}</td>
          <td class="value">
            {#if editMode === name}
              <!-- svelte-ignore a11y-autofocus -->
              <input
                type="text"
                bind:value={editValue}
                on:keydown={handleKeydown}
                autofocus
              />
            {:else}
              {value}
            {/if}
          </td>
          <td class="action">
            <!-- if the pref is a boolean, show sync -->
            {#if typeof value === 'boolean'}
              <MozButton
                title="Toggle"
                iconName="sync-16"
                on:click={() => prefStore.toggleBooleanPref(name)}
              />
            {:else if editMode === name}
              <MozButton
                title="Save"
                type="primary"
                iconName="checkmark-16"
                on:click={saveEditMode}
              />
            {:else}
              <MozButton
                title="Edit"
                iconName="edit-16"
                on:click={() => enterEditMode(name)}
              />
            {/if}
          </td>
          <td class="action">
            {#if valueHasBeenChanged(name, $prefStore)}
              <MozButton
                title="Reset"
                iconName="arrow-counterclockwise-16"
                on:click={() => prefStore.resetPref(name)}
              />
            {/if}
          </td>
        </tr>
      {/each}
    </table>
  {/if}

  <!-- if there is no exact pref with this name, offer to add it -->
  {#if search !== '' && $prefStore[search] === undefined}
    <table id="prefs">
      <tr>
        <td class="name">{search}</td>
        <td class="value">
          <MozDropdown id="type" bind:value={newPrefType} items={PREF_TYPES} />
        </td>
        <td class="action">
          <MozButton
            title="Add"
            type="primary"
            iconName="add-16"
            on:click={createPref}
          />
        </td>
      </tr>
    </table>
  {/if}
</div>

<style lang="sass">

.prefs
  padding: utils.$size-16

table
  margin-block-start: utils.$size-16
  border: 1px solid var(--border-color-interactive)
  border-spacing: 0
  border-radius: utils.$size-4
  width: 100%
  box-sizing: border-box
  table-layout: fixed
  font-size: inherit

tr.changed
  font-weight: var(--font-weight-bold)

td
  padding: utils.$size-8
  font-size: utils.$size-12
  color: var(--text-color)
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  font-size: inherit
  &.name, &.value
    // should shrink to fit content
    width: auto
  &.value input
    width: calc(100% - utils.$size-8)
    padding: utils.$size-4
    font: inherit
  &.action
    width: 32px
    padding-inline-start: 0

// color odd tr
tr:nth-child(odd)
  background-color: rgba(12, 12, 13, 0.05)

</style>
