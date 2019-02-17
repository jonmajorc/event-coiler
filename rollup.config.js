import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import bundleSize from 'rollup-plugin-bundle-size'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { minify } from 'uglify-es'
import typescript from 'rollup-plugin-typescript'
import json from 'rollup-plugin-json'

const baseConfig = {
  input: 'src/Coiler.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript(),
    json({
      exclude: 'node_modules/*',
      preferConst: true,
      compact: true,
    }),
    resolve({
      module: true,
      jsnext: true,
      browser: true,
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: true,
      runtimeHelpers: true,
    }),
    commonjs(),
    bundleSize(),
  ],
}

const umdConfig = {
  ...baseConfig,
  output: {
    name: 'Coiler',
    file: pkg.browser,
    format: 'umd',
  },
}

const umd = {
  prod: {
    ...umdConfig,
    output: {
      ...umdConfig.output,
      file: umdConfig.output.file.replace(/\.js$/, '.min.js'),
    },
    plugins: [...umdConfig.plugins, minify()],
  },
  dev: {
    ...umdConfig,
  },
}

const webConfig = {
  ...baseConfig,
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'cjs' },
  ],
}

export default [umd.dev, umd.prod, webConfig]
