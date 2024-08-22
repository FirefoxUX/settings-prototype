<script lang="ts">
  import MozIcon from '@src/atoms/MozIcon.svelte'

  export let title: string
  export let iconName: string | undefined = undefined
  export let description: string | undefined = undefined
  export let learnMore: string | undefined = undefined
</script>

<div class="card-header">
  <div class="heading-row">
    {#if iconName}
      <MozIcon name={iconName} />
    {/if}
    <h3>{title}</h3>
  </div>
  {#if description || learnMore}
    <p>
      {#if description}{description}{/if}
      {#if learnMore}<a
          href={learnMore}
          target="_blank"
          rel="noopener noreferrer">Learn more</a
        >{/if}
    </p>
  {/if}
</div>

<style lang="sass">
.heading-row
  display: flex
  align-items: center
  gap: utils.$size-8
p
  margin-block-start: utils.$size-4
  color: var(--text-color-deemphasized)
</style>
