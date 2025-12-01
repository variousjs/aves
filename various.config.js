const path = require('path')
const fs = require('fs')
/** @type {import('@variousjs/registry').Packages} */
const registry = require('@variousjs/registry')

const components = fs
  .readdirSync(path.resolve(__dirname, './src/components'))
  .reduce((prev, cur) => {
    return {
      ...prev,
      [cur]: path.join(__dirname, `./src/components/${cur}`),
    }
  }, {})

const depsComponents = Object.keys(components).reduce((prev, cur) => {
  return {
    ...prev,
    [cur]: `./dist/${cur}.js`,
  }
}, {})

const externals = ['@floating-ui/react-dom']

/**
 * @param {keyof typeof registry} name
 */
const getPackageSrc = (name) => {
  const package = registry[name]
  const version = package['dist-tags'].latest
  const { dist, dependencies } = package.versions[version]

  if (dependencies) {
    return {
      ...Object.keys(dependencies)
        .reduce((prev, cur) => ({ ...prev, ...getPackageSrc(cur) }), {}),
      [name]: dist,
    }
  }
  return { [name]: dist }
}

/** @type {import('@variousjs/various').Config} */
const config = {
  dependencies: {
    ...getPackageSrc('react'),
    ...getPackageSrc('react-dom'),
    '@floating-ui/dom': 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.4/dist/floating-ui.dom.umd.min.js',
    '@floating-ui/react-dom': 'https://cdn.jsdelivr.net/npm/@floating-ui/react-dom@2.1.6/dist/floating-ui.react-dom.umd.min.js',
    '@floating-ui/core': 'https://cdn.jsdelivr.net/npm/@floating-ui/core@1.7.3/dist/floating-ui.core.umd.min.js',
    ...depsComponents,
  },
}

module.exports = {
  config,
  components,
  externals,
}
