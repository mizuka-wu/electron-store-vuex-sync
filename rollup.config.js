import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const plugins = [
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs()
]

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'umd',
      name: 'electron-store-vuex-sync'
    },
    plugins
  },
  {
    input: 'src/background.js',
    output: {
      file: 'dist/background.js',
      format: 'umd',
      name: 'injectStore'
    }
  },
  {
    input: 'src/vuex.js',
    output: {
      file: 'dist/vuex.js',
      format: 'umd',
      name: 'getVuexStoreConfig'
    },
    plugins
  }
]
