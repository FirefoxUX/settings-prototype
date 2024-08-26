<script lang="ts" context="module">
  // import all svgs from assets/fx-icons/ as raw
  const icons = import.meta.glob('../assets/fx-icons/*.svg', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>

  // remove '../assets/fx-icons/' and '.svg' from path
  const iconsByName = Object.entries(icons).reduce(
    (acc, [path, svg]) => {
      const name = path.replace('../assets/fx-icons/', '').replace('.svg', '')
      acc[name] = svg
      return acc
    },
    {} as Record<string, string>,
  )

  // export only icon names as array
  export const iconNames = Object.keys(iconsByName)
</script>

<script lang="ts">
  export let svg: string | undefined = undefined
  export let name: string | undefined = undefined
  export let description: string | undefined = undefined
</script>

<span
  class="moz-icon"
  role={description ? 'img' : 'presentation'}
  aria-label={description}
>
  {@html name ? iconsByName[name] : svg}
</span>

<style lang="sass">
  span
    display: inline-block
    line-height: 0
</style>
