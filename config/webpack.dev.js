const DIST_PATH   = __dirname + '/.dist',

    HELPERS = require('./helpers'),

    WEBPACK = require('webpack'),

    // used to merge webpack configs
    WEBPACK_MERGE = require('webpack-merge'),

    // the settings that are common to all webpack builds
    COMMON_CONFIG = require('./webpack.common.js'),

    /**
     * Webpack Plugins
     */
    DEFINE_PLUGIN        = require('webpack/lib/DefinePlugin'),
    NAMED_MODULES_PLUGIN  = require('webpack/lib/NamedModulesPlugin'),
    HTML_WEBPACK_PLUGIN   = require('html-webpack-plugin'),
    EXTRACT_TEXT_PLUGIN   = require('extract-text-webpack-plugin'),

    /**
     *  PostCSS plugins
     * @type {any}
     */
    AUTO_PREFIXER    = require('autoprefixer'),
    POST_CSS_ASSETS   = require('postcss-assets'),
    POST_CSS_MQ_PACKER = require('css-mqpacker'),

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
            getPaymentAccounts  : 'payments/accounts',

            /* employer */
            getCompanies    : 'companies/',
            getPlans        : 'plans/'

        }
    });

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = WEBPACK_MERGE(COMMON_CONFIG, {
        /**
         * Developer tool to enhance debugging
         *
         * See: http://webpack.github.io/docs/configuration.html#devtool
         * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
         */
        devtool : 'cheap-module-eval-source-map',

        /*
         * Output
         * Reference: http://webpack.github.io/docs/configuration.html#output
         * Should be an empty object if it's generating a test build
         * Karma will handle setting it up for you when it's a test build
         */
        output : {
            /**
             * The output directory as absolute path (required).
             *
             * Reference: http://webpack.github.io/docs/configuration.html#output-path
             */
            path : HELPERS.root('.dist'),

            /**
             * Specifies the name of each output file on disk.
             * IMPORTANT: You must not specify an absolute path here!
             *
             * Reference: http://webpack.github.io/docs/configuration.html#output-filename
             */
            filename : '[name].bundle.js',

            /**
             * The filename of the SourceMaps for the JavaScript files.
             * They are inside the output.path directory.
             *
             * Reference: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
             */
            sourceMapFilename : '[name].map',

            /**
             * The filename of non-entry chunks as relative path
             * inside the output.path directory.
             *
             * Reference: http://webpack.github.io/docs/configuration.html#output-chunkfilename
             */
            chunkFilename : '[id].chunk.js'
        },

        /*
         * Options affecting the normal modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module : {
            /*
             * An array of automatically applied loaders.
             *
             * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
             * This means they are not resolved relative to the configuration file.
             *
             * See: http://webpack.github.io/docs/configuration.html#module-loaders
             */
            rules : [
                /**
                 * all css in sass-config.scss will be bundled in an external css file
                 */
                {
                    test    : /\.scss$/,
                    include : [
                        HELPERS.root('src/app/sass-config.scss'),
                        HELPERS.root('src/app/styles')
                    ],
                    loader  : EXTRACT_TEXT_PLUGIN.extract({
                        loader         : [
                            {
                                loader  : 'css-loader',
                                query   : {
                                    sourceMap : false // set to true...
                                }
                            },
                            'postcss-loader',
                            {
                                loader  : 'sass-loader',
                                query   : {
                                    sourceMap : false // set to true...
                                }
                            }
                        ],
                        fallbackLoader : 'style-loader'
                    })
                },

                /**
                 * copy fonts to output
                 * excluding images directory since svg can be images or fonts
                 */
                {
                    test    : /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                    loader  : 'file-loader',
                    query   : {
                        name : 'content/fonts/[name].[ext]'
                    },
                    exclude : [HELPERS.root('src/app/content/images')],
                },

                /**
                 * minify and copy images to output
                 */
                {
                    test    : /\.(png|jpe?g|gif)(\?\S*)?$/,
                    loaders : [
                        {
                            loader  : 'file-loader',
                            query   : {
                                name : 'content/images/[name].[ext]'
                            }
                        }
                    ],
                    exclude : [
                        /node_modules/,
                        HELPERS.root('src/app/content/fonts')
                    ]
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
                    include : [HELPERS.root('src/app/content/images/SvgIcons')],
                    loader  : 'svg-sprite-loader?' + JSON.stringify({
                        name        : '[name]',
                        prefixize   : true
                    })
                }
            ]
        },

        /*
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
             * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
             *
             * NOTE: when adding more properties make sure you include them in custom-typings.d.ts
             */
            new DEFINE_PLUGIN({
                title       : JSON.stringify(METADATA.title),
                baseUrl     : JSON.stringify(METADATA.baseUrl),
                isDevServer : JSON.stringify(METADATA.isDevServer),
                ENV         : JSON.stringify(ENV),
                API_ROOT    : JSON.stringify(METADATA.API_ROOT),
                API_CONFIG  : JSON.stringify(METADATA.API_CONFIG)
            }),

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
                    tslint : {
                        /**
                        * tslint errors are displayed by default as warnings
                        * set emitErrors to true to display them as errors
                        */
                        emitErrors : false,

                        /**
                        * tslint does not interrupt the compilation by default
                        * if you want any file with tslint errors to fail
                        * set failOnHint to true
                        */
                        failOnHint : false,

                        /**
                        * files to target for linting live here
                        */
                        resourcePath : './src'
                    },

                    /**
                     * PostCSS Loader Configuration
                     * Reference: https://github.com/geut/postcss-copy
                     * Copy images referenced in component stylesheets
                     *
                     * Reference: https://github.com/TrySound/postcss-inline-svg
                     * Inline SVG and customize its styles
                     *
                     * Reference: https://github.com/assetsjs/postcss-assets
                     * Asset management for component CSS
                     *
                     * Reference: https://github.com/postcss/autoprefixer-core
                     * Add vendor prefixes to your css
                     */
                    postcss : function () {
                        return [
                            POST_CSS_ASSETS({
                                basePath    : './src/app/content',
                                baseUrl     : 'content',
                                loadPaths   : [HELPERS.root(DIST_PATH, 'content')]
                            }),
                            POST_CSS_MQ_PACKER(),
                            AUTO_PREFIXER({
                                browsers    : METADATA.stylesConfig.browsers
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

            /**
             * Plugin: NamedModulePlugin (experimental)
             * Description: Uses file names as module name.
             *
             * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
             */
            new NAMED_MODULES_PLUGIN(),

            /*
             * Plugin: ExtractTextPlugin
             * Description: Extract css from inline styles in the JS bundles and create separate CSS bundles
             *
             * See: https://github.com/webpack/extract-text-webpack-plugin
             */
            new EXTRACT_TEXT_PLUGIN({
                filename    : 'style.css',
                allChunks   : true
            }),

            /*
             * Plugin: HTMLWebpackPlugin
             * Description: Simplifies creation of HTML files to serve your webpack bundles.
             * This is especially useful for webpack bundles that include a hash in the filename
             * which changes every compilation.
             *
             * See: https://github.com/ampedandwired/html-webpack-plugin
             */
            new HTML_WEBPACK_PLUGIN({
                template        : 'src/index.html',
                chunksSortMode  : 'dependency'
            })
        ],

        /**
         * webpack-dev-server configuration
         * Reference: http://webpack.github.io/docs/configuration.html#devserver
         * Reference: http://webpack.github.io/docs/webpack-dev-server.html
         */
        devServer : {
            contentBase         : HELPERS.root(DIST_PATH),
            quiet               : true,
            port                : 5050,
            host                : 'localhost',
            historyApiFallback  : true,
            watchOptions        : {
                aggregateTimeout    : 300,
                poll                : 1000
            }
        }
});
