<script lang="ts" context="module">
  import SettingsBox from '@src/components/SettingsBox.svelte'
  import prefStore from '@src/PrefStore'
  import configStore from '@src/ConfigStore'

  export type SettingsBoxItemConfig = {
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

  export let config: SettingsBoxItemConfig

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


