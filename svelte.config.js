import path from 'path'
import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    vite: {
      resolve: {
        alias: {
          'rounded-polygon': path.resolve('src/lib'),
        },
      },
    },

    package: {
      emitTypes: false,
      exports: (file) => file === 'index.js',
      files: (file) => !file.endsWith('.svelte'),
    },
  },
}

export default config
