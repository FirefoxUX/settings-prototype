<script lang="ts">
  import MozIcon from '@src/atoms/MozIcon.svelte'
  import MozLink from '@src/atoms/MozLink.svelte'

  export let heading: string | undefined = undefined
  export let description: string[] | string | undefined = undefined
  export let iconName: string | undefined = undefined
  export let learnMore: string | undefined = undefined
</script>

<div class="text" class:has-icon={iconName}>
  {#if iconName}
    <MozIcon name={iconName} />
  {/if}
  {#if heading}<h4>{heading}</h4>{/if}
  <div class="content">
    {#if description}
      {#if typeof description === 'object'}
        {#each description as desc}
          <p>{desc}</p>
        {/each}
      {:else}
        <p>{description}</p>
      {/if}
    {/if}
    {#if learnMore}
      <MozLink href={learnMore} />
    {/if}
  </div>
</div>

<style lang="sass">
.text
  text-align: start
  flex-grow: 1
  display: grid
  grid-template-columns: auto 1fr
  gap: utils.$size-2 utils.$size-8
  align-items: center
  &.has-icon
    h4, .content
      grid-column: 2

.content
  grid-row: 2
</style>
