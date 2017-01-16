const TEMP_PATH = '.tmp',

    // webpack instance and helper funcs
    WEBPACK = require('webpack'),
    HELPERS = require('./helpers'),

    // webpack plugins
    COPY_WEBPACK_PLUGIN           = require('copy-webpack-plugin'),
    SPRITE_SMITH_PLUGIN           = require('webpack-spritesmith'),
    ASSETS_PLUGIN                 = require('assets-webpack-plugin'),
    CONTEXT_REPLACEMENT_PLUGIN    = require('webpack/lib/ContextReplacementPlugin'),

    /*
     * Webpack Constants
     */
    METADATA = {
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
        }
    };

var AWESOME_TS_LOADER = require('awesome-typescript-loader');

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry : {
        polyfills : './src/polyfills.browser.ts',
        vendor    : './src/vendor.browser.ts',
        main      : './src/main.browser.ts'
    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve : {
        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions : ['.ts', '.js', '.json', '.scss'],

        // An array of directory names to be resolved to the current directory
        modules : [
            HELPERS.root('src'),
            'node_modules',
            'content',
            TEMP_PATH
        ]
    },

    /*
     * Separate resolve options for loaders
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolveLoader : {
        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions : ['.ts', '.js', '.json', '.scss'],

        // An array of directory names to be resolved to the current directory
        modules : [
            HELPERS.root('src'),
            'node_modules',
            'content',
            TEMP_PATH
        ]
    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module : {
        /**
         * rules for modules (configure loaders, parser options, etc.)
         *
         * See: http://webpack.js.org/configuration/module/#module-rules
         */
        rules : [
            /*
             * Tslint loader support for *.ts files
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            {
                test    : /\.ts$/,
                loader  : 'tslint-loader',
                enforce : 'pre'
            },

            /*
             * Source map loader support for *.js files
             * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
             *
             * See: https://github.com/webpack/source-map-loader
             */
            {
                test    : /\.js$/,
                loader  : 'source-map-loader',
                exclude : [
                    // these packages have problems with their sourcemaps
                    HELPERS.root('node_modules/rxjs'),
                    HELPERS.root('node_modules/@ngrx/core'),
                    HELPERS.root('node_modules/@angular')
                ],
                enforce : 'pre'
            },

            /*
             * Typescript loader support for .ts files
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test    : /\.ts$/,
                loaders : [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude : [/\.(spec|e2e)\.ts$/]
            },

            /*
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
                test    : /\.json$/,
                loader  : 'json-loader'
            },

            /**
             * support for .txt files
             */
            {
                test    : /\.txt/,
                loader  : 'raw-loader'
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
             * handle individual svg files that are not fonts
             * these svg files will be optimized and inlined
             * as utf-8 encoded DataUrl strings in the HTML
             *
             * Reference: https://github.com/bhovhannes/svg-url-loader
             */
            {
                test    : /\.svg$/,
                loader  : 'svg-url-loader',
                exclude  : [
                    HELPERS.root('src/app/content/fonts'),
                    HELPERS.root('src/app/content/images/SvgIcons')
                ],
            },

            /* Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
                test    : /\.html$/,
                loader  : 'raw-loader',
                exclude : [HELPERS.root('src/index.html')]
            }
        ]
    },

    /*
     * Add additional plugins to the compiler.
     *
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins : [
        /*
         * Plugin: AssetsPlugin
         * Description: When working with Webpack you might want to generate your bundles with a generated hash in them (for cache busting).
         *              This plug-in outputs a json file with the paths of the generated assets so you can find them from somewhere else.
         *              Emits a json file with assets paths.
         *
         * See: https://github.com/kossnocorp/assets-webpack-plugin
         */
        new ASSETS_PLUGIN({
            path        : HELPERS.root('.dist'),
            filename    : 'webpack-assets.json',
            prettyPrint : true
        }),

        /*
         * Plugin: ForkCheckerPLugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        new AWESOME_TS_LOADER.CheckerPlugin(),

        /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
        new WEBPACK.optimize.CommonsChunkPlugin({
            name : ['main', 'vendor', 'polyfills']
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

        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new COPY_WEBPACK_PLUGIN([{
            from    : 'src/app/content',
            to      : 'content'
        }], {
            ignore  : [
                // don't copy any files with .scss extension
                '*.scss',

                // ignore all svg icons
                'images/SvgIcons',
                {
                    glob    : 'styles/*.*',
                    dot     : true
                },
                {
                    glob    : 'images/SvgIcons/*.*',
                    dot     : true
                }
            ]
        }),

        /**
         * plugin that converts set of images into a spritesheet and
         * SASS/LESS/Stylus mixins, using spritesmith and spritesheet-templates
         *
         * Reference: https://github.com/mixtur/webpack-spritesmith
         */
        new SPRITE_SMITH_PLUGIN({
            src : {
                cwd : HELPERS.root('src/app/content/images/sprite'),
                glob    : '*.*'
            },
            target : {
                image   : './' + TEMP_PATH + '/content/sprite.png',
                css     : './' + TEMP_PATH + '/_sprite.scss'
            },
            apiOptions : {
                cssImageRef : '~content/sprite.png'
            },
            spritesmithOptions : {
                padding     : METADATA.stylesConfigspritePadding,
                algorithm   : METADATA.stylesConfigspriteAlgorithm
            }
        }),
    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node : {
        global          : true,
        crypto          : 'empty',
        process         : true,
        module          : false,
        clearImmediate  : false,
        setImmediate    : false
    }
};
