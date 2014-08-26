define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'text!templates/example.tmpl' // pour appeler un template
    ], function($, _, Backbone, appConfig, tmpl) {

        'use strict';

        // console.log($);
        // console.log(_);
        // console.log(Backbone);

        // deal with envConfig
        var envConfig = _.extend({}, window.ENV_CONFIG);
        window.ENV_CONFIG = undefined;

        //  DEBUG
        //  ------------------------------------------------------
        //  erase console if `env.debug` is set to `false`
        //  else "avoid errors in browser that lack a console"
        //  cf. https://github.com/h5bp/html5-boilerplate/blob/master/js/plugins.js
        (function(debug) {
            var method;
            var noop = function () {};
            var methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeStamp', 'trace', 'warn'
            ];
            var length = methods.length;
            var console = (window.console = window.console || {});

            while (length--) {
                method = methods[length];

                // Only stub undefined methods.
                if (debug) {
                    if (!console[method]) {
                        console[method] = noop;
                    }
                // if debug === false - remove all console methods
                } else {
                    console[method] = noop;
                }
            }
        }(envConfig.debug));

        // declare polyfills, _.mixin here
        _.mixin({
            constrain: function(value, min, max) {
                if (value > max) { value = max; }
                if (value < min) { value = min; }
                return value;
            }
        });

        $(document).ready(function() {
            var exampleView = _.template(tmpl, { name: 'Backbone / RequireJS boilerplate' });
            $('body').append(exampleView);
            // app.initialize(appConfig, envConfig)   // create router etc...
            // Backbone.history.start();
        });

    }
);