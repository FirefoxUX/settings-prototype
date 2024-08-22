<script lang="ts">
  import MozIcon from '@src/atoms/MozIcon.svelte'

  export let heading: string | undefined = undefined
  export let description: string[] | string | undefined = undefined
  export let iconName: string | undefined = undefined
  export let learnMore: string | undefined = undefined
</script>

<div class="text">
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
      <a href={learnMore} target="_blank" rel="noopener noreferrer"
        >Learn more</a
      >
    {/if}
  </div>
</div>

<style lang="sass">
.content
  text-align: start
  flex-grow: 1
  display: grid
  grid-template-columns: auto 1fr
  gap: utils.$size-2 utils.$size-8
  align-items: center

.content
  grid-column: 2
  grid-row: 2
</style>
