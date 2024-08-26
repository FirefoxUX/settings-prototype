<script lang="ts">
  import { generateId, type DisabledByPref } from '@src/utils'
  import ConfigGate from './ConfigGate.svelte'
  import SmartInput from './SmartInput.svelte'
  import PrefInput from './PrefInput.svelte'
  import UndefinedDropdown from './UndefinedDropdown.svelte'

  export let valueObj: any
  export let valueKey: string

  const id = generateId()

  $: prefValue = (valueObj[valueKey] as DisabledByPref)?.pref

  const BOOL_ITEMS = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ]
</script>

<ConfigGate
  bind:valueObj
  {valueKey}
  title="Disabled by pref"
  defaultValues={{ pref: undefined }}
>
  {#if valueObj[valueKey] !== undefined}
    <div class="form">
      <label for={`${id}-1`}>Pref</label><PrefInput
        id={`${id}-1`}
        bind:value={prefValue}
      />
      <label for={`${id}-2`}>Invert</label><UndefinedDropdown
        id={`${id}-2`}
        bind:valueObj={valueObj[valueKey]}
        items={BOOL_ITEMS}
        valueKey="invert"
        unsetLabel="Unset (default: false)"
      />
      <label for={`${id}-2`}>Match value</label><SmartInput
        id={`${id}-2`}
        placeholder="Value to match against"
        bind:valueObj={valueObj[valueKey]}
        valueKey="matchValue"
        canBeUndefined
      />
    </div>
  {/if}
</ConfigGate>

<style lang="sass">
.form
  display: grid
  grid-template-columns: auto 1fr
  gap: utils.$size-8
  align-items: center
</style>
