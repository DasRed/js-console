/**
 * @typedef {Object} ConsoleEx
 * @property {function(*, ...*)} emergency
 * @property {function(*, ...*)} critical
 * @property {function(*, ...*)} alert
 * @property {function(*, ...*)} notice
 * @property {function(*, ...*)} emergencyGrey
 * @property {function(*, ...*)} criticalGrey
 * @property {function(*, ...*)} alertGrey
 * @property {function(*, ...*)} errorGrey
 * @property {function(*, ...*)} warnGrey
 * @property {function(*, ...*)} noticeGrey
 * @property {function(*, ...*)} infoGrey
 * @property {function(*, ...*)} debugGrey
 * @property {function(*, ...*)} emergencyGreen
 * @property {function(*, ...*)} criticalGreen
 * @property {function(*, ...*)} alertGreen
 * @property {function(*, ...*)} errorGreen
 * @property {function(*, ...*)} warnGreen
 * @property {function(*, ...*)} noticeGreen
 * @property {function(*, ...*)} infoGreen
 * @property {function(*, ...*)} debugGreen
 * @property {function(*, ...*)} emergencyBlue
 * @property {function(*, ...*)} criticalBlue
 * @property {function(*, ...*)} alertBlue
 * @property {function(*, ...*)} errorBlue
 * @property {function(*, ...*)} warnBlue
 * @property {function(*, ...*)} noticeBlue
 * @property {function(*, ...*)} infoBlue
 * @property {function(*, ...*)} debugBlue
 * @property {function(*, ...*)} emergencyTurquoise
 * @property {function(*, ...*)} criticalTurquoise
 * @property {function(*, ...*)} alertTurquoise
 * @property {function(*, ...*)} errorTurquoise
 * @property {function(*, ...*)} warnTurquoise
 * @property {function(*, ...*)} noticeTurquoise
 * @property {function(*, ...*)} infoTurquoise
 * @property {function(*, ...*)} debugTurquoise
 * @property {function(*, ...*)} emergencyYellow
 * @property {function(*, ...*)} criticalYellow
 * @property {function(*, ...*)} alertYellow
 * @property {function(*, ...*)} errorYellow
 * @property {function(*, ...*)} warnYellow
 * @property {function(*, ...*)} noticeYellow
 * @property {function(*, ...*)} infoYellow
 * @property {function(*, ...*)} debugYellow
 * @property {function(*, ...*)} emergencyPink
 * @property {function(*, ...*)} criticalPink
 * @property {function(*, ...*)} alertPink
 * @property {function(*, ...*)} errorPink
 * @property {function(*, ...*)} warnPink
 * @property {function(*, ...*)} noticePink
 * @property {function(*, ...*)} infoPink
 * @property {function(*, ...*)} debugPink
 * @property {function(*, ...*)} emergencyRed
 * @property {function(*, ...*)} criticalRed
 * @property {function(*, ...*)} alertRed
 * @property {function(*, ...*)} errorRed
 * @property {function(*, ...*)} warnRed
 * @property {function(*, ...*)} noticeRed
 * @property {function(*, ...*)} infoRed
 * @property {function(*, ...*)} debugRed
 * @property {function(*, ...*)} emergencyBlack
 * @property {function(*, ...*)} criticalBlack
 * @property {function(*, ...*)} alertBlack
 * @property {function(*, ...*)} errorBlack
 * @property {function(*, ...*)} warnBlack
 * @property {function(*, ...*)} noticeBlack
 * @property {function(*, ...*)} infoBlack
 * @property {function(*, ...*)} debugBlack
 *
 * @property {Number} LEVEL_DEBUG
 * @property {Number} LEVEL_INFO
 * @property {Number} LEVEL_NOTICE
 * @property {Number} LEVEL_WARN
 * @property {Number} LEVEL_ERROR
 * @property {Number} LEVEL_CRITICAL
 * @property {Number} LEVEL_ALERT
 * @property {Number} LEVEL_EMERGENCY
 */

const root = window || global;
/** @var {Console|ConsoleEx} */
const console = root.console;

/**
 * no op function
 */
function noop() {

}

// Backup
const consoleError = console.error || noop;
const consoleWarn  = console.warn || noop;
const consoleInfo  = console.info || noop;
const consoleLog   = console.log || noop;
const consoleDebug = console.debug || noop;

// log levels from Monolog
console.LEVEL_DEBUG     = 100;
console.LEVEL_INFO      = 200;
console.LEVEL_NOTICE    = 250;
console.LEVEL_WARN      = 300;
console.LEVEL_ERROR     = 400;
console.LEVEL_CRITICAL  = 500;
console.LEVEL_ALERT     = 550;
console.LEVEL_EMERGENCY = 600;

// initial default level
console.level = console.LEVEL_DEBUG;

const hasColorSupport = (root.navigator === undefined || root.navigator.userAgent === undefined || (/Trident/g).test(root.navigator.userAgent) === false);

const warnText                    = {};
warnText[console.LEVEL_EMERGENCY] = 'emergency';
warnText[console.LEVEL_CRITICAL]  = 'critical ';
warnText[console.LEVEL_ALERT]     = 'alert    ';
warnText[console.LEVEL_ERROR]     = 'error    ';
warnText[console.LEVEL_WARN]      = 'warn     ';
warnText[console.LEVEL_NOTICE]    = 'notice   ';
warnText[console.LEVEL_INFO]      = 'info     ';
warnText[console.LEVEL_DEBUG]     = 'debug    ';

/**
 * colors
 */
const colors = {
    grey:      'color: #777777;',
    green:     'color: #00AA00;',
    blue:      'color: #0000CC;',
    turquoise: 'color: #00AAAA;',
    yellow:    'color: #AAAA00;',
    pink:      'color: #CC00CC;',
    red:       'color: #CC0000;',
    black:     'color: #000000;'
};

/**
 * returns the script name of caller
 *
 * @returns {String}
 */
function getScriptName() {
    let source = 'unknown';
    let stack  = getStackFromError();
    if (stack.length !== 0) {
        source = stack[0];
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
 * returns the stack without console
 *
 * @returns {Array}
 */
function getStackFromError() {
    const errorHelper = new Error();
    if (errorHelper.stack === undefined) {
        return [];
    }

    const stack = errorHelper.stack.match(/http(s){0,1}\:\/\/(.*?)\.js/gi);
    if (stack === null) {
        return [];
    }

    const test = /console\.js$/i;
    for (let i = 0; i < stack.length; i++) {
        if (stack[i].match(test) !== null) {
            continue;
        }

        return stack.slice(i);
    }

    return [];
}

/**
 * partial
 *
 * @param {Function} callback
 * @param {...*}
 */
function partial(callback) {
    const args = Array.prototype.slice.call(arguments);
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
 * @param {...*}
 * ...
 */
function wrapper(warnLevel, proceed, color) {
    if (warnLevel < console.level) {
        return;
    }

    const date = new Date();

    // get primitive values from date
    let day   = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year  = String(date.getFullYear());

    let hours        = String(date.getHours());
    let minutes      = String(date.getMinutes());
    let seconds      = String(date.getSeconds());
    let milliseconds = String(date.getMilliseconds());

    // make it readable for humans. we need more maschines. long live skynet
    day   = (day.length < 2 ? '0' : '') + day;
    month = (month.length < 2 ? '0' : '') + month;

    hours        = (hours.length < 2 ? '0' : '') + hours;
    minutes      = (minutes.length < 2 ? '0' : '') + minutes;
    seconds      = (seconds.length < 2 ? '0' : '') + seconds;
    milliseconds = (milliseconds.length < 3 ? '0' : '') + milliseconds;
    milliseconds = (milliseconds.length < 3 ? '0' : '') + milliseconds;

    // make human readable date string
    const dateString = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;

    // make args to array.
    const args = Array.prototype.slice.call(arguments);
    // first in args is warnlevel. must be removed
    // second in args is wrapped function. must be removed
    args.shift();
    args.shift();

    // define a color for log message
    let colorValue = null;
    if (typeof color === 'string' && color.substr(0, 8) === 'color: #') {
        // has color support
        if (hasColorSupport === true) {
            colorValue = color;
        }
        args.shift();
    }

    // create parameters
    const parameters = ['[' + warnText[warnLevel] + '] [' + dateString + '] [' + getScriptName() + ']'].concat(args);

    // run original function for console
    if (proceed.apply) {
        // add color informations to parameters
        if (colorValue !== null) {
            let prependString = '%c';
            for (let i = 0; i < parameters.length; i++) {
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

// wraps all log functions
console.emergency = partial(wrapper, console.LEVEL_EMERGENCY, consoleError);
console.critical  = partial(wrapper, console.LEVEL_CRITICAL, consoleError);
console.alert     = partial(wrapper, console.LEVEL_ALERT, consoleError);
console.error     = partial(wrapper, console.LEVEL_ERROR, consoleError);
console.warn      = partial(wrapper, console.LEVEL_WARN, consoleWarn);
console.notice    = partial(wrapper, console.LEVEL_NOTICE, consoleWarn);
console.info      = partial(wrapper, console.LEVEL_INFO, consoleInfo);
console.debug     = partial(wrapper, console.LEVEL_DEBUG, consoleDebug);
console.log       = partial(wrapper, console.LEVEL_DEBUG, consoleLog);

console.emergency.level = console.LEVEL_EMERGENCY;
console.critical.level  = console.LEVEL_CRITICAL;
console.alert.level     = console.LEVEL_ALERT;
console.error.level     = console.LEVEL_ERROR;
console.warn.level      = console.LEVEL_WARN;
console.notice.level    = console.LEVEL_NOTICE;
console.info.level      = console.LEVEL_INFO;
console.debug.level     = console.LEVEL_DEBUG;
console.log.level       = console.LEVEL_DEBUG;

for (let colorName in colors) {
    let colorValue = colors[colorName];
    colorName      = colorName.substr(0, 1).toUpperCase() + colorName.substr(1);

    console['emergency' + colorName] = partial(wrapper, console.LEVEL_EMERGENCY, consoleError, colorValue);
    console['critical' + colorName]  = partial(wrapper, console.LEVEL_CRITICAL, consoleError, colorValue);
    console['alert' + colorName]     = partial(wrapper, console.LEVEL_ALERT, consoleError, colorValue);
    console['error' + colorName]     = partial(wrapper, console.LEVEL_ERROR, consoleError, colorValue);
    console['warn' + colorName]      = partial(wrapper, console.LEVEL_WARN, consoleWarn, colorValue);
    console['notice' + colorName]    = partial(wrapper, console.LEVEL_NOTICE, consoleWarn, colorValue);
    console['info' + colorName]      = partial(wrapper, console.LEVEL_INFO, consoleInfo, colorValue);
    console['debug' + colorName]     = partial(wrapper, console.LEVEL_DEBUG, consoleDebug, colorValue);
    console['log' + colorName]       = partial(wrapper, console.LEVEL_DEBUG, consoleLog, colorValue);

    console['emergency' + colorName].level = console.LEVEL_EMERGENCY;
    console['critical' + colorName].level  = console.LEVEL_CRITICAL;
    console['alert' + colorName].level     = console.LEVEL_ALERT;
    console['error' + colorName].level     = console.LEVEL_ERROR;
    console['warn' + colorName].level      = console.LEVEL_WARN;
    console['notice' + colorName].level    = console.LEVEL_NOTICE;
    console['info' + colorName].level      = console.LEVEL_INFO;
    console['debug' + colorName].level     = console.LEVEL_DEBUG;
    console['log' + colorName].level       = console.LEVEL_DEBUG;
}

export default console;
