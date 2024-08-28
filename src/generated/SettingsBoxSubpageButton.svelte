<script lang="ts" context="module">
  import SubpageButton from '@src/components/SubpageButton.svelte'
  import SettingsBox from '@src/components/SettingsBox.svelte'
  import prefStore from '@src/PrefStore'
  import configStore from '@src/ConfigStore'

  export type SettingsBoxSubpageButtonConfig = {
    pageId: string
    disabled?: DisabledByPref
    props: SubpageButton['$$prop_def']
  }
</script>

<script lang="ts">
  import { boolInv, type DisabledByPref } from '@src/utils'

  export let config: SettingsBoxSubpageButtonConfig

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

<SubpageButton
  {...config.props}
  disabled={!!config?.disabled?.pref &&
    isDisabled(config?.disabled, $prefStore[config.disabled.pref])}
  on:click={() => configStore.goToSubpage(config.pageId)}
/>


