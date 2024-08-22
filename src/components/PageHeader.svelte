<script lang="ts">
  import MozButton from '@src/atoms/MozButton.svelte'
  import MozIcon from '@src/atoms/MozIcon.svelte'

  export let title: string
  export let iconName: string | undefined = undefined
  export let breadcrumbs:
    | { label: string; onClick?: () => void }[]
    | undefined = undefined
</script>

<div class="page-header">
  {#if breadcrumbs && breadcrumbs.length > 0}
    <nav class="breadcrums">
      <ol>
        {#each breadcrumbs as { label, onClick }, i}
          <li>
            <button on:click={onClick} class="moz-link">{label}</button><MozIcon
              name="chevron-right-12"
            />
          </li>
        {/each}
        <li><span aria-current="page">{title}</span></li>
      </ol>
    </nav>
  {/if}

  <div class="heading-row">
    {#if breadcrumbs && breadcrumbs.length > 0}
      <MozButton
        iconName="chevron-left-16"
        type="ghost"
        on:click={breadcrumbs[breadcrumbs.length - 1].onClick}
      />
    {/if}
    {#if iconName}
      <MozIcon name={iconName} />
    {/if}
    <h2>{title}</h2>
  </div>
</div>

<style lang="sass">
.heading-row
  display: flex
  align-items: center
  gap: utils.$size-8

ol
  margin: 0
  padding-left: 0
  list-style: none
  display: flex
  align-items: center
  margin-block-end: utils.$size-16
li
  display: inline
  button
    appearance: none
    background: none
    border: none
  > :global(.moz-icon)
    color: var(--icon-color)
    margin-inline: utils.$size-4
</style>
