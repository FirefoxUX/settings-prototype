<script lang="ts">
  import InputLabel from '@src/components/InputLabel.svelte'
  import SettingsBox from '@src/components/SettingsBox.svelte'
  import prefStore from '@src/PrefStore'
  import configStore from '@src/ConfigStore'
  import { type DisabledByPref, boolInv, generateId } from '@src/utils'

  type Item = {
    value: string | number | boolean
    label: InputLabel['label']
    description?: InputLabel['description']
    learnMore?: InputLabel['learnMore']
    subpage?: {
      pageId: string
      disabled?: DisabledByPref
    } & SettingsBox['$$prop_def']
  }

  const radioName = generateId()

  export let pref: string
  export let items: Item[] = []

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

  function cleanSubpage(subpage: Item['subpage']) {
    if (!subpage) return
    const { pageId, disabled, ...rest } = subpage
    return { ...rest }
  }
</script>

<div role="radiogroup">
  {#each items as item}
    <SettingsBox
      {...cleanSubpage(item.subpage)}
      subpageDisabled={!!item?.subpage?.disabled?.pref &&
        isDisabled(
          item?.subpage?.disabled,
          $prefStore[item.subpage.disabled.pref],
        )}
      on:click={() =>
        item.subpage && configStore.goToSubpage(item.subpage.pageId)}
    >
      <InputLabel
        type="radio"
        name={radioName}
        label={item.label}
        checked={$prefStore[pref] === item.value}
        description={item.description}
        learnMore={item.learnMore}
        on:change={() => ($prefStore[pref] = item.value)}
      />
    </SettingsBox>
  {/each}
</div>


