import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';


const production = !process.env.ROLLUP_WATCH;

if (!production) {
  console.log('------');
  console.log('DEVELOPMENT BUILD');
  console.log('You are generating an unminified output of this library.');
  console.log('Remember to minify the output by running the following:');
  console.log('');
  console.log('yarn build');
  console.log('');
  console.log('------');
} else {
  console.log('------');
  console.log('PRODUCTION BUILD');
  console.log('You are generating a minified output of this library.');
  console.log('Remember to test the code before publishing it to the NPM registry.');
  console.log('');
  console.log('------');
}

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    {
      name: 'semanticUIReactTransitionModal',
      file: pkg.browser,
      format: 'umd',
      globals: {
        react: 'React',
        'semantic-ui-react': 'semanticUIReact',
      },
    },
    {
      file: 'example/src/semantic-ui-react-transition-modal/index.js',
      format: 'esm',
      banner: '/* eslint-disable */',
    },
  ],
  external: Object.keys(pkg.peerDependencies || {}),
  plugins: [
    peerDepsExternal(),
    nodeBuiltins(),
    nodeResolve(),
    commonjs({
      include: [
        'node_modules/**',
      ],
      namedExports: {
        'node_modules/react/react.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement',
        ],
        'node_modules/react-dom/index.js': [
          'render',
        ],
        'node_modules/react-is/index.js': [
          'isForwardRef',
          'isValidElementType',
        ],
      },
    }),
    json(),
    typescript({
      typescript: require('typescript'),
    }),
    production && terser(),
  ],
};
