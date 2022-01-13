<script>
  import RoundedPolygon from '$lib/RoundedPolygon.svelte'

  // Shapes centered about a circle of radius, 64.
  const tests = [
    {
      name: 'triangle',
      points: [
        [ 56, 0 ],
        [ 111.426, 96 ],
        [ 0.574375, 96 ],
      ],
      radius: 12,
    },
    {
      name: 'star',
      points: [
        [ 61, 0 ],
        [ 75.3689, 44.2229, 12 ],
        [ 121.868, 44.2229 ],
        [ 84.2494, 71.5542, 12 ],
        [ 98.6183, 115.777 ],
        [ 61, 88.4458, 12 ],
        [ 23.3817, 115.777 ],
        [ 37.7506, 71.5542, 12 ],
        [ 0.132381, 44.2229 ],
        [ 46.6311, 44.2229, 12 ],
      ],
      radius: 6,
    },
  ]
</script>

<ul>
  {#each tests as { points, radius }}
    <li><RoundedPolygon {points} {radius} /></li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
