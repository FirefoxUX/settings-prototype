<script lang="ts">
  import MozLink from '@src/atoms/MozLink.svelte'
  import MozToggleable from '@src/atoms/MozToggleable.svelte'
  import { generateId } from '@src/utils'

  const controlId = generateId()
  const descriptionId = generateId()

  export let label: string
  export let type: MozToggleable['type'] = 'switch'
  export let description: string | undefined = undefined
  export let learnMore: string | undefined = undefined
  export let name: string | undefined = undefined
  export let indent = 0
  export let checked = false
  export let disabled = false
</script>

<div class="input-label" style="--indent: {indent}">
  <MozToggleable
    id={controlId}
    {type}
    bind:checked
    ariaDescribedby={description && descriptionId}
    on:change
    {disabled}
    {name}
  />
  <label for={controlId} class:text-bold={description}>
    {label}
    {#if !description && learnMore}
      <MozLink href={learnMore} />
    {/if}
  </label>
  {#if description || learnMore}
    <p>
      {#if description}{description}{/if}
      {#if learnMore}<MozLink href={learnMore} />{/if}
    </p>
  {/if}
</div>

<style lang="sass">

.input-label
  display: grid
  grid-template-columns: auto 1fr
  gap: utils.$size-2 utils.$size-8
  align-items: center
  padding-inline-start: calc(var(--indent) * (utils.$size-8 + utils.$size-16))

p
  color: var(--text-color-deemphasized)
  grid-column: 2
  grid-row: 2
</style>
