import FormatterInterface from './interface.js';
import Logger from '../logger.js';
import ColorizeText from '../colorize/text.js';
import Colorize from '../colorize.js';
import ColorizeCSS from '../colorize/css.js';

const HAS_COLOR_SUPPORT = (navigator === undefined || navigator.userAgent === undefined || (/Trident/g).test(navigator.userAgent) === false);
const DEFAULT_CSS       = 'background-color: transparent; color: #303943;';
const LEVEL_TEXT_MAP    = {
    [Logger.LEVEL.EMERGENCY]: 'emergency',
    [Logger.LEVEL.CRITICAL]:  'critical ',
    [Logger.LEVEL.ALERT]:     'alert    ',
    [Logger.LEVEL.ERROR]:     'error    ',
    [Logger.LEVEL.WARN]:      'warn     ',
    [Logger.LEVEL.NOTICE]:    'notice   ',
    [Logger.LEVEL.INFO]:      'info     ',
    [Logger.LEVEL.LOG]:       'debug    ',
    [Logger.LEVEL.DEBUG]:     'debug    ',
};
const LEVEL_COLOR_MAP   = {
    [Logger.LEVEL.EMERGENCY]: Colorize.COLOR.RED,
    [Logger.LEVEL.CRITICAL]:  Colorize.COLOR.RED,
    [Logger.LEVEL.ALERT]:     Colorize.COLOR.RED,
    [Logger.LEVEL.ERROR]:     Colorize.COLOR.RED,
    [Logger.LEVEL.WARN]:      Colorize.COLOR.ORANGE,
    [Logger.LEVEL.NOTICE]:    Colorize.COLOR.ORANGE,
    [Logger.LEVEL.INFO]:      Colorize.COLOR.GREEN,
    [Logger.LEVEL.LOG]:       Colorize.COLOR.GREEN,
    [Logger.LEVEL.DEBUG]:     Colorize.COLOR.GREEN,
};

/**
 *
 * @return {string}
 */
function getDate() {
    const date = new Date();

    // get primitive values from date
    let day    = String(date.getDate());
    let month  = String(date.getMonth() + 1);
    const year = String(date.getFullYear());

    let hours        = String(date.getHours());
    let minutes      = String(date.getMinutes());
    let seconds      = String(date.getSeconds());
    let milliseconds = String(date.getMilliseconds());

    // make it readable for humans. we need more machines. long live skynet
    day   = (day.length < 2 ? '0' : '') + day;
    month = (month.length < 2 ? '0' : '') + month;

    hours        = (hours.length < 2 ? '0' : '') + hours;
    minutes      = (minutes.length < 2 ? '0' : '') + minutes;
    seconds      = (seconds.length < 2 ? '0' : '') + seconds;
    milliseconds = (milliseconds.length < 3 ? '0' : '') + milliseconds;
    milliseconds = (milliseconds.length < 3 ? '0' : '') + milliseconds;

    // make human readable date string
    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

/**
 *
 * @return {string[]}
 */
function getStackFromError() {
    const errorHelper = new Error();
    if (errorHelper.stack === undefined) {
        return [];
    }

    const stack = errorHelper.stack.match(/http(s)?:\/\/(.*?)\.(m)?js/gi);
    if (stack === null) {
        return [];
    }

    const test = /(logger|console)\.js$/i;
    for (let i = 0; i < stack.length; i++) {
        if (stack[i].match(test) !== null) {
            continue;
        }

        return stack.slice(i);
    }

    return [];
}

/**
 *
 * @return {string}
 */
function getScriptName() {
    let source  = 'unknown';
    const stack = getStackFromError();
    if (stack.length !== 0) {
        source = stack[0];
    }

    if (window.location !== undefined) {
        source = source.replace(window.location.origin, '');
        source = source.replace(window.location.href, '');
    }

    if (window.document !== undefined) {
        source = source.replace(window.document.head.baseURI, '');
    }

    return source;
}

/**
 *
 * @param {string|number|Node|Object|*} value
 * @return {string}
 * @see https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css
 */
function evalType(value) {
    switch (true) {
        case typeof value === 'number':
            return Math.abs(value - Math.floor(value)) <= 0.0000001 ? 'd' : 'f';

        case typeof value === 'string':
        default:
            return 's';

        case value instanceof Node:
            return 'o';

        case value instanceof Object:
            return 'O';
    }
}

export default class FormatterConsole extends FormatterInterface {
    /**
     * @param {number} level
     * @param {*[]} args
     * @return {*[]}
     */
    format(level, args) {
        if (args.length === 0) {
            return args;
        }

        if (args[0] instanceof ColorizeCSS) {
            args.splice(1, 0, `[${LEVEL_TEXT_MAP[level]}] [${getDate()}] [${getScriptName()}] `);
        }
        else {
            args.unshift(LEVEL_COLOR_MAP[level], `[${LEVEL_TEXT_MAP[level]}] [${getDate()}] [${getScriptName()}] `);
        }

        let lastIndexOfColor = args.slice(0).reverse().findIndex((arg) => arg instanceof ColorizeCSS || arg instanceof ColorizeText || typeof arg === 'string');
        if (lastIndexOfColor === -1) {
            return args;
        }
        else {
            lastIndexOfColor = args.length - lastIndexOfColor - 1;
        }

        if (HAS_COLOR_SUPPORT === false) {
            return arg
                .filter((arg) => arg instanceof ColorizeCSS)
                .map((arg) => {
                    if (arg instanceof ColorizeText) {
                        return arg.text;
                    }
                    return arg;
                });
        }

        let lastColorizeCSS = undefined;
        return args.reduce((result, arg, index) => {
            if (index > lastIndexOfColor) {
                result.push(arg);
            }

            else if (arg instanceof ColorizeCSS) {
                lastColorizeCSS = arg;
            }

            else if (arg instanceof ColorizeText) {
                result[0] += `%c%${evalType(arg.text)}%c`;
                result.push(arg.css.toString(), arg.text, DEFAULT_CSS);
            }

            else {
                const type = evalType(arg);
                if (type === 's' && lastColorizeCSS !== undefined) {
                    result[0] += `%c%s%c`;
                    result.push(lastColorizeCSS.toString(), arg, DEFAULT_CSS);
                }
                else {
                    result[0] += `%${type} `;
                    result.push(arg);
                }
            }

            return result;
        }, ['']);
    }
}
