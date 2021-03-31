export default [
  {
    input: 'src/main.js',
    output: {
      file: 'dist/bundle.js',
      format: 'umd'
    }
  },
  {
    input: 'src/background.js',
    output: {
      file: 'dist/background.js',
      format: 'umd'
    }
  },
  {
    input: 'src/vuex.js',
    output: {
      file: 'dist/vuex.js',
      format: 'umd'
    }
  }
]
