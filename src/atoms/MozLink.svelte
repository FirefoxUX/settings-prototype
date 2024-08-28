<script lang="ts">
  import usertestStore from '@src/UsertestStore'

  export let href: string
</script>

{#if $usertestStore.enabled && !$usertestStore.allowExternalLinks}
  <span class="moz-link" role="button" tabindex="0">
    <slot>Learn more</slot>
  </span>
{:else}
  <a {href} target="_blank" rel="noopener noreferrer">
    <slot>Learn more</slot>
  </a>
{/if}


