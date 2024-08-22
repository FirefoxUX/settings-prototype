<script lang="ts" context="module">
  import InputLabel from '@src/components/InputLabel.svelte'
  import SettingsBoxGroup from '@src/generated/SettingsBoxGroup.svelte'
  import Branch from '@src/generated/Branch.svelte'
  import RadioGroup from '@src/generated/RadioGroup.svelte'
  import prefStore from '@src/PrefStore'

  export type CardContentConfig =
    | {
        kind: 'custom-component'
        name: string
      }
    | {
        kind: 'fieldset'
        props: Fieldset['$$prop_def']
      }
    | {
        kind: 'toggleable'
        pref: string
        disabled?: DisabledByPref
        props: InputLabel['$$prop_def']
      }
    | ({
        kind: 'box-group'
      } & SettingsBoxGroup['$$prop_def'])
    | {
        kind: 'branch'
        pref: Branch['pref']
        conditions: Branch['conditions']
      }
    | ({
        kind: 'text'
      } & Text['$$prop_def'])
    | ({
        kind: 'radio-group'
      } & RadioGroup['$$prop_def'])

  function stripKind<T extends CardContentConfig>(config: T): Omit<T, 'kind'> {
    const { kind, ...rest } = config
    return rest
  }
</script>

<script lang="ts">
  import CustomComponent from './CustomComponent.svelte'
  import Fieldset from './Fieldset.svelte'
  import { boolInv, type DisabledByPref } from '@src/utils'
  import Text from './Text.svelte'

  export let config: CardContentConfig

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

{#if config.kind === 'custom-component'}
  <CustomComponent name={config.name} />
{:else if config.kind === 'fieldset'}
  <Fieldset {...config.props} />
{:else if config.kind === 'toggleable'}
  <InputLabel
    bind:checked={$prefStore[config.pref]}
    disabled={!!config?.disabled?.pref &&
      isDisabled(config?.disabled, $prefStore[config.disabled.pref])}
    {...config.props}
  />
{:else if config.kind === 'box-group'}
  <SettingsBoxGroup {...config} />
{:else if config.kind === 'branch'}
  <Branch pref={config.pref} conditions={config.conditions} />
{:else if config.kind === 'text'}
  <Text {...stripKind(config)} />
{:else if config.kind === 'radio-group'}
  <RadioGroup {...stripKind(config)} />
{/if}

<style lang="sass">

</style>
