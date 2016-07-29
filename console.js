'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            root.console = factory(root, root.console || {});
        });

    } else if (typeof exports !== 'undefined') {
        factory(root, root.console || {});

    } else {
        root.console = factory(root, root.console || {});
    }

}(this, function (root, console) {

    // log levels
    console.LEVEL_CRITICAL = 1;
    console.LEVEL_ALERT = 2;
    console.LEVEL_ERROR = 3;
    console.LEVEL_WARN = 4;
    console.LEVEL_NOTICE = 5;
    console.LEVEL_INFO = 6;
    console.LEVEL_DEBUG = 7;

    console.level = console.LEVEL_DEBUG;

    var hasColorSupport = (root.navigator === undefined || root.navigator.userAgent === undefined || (/Trident/g).test(root.navigator.userAgent) === false);

    var warnText = {};
    warnText[console.LEVEL_CRITICAL] = 'critical';
    warnText[console.LEVEL_ALERT] = 'alert   ';
    warnText[console.LEVEL_ERROR] = 'error   ';
    warnText[console.LEVEL_WARN] = 'warn    ';
    warnText[console.LEVEL_NOTICE] = 'notice  ';
    warnText[console.LEVEL_INFO] = 'info    ';
    warnText[console.LEVEL_DEBUG] = 'debug   ';

    /**
     * colors
     */
    var colors =
    {
        grey: 'color: #777777;',
        green: 'color: #00AA00;',
        blue: 'color: #0000CC;',
        turquoise: 'color: #00AAAA;',
        yellow: 'color: #AAAA00;',
        pink: 'color: #CC00CC;',
        red: 'color: #CC0000;',
        black: 'color: #000000;'
    };

    /**
     * returns the script name of caller
     *
     * @returns {String}
     */
    function getScriptName() {
        var errorHelper = new Error();
        if (errorHelper.stack === undefined) {
            return 'unknown';
        }

        var stack = errorHelper.stack.match(/http\:\/\/(.*?)\.js/gi);
        var source = stack[stack.length - 1];
        if (stack.length >= 4) {
            source = stack[3];
        }

        if (root.location !== undefined) {
            source = source.replace(root.location.origin, '');
            source = source.replace(root.location.href, '');
        }

        if (root.document !== undefined) {
            source = source.replace(root.document.head.baseURI, '');
        }

        return source.replace('.js', '');
    }

    /**
     * partial
     *
     * @param {Function} callback
     * @param {Mixed} ...
     * @param {Mixed} ...
     */
    function partial (callback) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();

        return function () {
            return callback.apply(this, [].concat(args, Array.prototype.slice.call(arguments)));
        };
    }

    /**
     * wrapper function for console functions
     *
     * @param {String} warnLevel
     * @param {Function} proceed
     * @param {String} color if content in "color" starts with "color: #" thenn it is used als color value, otherwise as log message
     * @param {Mixed} ...
     * @param {Mixed} ...
     * ...
     */
    function wrapper(warnLevel, proceed, color) {
        if (warnLevel > console.level) {
            return;
        }

        var date = new Date();

        // get primitive values from date
        var day = String(date.getDate());
        var month = String(date.getMonth() + 1);
        var year = String(date.getFullYear());

        var hours = String(date.getHours());
        var minutes = String(date.getMinutes());
        var seconds = String(date.getSeconds());
        var milliseconds = String(date.getMilliseconds());

        // make it readable for humans. we need more maschines. long live skynet
        day = (day.length < 2 ? '0' : '') + day;
        month = (month.length < 2 ? '0' : '') + month;

        hours = (hours.length < 2 ? '0' : '') + hours;
        minutes = (minutes.length < 2 ? '0' : '') + minutes;
        seconds = (seconds.length < 2 ? '0' : '') + seconds;
        milliseconds = (milliseconds.length < 3 ? '0' : '') + milliseconds;
        milliseconds = (milliseconds.length < 3 ? '0' : '') + milliseconds;

        // make human readable date string
        var dateString = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;

        // make args to array.
        var args = Array.prototype.slice.call(arguments);
        // first in args is warnlevel. must be removed
        // second in args is wrapped function. must be removed
        args.shift();
        args.shift();

        // define a color for log message
        var colorValue = null;
        if (typeof color === 'string' && color.substr(0, 8) == 'color: #') {
            // has color support
            if (hasColorSupport === true) {
                colorValue = color;
            }
            args.shift();
        }

        // create parameters
        var parameters = ['[' + warnText[warnLevel] + '] [' + dateString + '] [' + getScriptName() + ']'].concat(args);

        // run original function for console
        if (proceed.apply) {
            // add color informations to parameters
            if (colorValue !== null) {
                var prependString = '%c';
                for (var i = 0; i < parameters.length; i++) {
                    if (i > 0) {
                        prependString += ' ';
                    }
                    switch (typeof parameters[i]) {
                        case 'string':
                        case 'number':
                        case 'boolean':
                            prependString += '%s';
                            break;

                        default:
                            prependString += '%o';
                            break;
                    }
                }
                parameters.unshift(colorValue);
                parameters.unshift(prependString);
            }

            return proceed.apply(this, parameters);
        }

        // IE8 does not support .apply on the console functions :(
        return proceed(parameters.join(''));
    }

    // Backup
    var consoleError = console.error || function() {};
    var consoleWarn = console.warn || function() {};
    var consoleInfo = console.info || function() {};
    var consoleLog = console.log || function() {};
    var consoleDebug = console.debug || function() {};

    // wraps all log functions
    console.critical = partial(wrapper, console.LEVEL_CRITICAL, consoleError);
    console.alert = partial(wrapper, console.LEVEL_ALERT, consoleError);
    console.error = partial(wrapper, console.LEVEL_ERROR, consoleError);

    console.warn = partial(wrapper, console.LEVEL_WARN, consoleWarn);
    console.notice = partial(wrapper, console.LEVEL_NOTICE, consoleWarn);

    console.info = partial(wrapper, console.LEVEL_INFO, consoleInfo);

    console.debug = partial(wrapper, console.LEVEL_DEBUG, consoleDebug);
    console.log = partial(wrapper, console.LEVEL_DEBUG, consoleLog);

    for (var colorName in colors) {
        var colorValue = colors[colorName];
        colorName = colorName.substr(0, 1).toUpperCase() + colorName.substr(1);

        console['critical' + colorName] = partial(wrapper, console.LEVEL_CRITICAL, consoleError, colorValue);
        console['alert' + colorName] = partial(wrapper, console.LEVEL_ALERT, consoleError, colorValue);
        console['error' + colorName] = partial(wrapper, console.LEVEL_ERROR, consoleError, colorValue);

        console['warn' + colorName] = partial(wrapper, console.LEVEL_WARN, consoleWarn, colorValue);
        console['notice' + colorName] = partial(wrapper, console.LEVEL_NOTICE, consoleWarn, colorValue);

        console['info' + colorName] = partial(wrapper, console.LEVEL_INFO, consoleInfo, colorValue);

        console['debug' + colorName] = partial(wrapper, console.LEVEL_DEBUG, consoleDebug, colorValue);
        console['log' + colorName] = partial(wrapper, console.LEVEL_DEBUG, consoleLog, colorValue);
    }

    return console;
}));
