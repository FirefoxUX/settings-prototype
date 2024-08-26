<script lang="ts">
  import type { SettingsBoxItemConfig } from './SettingsBoxItem.svelte'
  import SettingsBoxItem from './SettingsBoxItem.svelte'
  import SettingsBoxRadioGroup from './SettingsBoxRadioGroup.svelte'
  import type { SettingsBoxSubpageButtonConfig } from './SettingsBoxSubpageButton.svelte'
  import SettingsBoxSubpageButton from './SettingsBoxSubpageButton.svelte'

  export let config: (
    | ({
        kind: 'subpage-button'
      } & SettingsBoxSubpageButtonConfig)
    | ({
        kind: 'item'
      } & SettingsBoxItemConfig)
    | ({
        kind: 'radio-group'
      } & SettingsBoxRadioGroup['$$prop_def'])
  )[]

  function removeKind(item: any) {
    const { kind, ...rest } = item
    return rest
  }
</script>

<div class="btn-group">
  {#each config as item}
    {#if item.kind === 'item'}
      <SettingsBoxItem config={removeKind(item)} />
    {:else if item.kind === 'subpage-button'}
      <SettingsBoxSubpageButton config={removeKind(item)} />
    {:else if item.kind === 'radio-group'}
      <SettingsBoxRadioGroup {...removeKind(item)} />
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
