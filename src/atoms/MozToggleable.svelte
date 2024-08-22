<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  // Id of the toggleable element @type {string}
  export let id: string
  // Type of the toggleable element @type {'checkbox' | 'radio' | 'switch'}
  export let type: 'checkbox' | 'radio' | 'switch' = 'switch'
  // Whether the toggleable element is checked (can use bind:checked) @type {boolean}
  export let checked: boolean
  // Whether the toggleable element is disabled @type {boolean}
  export let disabled = false
  // name of the toggleable element @type {string | undefined}
  export let name: string | undefined = undefined
  // aria-label of the toggleable element @type {string | undefined}
  export let ariaLabel: string | undefined = undefined
  // aria-describedby of the toggleable element @type {string | undefined}
  export let ariaLabelledby: string | undefined = undefined
  // aria-describedby of the toggleable element @type {string | undefined}
  export let ariaDescribedby: string | undefined = undefined
  // HTML element of the toggleable element @type {HTMLInputElement | HTMLButtonElement | undefined}
  export let element: HTMLInputElement | HTMLButtonElement | undefined =
    undefined

  function toggle() {
    if (type == 'radio') {
      dispatch('change', !checked)
    } else {
      checked = !checked
      dispatch('change', checked)
    }
  }
</script>

{#if type === 'switch'}
  <button
    {disabled}
    {id}
    aria-checked={checked}
    aria-describedby={ariaDescribedby}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    bind:this={element}
    on:click={toggle}
    role="switch"
  />
{:else}
  <input
    {checked}
    {disabled}
    {id}
    {type}
    {name}
    aria-describedby={ariaDescribedby}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    bind:this={element}
    on:click={toggle}
  />
{/if}

<style lang="sass">
@use 'sass:math'

input, button
  appearance: none
  background-color: unset
  margin: 0
  width: utils.$size-16
  height: utils.$size-16
  color: var(--border-color-interactive)
  border: 1px solid currentColor
  transform: translateY(-0.075em)
  display: flex
  align-items: center
  justify-content: center
  &:focus-visible
    outline: var(--focus-outline)
    outline-offset: var(--focus-outline-offset)
  &:not(:disabled):hover
    background-color: var(--button-background-color-hover)
  &:not(:disabled):active
    background-color: var(--button-background-color-active)
  &::before
    content: ""
    display: none
    background: var(--background-color-canvas)

input[type="checkbox"]:checked, button[aria-checked="true"]
  border-color: transparent
  background-color: var(--color-accent-primary)
  &:not(:disabled):hover
    background-color: var(--color-accent-primary-hover)
  &:not(:disabled):active
    background-color: var(--color-accent-primary-active)

button[role="switch"]
  width: utils.$size-32
  transform: translateY(-0.075em)
  justify-content: flex-start
  border-radius: var(--border-radius-circle)
  &::before
    // prevent weird bug in Chrome
    display: block
    width: utils.$size-12
    height: utils.$size-12
    border-radius: var(--border-radius-circle)
    position: relative
    left: math.div(utils.$size-16 - utils.$size-12, 2) - 1px
    left: math.div(utils.$size-16 - utils.$size-12, 2) - 1px
    left: math.div(utils.$size-16 - utils.$size-12, 2) - 1px
    transition: left 0.1s ease-out
    background-color: currentColor
    @media (prefers-reduced-motion: reduce)
      transition: none
  &[aria-checked="true"]
    background-color: var(--color-accent-primary)
    color: var(--background-color-canvas)
    &::before
      left: utils.$size-32 - utils.$size-12 - math.div(utils.$size-16 - utils.$size-12, 2) - 1px

input[type="checkbox"]
  border-radius: 2px
  &::before
    width: 10px
    height: 10px
    transform: scale(1.0001)
    clip-path: polygon( 98.511% 13.019%,98.511% 13.019%,99.715% 14.215%,100.692% 15.56%,101.44% 17.023%,101.956% 18.574%,102.236% 20.18%,102.278% 21.813%,102.078% 23.44%,101.634% 25.031%,100.942% 26.556%,100% 27.983%,43.732% 100%,3.839% 66.812%,3.839% 66.812%,2.627% 65.625%,1.64% 64.288%,0.882% 62.831%,0.355% 61.285%,0.063% 59.68%,0.009% 58.048%,0.197% 56.419%,0.629% 54.825%,1.31% 53.295%,2.242% 51.86%,2.242% 51.86%,3.383% 50.6%,4.669% 49.574%,6.07% 48.785%,7.557% 48.237%,9.1% 47.933%,10.669% 47.877%,12.235% 48.072%,13.769% 48.522%,15.24% 49.23%,16.619% 50.199%,40.658% 70.197%,84.122% 14.567%,84.122% 14.567%,85.272% 13.316%,86.566% 12.3%,87.973% 11.522%,89.464% 10.986%,91.009% 10.694%,92.578% 10.651%,94.143% 10.858%,95.673% 11.32%,97.139% 12.039%,98.511% 13.019% )

input[type="radio"]
  border-radius: var(--border-radius-circle)
  &::before
    width: 10px
    height: 10px
    border-radius: var(--border-radius-circle)
  &:checked
    color: var(--color-accent-primary)
    &::before
      background-color: currentColor

input[type="radio"], input[type="checkbox"]
  &:checked
    &::before
      display: block

input:disabled, button:disabled
  opacity: 0.5

@media (forced-colors: active)
  input, button
    outline-color: CanvasText
    &:not(:disabled):hover, &:not(:disabled):active
      color: SelectedItem
      background-color: SelectedItemText
    &:not(:disabled):active
      border-color: ButtonText
    &:disabled
      opacity: 1
      background-color: ButtonFace
      color: GrayText
    &:checked
      background-color: ButtonText
      color: ButtonFace
      &:not(:disabled):hover, &:not(:disabled):active
        color: SelectedItemText
        background-color: SelectedItem
      &:not(:disabled):active
        border-color: ButtonText
      &:disabled
        background-color: GrayText
        color: ButtonFace
  button
    background-color: ButtonFace
    color: ButtonText
    &[aria-checked="true"]
      background-color: ButtonText !important
      color: ButtonFace !important
      &:not(:disabled):hover, &:not(:disabled):active
        color: SelectedItemText !important
        background-color: SelectedItem !important
      &:not(:disabled):active
        border-color: ButtonText !important
      &:disabled
        background-color: GrayText !important
        color: ButtonFace !important
</style>
