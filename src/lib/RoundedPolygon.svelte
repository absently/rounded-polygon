<script>
  import { pathDef } from 'rounded-polygon'

  let d
  let x
  let y
  let width
  let height

  export let points
  export let radius

  $: ({ x, y, width, height } = getBoundingClientRect(points))
  $: d = pathDef(points, radius)

  function getBoundingClientRect (points) {
    const { top, right, bottom, left } = points.reduce(
      (acc, [ x, y ]) => ({
        top: Math.min(y, acc.top),
        right: Math.max(x, acc.right),
        bottom: Math.max(y, acc.bottom),
        left: Math.min(x, acc.left),
      }),
      { top: 0, right: 0, bottom: 0, left: 0 },
    )

    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      top,
      right,
      bottom,
      left,
    }
  }
</script>

<svg {width} {height} viewBox="{x} {y} {width} {height}">
  <polygon points={points.map((p) => p.slice(0, 2)).join(' ')} />
  <path {d} />
</svg>

<style>
  path,
  polygon {
    fill: green;
  }

  polygon {
    opacity: 25%;
  }
</style>
