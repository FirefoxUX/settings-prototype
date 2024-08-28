<script lang="ts">
  import MozToggleable from '@src/atoms/MozToggleable.svelte'
  import { generateId } from '@src/utils'

  const id = generateId()

  export let title: string
  export let valueObj: Record<string, unknown | undefined>
  export let valueKey: string
  export let defaultValues: object

  let inputValue: boolean = false

  function updateInputValue() {
    if (valueObj[valueKey] === undefined) {
      valueObj[valueKey] = { ...defaultValues }
      valueObj = valueObj
    } else {
      delete valueObj[valueKey]
      valueObj = valueObj
    }
  }

  $: inputValue = valueObj[valueKey] !== undefined
</script>

<section>
  <div class="heading" class:has-content={inputValue}>
    <label for={id}>{title}</label>
    <MozToggleable
      {id}
      bind:checked={inputValue}
      on:change={updateInputValue}
    />
  </div>
  {#if inputValue}
    <div class="content">
      <slot />
    </div>
  {/if}
</section>

<style lang="sass">
section
  display: flex
  flex-direction: column
  border: 1px dashed var(--border-color-default)
  border-radius: var(--border-radius-medium)

.heading
  font-weight: bold
  display: flex
  align-items: center
  padding: utils.$size-4
  padding-inline-start: utils.$size-8
  background-color: color-mix(in srgb, var(--border-color-default) 5%, transparent 90%)
  > label
    flex: 1
  &.has-content
    border-bottom: 1px dashed var(--border-color-default)

.content
  padding: utils.$size-8
  display: flex
  flex-direction: column
  gap: utils.$size-8
</style>
