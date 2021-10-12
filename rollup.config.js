import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import clear from 'rollup-plugin-clear';
import {terser} from 'rollup-plugin-terser';

const babelOptionsES2018 = {
    runtimeHelpers:  false,
    externalHelpers: false,
    babelrc:         false,
    plugins:         [
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        ["@babel/plugin-proposal-private-property-in-object", {loose: true}],
        ["@babel/plugin-proposal-private-methods", {loose: true}],
    ]
};

export default [
    // ES Modules Minified
    {
        context: 'window',
        input:   './src/console.js',
        output:  {
            file:      './dist/console.min.js',
            format:    'esm',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            clear({targets: ['./dist']}),
            babel(babelOptionsES2018),
            terser(),
        ]
    },
    // ES Modules None-Minified
    {
        context: 'window',
        input:   './src/console.js',
        output:  {
            file:      './dist/console.js',
            format:    'esm',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            babel(babelOptionsES2018),
        ]
    },
    // ES Modules Minified
    {
        context: 'window',
        input:   './src/index.js',
        output:  {
            file:      './dist/logger.min.js',
            format:    'esm',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            babel(babelOptionsES2018),
            terser(),
        ]
    },
    // ES Modules None-Minified
    {
        context: 'window',
        input:   './src/index.js',
        output:  {
            file:      './dist/logger.js',
            format:    'esm',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            babel(babelOptionsES2018),
        ]
    },
];
