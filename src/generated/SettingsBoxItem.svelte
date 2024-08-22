<script lang="ts" context="module">
  import SubpageButton from '@src/components/SubpageButton.svelte'
  import SettingsBox from '@src/components/SettingsBox.svelte'
  import prefStore from '@src/PrefStore'
  import configStore from '@src/ConfigStore'

  export type SettingsBoxGroupItemConfig =
    | {
        kind: 'subpage-button'
        pageId: string
        disabled?: DisabledByPref
        props: SubpageButton['$$prop_def']
      }
    | {
        kind: 'settings-box'
        disabled?: DisabledByPref
        pageId?: string
        props?: SettingsBox['$$prop_def']
        content: CardContentConfig[]
      }
</script>

<script lang="ts">
  import type { CardContentConfig } from '@src/generated/CardContent.svelte'
  import CardContent from '@src/generated/CardContent.svelte'
  import { boolInv, type DisabledByPref } from '@src/utils'

  export let config: SettingsBoxGroupItemConfig

  function isDisabled(
    config?: DisabledByPref,
    pref?: string | number | boolean,
  ): boolean {
    if (!config?.pref) return false
    return boolInv(
      config.matchValue ? config.matchValue === pref : !!pref,
      config.invert,
    )
  }
</script>

{#if config.kind === 'subpage-button'}
  <SubpageButton
    {...config.props}
    disabled={!!config?.disabled?.pref &&
      isDisabled(config?.disabled, $prefStore[config.disabled.pref])}
    on:click={() => configStore.goToSubpage(config.pageId)}
  />
{:else if config.kind === 'settings-box'}
  <SettingsBox
    {...config.props}
    subpageDisabled={!!config?.disabled?.pref &&
      isDisabled(config?.disabled, $prefStore[config.disabled.pref])}
    on:click={() => config.pageId && configStore.goToSubpage(config.pageId)}
  >
    {#each config.content as content}
      <CardContent config={content} />
    {/each}
  </SettingsBox>
{/if}

<style lang="sass">

</style>
