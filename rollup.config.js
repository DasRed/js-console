import resolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import clear from 'rollup-plugin-clear';

const progressOptions = {clearLine: false};

const babelOptionsES2015 = {
    runtimeHelpers:  false,
    externalHelpers: false,
    babelrc:         false,
    presets:         [
        [
            '@babel/env',
            {
                targets: {
                    ie:      '11',
                    edge:    '17',
                    firefox: '60',
                    chrome:  '71',
                    safari:  '11.1',
                },
            }
        ]
    ],
    plugins:         [
        ['@babel/plugin-proposal-class-properties', {loose: true}]
    ]
};

const babelOptionsES2018 = {
    runtimeHelpers:  false,
    externalHelpers: false,
    babelrc:         false,
    plugins:         [
        ['@babel/plugin-proposal-class-properties', {loose: true}]
    ]
};

const terserOptions = {sourcemap: true};

// https://rollupjs.org/guide/en#big-list-of-options
export default [
    // ES2015 Minified
    {
        context: 'window',
        input:   './src/console.js',
        output:  {
            file:      './dist/console.min.js',
            format:    'iife',
            name:      'console',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            clear({targets: ['./dist']}),
            progress(progressOptions),
            babel(babelOptionsES2015),
            terser(terserOptions),
        ]
    },
    // ES2015 None-Minified
    {
        context: 'window',
        input:   './src/console.js',
        output:  {
            file:      './dist/console.js',
            format:    'iife',
            name:      'console',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress(progressOptions),
            babel(babelOptionsES2015),
        ]
    },
    // ES Modules Minified
    {
        context: 'window',
        input:   './src/console.js',
        output:  {
            file:      './dist/console.esm.min.js',
            format:    'esm',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress(progressOptions),
            babel(babelOptionsES2018),
            terser(terserOptions),
        ]
    },
    // ES Modules None-Minified
    {
        context: 'window',
        input:   './src/console.js',
        output:  {
            file:      './dist/console.esm.js',
            format:    'esm',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress(progressOptions),
            babel(babelOptionsES2018),
        ]
    },
    // ES2015 Minified
    {
        context: 'window',
        input:   './src/index.js',
        output:  {
            file:      './dist/logger.min.js',
            format:    'iife',
            name:      'Logger',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            clear({targets: ['./dist']}),
            progress(progressOptions),
            babel(babelOptionsES2015),
            terser(terserOptions),
        ]
    },
    // ES2015 None-Minified
    {
        context: 'window',
        input:   './src/index.js',
        output:  {
            file:      './dist/logger.js',
            format:    'iife',
            name:      'Logger',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress(progressOptions),
            babel(babelOptionsES2015),
        ]
    },
    // ES Modules Minified
    {
        context: 'window',
        input:   './src/index.js',
        output:  {
            file:      './dist/logger.esm.min.js',
            format:    'esm',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress(progressOptions),
            babel(babelOptionsES2018),
            terser(terserOptions),
        ]
    },
    // ES Modules None-Minified
    {
        context: 'window',
        input:   './src/index.js',
        output:  {
            file:      './dist/logger.esm.js',
            format:    'esm',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress(progressOptions),
            babel(babelOptionsES2018),
        ]
    },
];
