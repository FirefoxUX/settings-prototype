<script lang="ts">
  import SettingsBoxItem, {
    type SettingsBoxGroupItemConfig,
  } from './SettingsBoxItem.svelte'
  import SettingsBoxRadioGroup from './SettingsBoxRadioGroup.svelte'

  export let config: (
    | ({
        groupKind: 'item'
      } & SettingsBoxGroupItemConfig)
    | ({
        groupKind: 'radio-group'
      } & SettingsBoxRadioGroup['$$prop_def'])
  )[]

  function removeGroupKind(item: any) {
    const { groupKind, ...rest } = item
    return rest
  }
</script>

<div class="btn-group">
  {#each config as item}
    {#if item.groupKind === 'item'}
      <SettingsBoxItem config={removeGroupKind(item)} />
    {:else if item.groupKind === 'radio-group'}
      <SettingsBoxRadioGroup {...removeGroupKind(item)} />
    {/if}
  {/each}
</div>

<style lang="sass">
.btn-group
  display: flex
  flex-direction: column
  border: 1px solid var(--border-color-default)
  border-radius: var(--border-radius-medium)
  > :global(:not(:last-child)), :global(*[role="radiogroup"] > :not(:last-child))
    border-bottom: 1px solid var(--border-color-default)
  > :global(:not(:first-child) .subpage-button), > :global(:not(:first-child).subpage-button)
    border-top-right-radius: 0
    border-top-left-radius: 0
  > :global(:not(:last-child) .subpage-button), > :global(:not(:last-child).subpage-button)
    border-bottom-right-radius: 0
    border-bottom-left-radius: 0
</style>
