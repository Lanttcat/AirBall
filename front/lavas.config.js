/**
 * @file lavas config
 * @author lanyixing(lanyixing@baidu.com)
 */

'use strict';

const path = require('path');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    build: {
        ssr: false,
        path: BUILD_PATH,
        publicPath: '/',
        ssrCopy: isDev ? [] : [
            {
                src: 'server.prod.js'
            },
            {
                src: 'package.json'
            }
        ],
        // 默认配置，启动 localhost:8888 服务器展示网页
        // bundleAnalyzerReport: false,

        // // 自定义配置
        // bundleAnalyzerReport: {
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     // 省略其他配置
        // },
        /**
         * alias for webpack
         *
         * @type {Object.<string, Object>}
         */
        alias: {
            server: {
                'iscroll/build/iscroll-lite$': path.join(__dirname, 'core/iscroll-ssr.js')
            }
        },
        /**
         * node externals
         *
         * @type {Array.<string|RegExp>}
         */
        nodeExternalsWhitelist: [
            /iscroll/
        ],
        // extend(config, {type, env}) {
        //     // 在客户端和服务端同时生效，等同于 type === 'client' || type === 'server'
        //     if (type === 'base') {
        //         config.dev = {
        //             disableHostCheck: true,
        //             host: '0.0.0.0',
        //             port: 8080
        //         };
        //         console.log(config);
        //         // devServer.push({
        //         //     host: '0.0.0.0'
        //         // });
        //     }
        // }
        extendWithWebpackChain(config, {type, env}) {
            // eslint 检测出错误时，依然继续编译
            config.devServer.disableHostCheck(true);
            config.devServer.host('0.0.0.0');
        },
        // 监控server自动重启
        watch: [
            '/server'
        ]
    },
    router: {
        mode: 'history',
        base: '/',
        pageTransition: {
            type: 'slide',
            transitionClass: 'slide'
        },
        routes: [
            {
                pattern: /\/user/,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    serviceWorker: {
        swSrc: path.join(__dirname, 'core/service-worker.js'),
        swDest: path.join(BUILD_PATH, 'service-worker.js'),
        // swPath: '/custom_path/', // specify custom serveice worker file's path, default is publicPath
        globDirectory: BUILD_PATH,
        globPatterns: [
            '**/*.{html,js,css,eot,svg,ttf,woff}'
        ],
        globIgnores: [
            'sw-register.js',
            '**/*.map'
        ],
        appshellUrl: '/appshell',
        dontCacheBustUrlsMatching: /\.\w{8}\./
    },
    extend(config) {
        console.log(config);
    }
};
