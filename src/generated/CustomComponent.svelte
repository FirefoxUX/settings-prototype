<script lang="ts">
  const components = import.meta.glob('../custom/*.svelte', {
    eager: true,
    import: 'default',
  }) as Record<string, string>

  const componentsByName = Object.entries(components).reduce(
    (acc, [path, component]) => {
      const name = path.replace('../custom/', '').replace('.svelte', '')
      acc[name] = component
      return acc
    },
    {} as Record<string, string>,
  )

  export let name: string
</script>

<svelte:component this={componentsByName[name]} />

<style lang="sass">

</style>
