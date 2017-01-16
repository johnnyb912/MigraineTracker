'use strict';

const HELPERS = require('./helpers'),

    DIST_PATH   = __dirname + '/.dist',
    PATH        = require('path'),

    WEBPACK = require('webpack'),

    // used to merge webpack configs
    WEBPACK_MERGE = require('webpack-merge'),

    // the settings that are common to all webpack builds
    COMMON_CONFIG = require('./webpack.common.js'),

    /**
     * Webpack Plugins
     */
    DEFINE_PLUGIN               = require('webpack/lib/DefinePlugin'),
    CONTEXT_REPLACEMENT_PLUGIN  = require('webpack/lib/ContextReplacementPlugin'),
    POST_CSS_ASSETS             = require('postcss-assets'),

    /**
     * Environment Targeting
     * Get npm lifecycle event to identify the environment
     */
    ENV = process.env.npm_lifecycle_event,

    /*
     * Webpack Constants
     */
    METADATA = WEBPACK_MERGE(COMMON_CONFIG.metadata, {
        title           : 'Migraine Tracker',
        baseUrl         : '/',
        isDevServer     : HELPERS.isWebpackDevServer(),
        stylesConfig    : {
            browsers : [
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 8',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6'
            ],
            spritePadding   : 10,
            spriteAlgorithm : 'binary-tree'
        },
        API_ROOT    : 'http://localhost:5050/api/',
        API_CONFIG  : {
            /* config api */
            configuration   : '/posts/',
            getLanguages    : '/comments/',

            /* user */
            login           : 'user/login/',
            logout          : 'user/logout/',
            resetPassword   : 'user/resetPassword/',
            getCurrentUser  : 'user/current/',

            /* dashboard */
            getDashBoard        : 'dashboard/',
            getCarouselMessages : 'messages/',

            /* billing */
            getStatements       : 'statements/',

            /* payments */
            getPaymentAccounts  : 'payments/accounts'
        }
    });

/**
 * Webpack configuration
 *
 * Reference: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    /**
     * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
     *
     * Do not change, leave as is or it wont work.
     * Reference: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool : 'inline-source-map',

    /**
     * Options affecting the resolving of modules.
     *
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve : {
        /**
         * An array of extensions that should be used to resolve modules.
         *
         * Reference: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions : ['.ts', '.js', '.json', '.css', '.scss', '.html'],

        /**
         * An array of directory names to be resolved to the current directory
         */
        modules : [
            HELPERS.root('src'),
            'node_modules',
            'content'
        ]
    },

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry : {},

    /*
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    output : {},

    /**
     * Options affecting the normal modules.
     *
     * Reference: http://webpack.github.io/docs/configuration.html#module
     */
    module : {
        /**
         * An array of automatically applied loaders.
         *
         * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
         * This means they are not resolved relative to the configuration file.
         *
         * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
         */
        rules : [
            /**
             * Typescript loader support for .ts files
             *
             * Reference: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test    : /\.ts$/,
                loader  : 'awesome-typescript-loader',
                query   : {
                    // use inline sourcemaps for "karma-remap-coverage" reporter
                    sourceMap       : false,
                    inlineSourceMap : true
                },
                exclude : [/\.e2e\.ts$/]
            },

            /**
             * Typescript loader support for .ts files
             *
             * Reference: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test    : /\.ts$/,
                loader : [
                    'angular2-template-loader'
                ],
                exclude : [/\.e2e\.ts$/]
            },

            /**
             * Json loader support for *.json files.
             *
             * Reference: https://github.com/webpack/json-loader
             */
            {
                test    : /\.json$/,
                loader  : 'json-loader',
                exclude : [
                    HELPERS.root('src/index.html')
                ]
            },

            /**
             * null loader support for *.scss files
             * returns empty module
             *
             * Reference: https://github.com/webpack/null-loader
             */
            {
                test    : /\.scss$/,
                include : [
                    HELPERS.root('src/app/sass-config.scss'),
                    HELPERS.root('src/app/styles')
                ],
                loader  : 'null-loader'
            },

            /**
             * all sass required in component files will be merged in js files
             */
            {
                test    : /\.component\.scss$/,
                loaders : [
                    'raw-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },

            /**
             * Raw loader support for *.html
             * Returns file content as string
             *
             * Reference: https://github.com/webpack/raw-loader
             */
            {
                test    : /\.html$/,
                loader  : 'raw-loader',
                exclude : [
                    HELPERS.root('src/index.html')
                ]
            },

            /**
             * minify and copy images to output
             */
            {
                test    : /\.(png|jpe?g|gif)(\?\S*)?$/,
                exclude : [
                    /node_modules/,
                    HELPERS.root('src/app/content/fonts')
                ],
                loader  : 'null-loader'
            },

            /**
             * Any svg files required from the `content/images/SvgIcons` directory
             * will be combined into an svg store that gets added to the DOM
             * and referenced in a `<use>` tag in the HTML
             *
             * Reference: https://github.com/kisenka/svg-sprite-loader
             */
            {
                test    : /\.svg$/,
                include : [
                    HELPERS.root('src/app/content/images/SvgIcons')
                ],
                loader  : 'null-loader'
            },

            /**
            * Instruments JS files with Istanbul for subsequent code coverage reporting.
            * Instrument only testing sources.
            *
            * Reference: https://github.com/deepsweet/istanbul-instrumenter-loader
            */
            {
                test    : /\.ts$/,
                loader  : 'istanbul-instrumenter-loader',
                include : PATH.resolve('src'),
                exclude : [
                    /\.spec\.ts$/,
                    /\.e2e\.ts$/,
                    /node_modules/
                ],
                enforce : 'post'
            }
        ]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins : [
        /**
         * Plugin: DefinePlugin
         * Description: Define free variables.
         * Useful for having development builds with debug logging or adding global constants.
         *
         * Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
         *
         * NOTE: when adding more properties make sure you include them in custom-typings.d.ts
         */
        new DEFINE_PLUGIN({
            ENV         : JSON.stringify(ENV),
            API_ROOT    : JSON.stringify(METADATA.API_ROOT),
            API_CONFIG  : JSON.stringify(METADATA.API_CONFIG)
        }),

        /**
         * Plugin: ContextReplacementPlugin
         * Description: Provides context to Angular's use of System.import
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
         * See: https://github.com/angular/angular/issues/11580
         */
        new CONTEXT_REPLACEMENT_PLUGIN(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            HELPERS.root('src') // location of your src
        ),

        /**
         * Plugin: LoaderOptionsPlugin
         * Description : The UglifyJsPlugin no longer puts loaders into minimize mode. The debug option has been removed.
         * Loaders should no longer read their options from the webpack configuration.
         * Instead you need to provide these options with the LoaderOptionsPlugin.
         */
        new WEBPACK.LoaderOptionsPlugin({
            minimize    : false,
            debug       : true,
            options     : {
                /**
                 * PostCSS Loader Configuration
                 * Reference: https://github.com/assetsjs/postcss-assets
                 * Asset management for component CSS
                 */
                postcss : function () {
                    return [
                        POST_CSS_ASSETS({
                            basePath    : './src/app/content',
                            baseUrl     : 'content',
                            loadPaths   : [HELPERS.root(DIST_PATH, 'content')]
                        })
                    ];
                },

                /*
                 * Sass-Loader
                 * Description: pass options to node-sass with sassLoader property
                 * See: https://github.com/jtangelder/sass-loader
                 */
                sassLoader : {
                    includePaths : [
                        HELPERS.root('src/app/styles'),
                        HELPERS.root('src/app/shared/components'),
                        HELPERS.root('src/app/epics')
                    ]
                }
            }
        }),
    ]
};
