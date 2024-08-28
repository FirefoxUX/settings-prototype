<script lang="ts">
  import illustration from '@src/assets/illustrations/ps-cyberfox.png'
  import MozIcon from '@src/atoms/MozIcon.svelte'
  import MozLink from '@src/atoms/MozLink.svelte'
</script>

<div class="moz-card padding">
  <div>
    <h3>Firefox is on guard</h3>
    <ul>
      <li>
        <MozIcon name="checkmark-16" /><span
          >Your privacy and security is protected</span
        >
      </li>
      <li><MozIcon name="checkmark-16" /><span>Firefox is up to date</span></li>
      <li>
        <MozIcon name="checkmark-16" /><span
          >You are good to go! If we spot something, we'll let you know. Have
          fun!</span
        >
      </li>
    </ul>
    <MozLink href="//example.com"
      >Learn more about how Firefox protects you</MozLink
    >
  </div>
  <img src={illustration} alt="Fox" role="presentation" />
</div>

<style lang="sass">
.moz-card
  display: flex
  gap: utils.$size-16

img
  width: 30%
  max-width: 300px
  height: auto
  margin-inline-start: auto
  margin-block-start: utils.$size-8

ul
  list-style: none
  padding-inline-start: 0
  margin-block-start: 0
  margin-block: utils.$size-12
  li
    display: flex
    gap: utils.$size-4
    margin-block-end: utils.$size-8
  :global(.moz-icon)
    color: var(--icon-color-success)
  span
    display: inline-block
</style>
