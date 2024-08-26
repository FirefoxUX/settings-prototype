<script lang="ts">
  import configStore from '@src/ConfigStore'
  import prefStore from '@src/PrefStore'

  // function to select all text in a textarea
  function selectText(e: MouseEvent) {
    const target = e.target as HTMLInputElement
    target.select()
  }
</script>

<textarea on:focus={selectText} readonly
  >{JSON.stringify($configStore.config, null, 2)}</textarea
>
<textarea on:focus={selectText} readonly
  >{JSON.stringify($prefStore, null, 2)}</textarea
>

<style lang="sass">
  textarea
    margin: utils.$size-16
    padding: utils.$size-16
    font-family: 'Menlo', monospace
    overflow: auto
    width: calc(100% - utils.$size-32)
    height: calc(50% - utils.$size-32)
    box-sizing: border-box
    display: block
    background: white
    border: 1px solid var(--border-color-default)
    border-radius: utils.$size-8

</style>
