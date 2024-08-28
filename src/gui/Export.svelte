<script lang="ts">
  import configStore from '@src/ConfigStore'
  import prefStore from '@src/PrefStore'
  import usertestStore from '@src/UsertestStore'

  // function to select all text in a textarea
  function selectText(e: FocusEvent) {
    const target = e.target as HTMLInputElement
    target.select()
  }
</script>

<div class="wrapper">
  <h2>Layout config</h2>
  <textarea on:focus={selectText} readonly
  >{JSON.stringify($configStore.config, null, 2)}</textarea
  >
  <h2>Prefs</h2>
  <textarea on:focus={selectText} readonly
  >{JSON.stringify($prefStore, null, 2)}</textarea
  >
  <h2>Usertesting config</h2>
  <textarea on:focus={selectText} readonly
    >{JSON.stringify($usertestStore, null, 2)}</textarea
  >
</div>

<style lang="sass">
  .wrapper
    height: calc(100% - 2 * utils.$size-16)
    display: flex
    flex-direction: column
    margin: utils.$size-16
    box-sizing: border-box

  h2
    margin-block-end: utils.$size-8
    &:not(:first-child)
      margin-block-start: utils.$size-16

  textarea
    flex-grow: 1
    padding: utils.$size-16
    font-family: 'Menlo', monospace
    overflow: auto
    display: block
    background: white
    border: 1px solid var(--border-color-default)
    border-radius: utils.$size-8

</style>
