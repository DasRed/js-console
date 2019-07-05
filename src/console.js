import Logger from './logger.js'
import FormatterConsole from './formatter/console.js';
import WriterConsole from './writer/console.js';
import Colorize from './colorize.js';

const logger = new Logger({
    formatter: new FormatterConsole(),
    writer:    new WriterConsole(),
});

console.logger = logger;
console.LEVEL = Logger.LEVEL;
Object.defineProperty(console, 'level', {
    /**
     * @return {number}
     */
    get: () => console.logger.level,
    set: (level) => console.logger.level = level,
});

console.emergency = (...args) => logger.emergency(...args) && undefined;
console.critical  = (...args) => logger.critical(...args) && undefined;
console.alert     = (...args) => logger.alert(...args) && undefined;
console.error     = (...args) => logger.error(...args) && undefined;
console.warn      = (...args) => logger.warn(...args) && undefined;
console.notice    = (...args) => logger.notice(...args) && undefined;
console.info      = (...args) => logger.info(...args) && undefined;
console.log       = (...args) => logger.log(...args) && undefined;
console.debug     = (...args) => logger.debug(...args) && undefined;

Object.entries(Colorize.COLOR).forEach(([/** string */colorName, /** ColorizeCSS */ color]) => {
    colorName = colorName.substr(0, 1) + colorName.substr(1).toLowerCase();

    console['emergency' + colorName] = (...args) => logger.emergency(color, ...args) && undefined;
    console['critical' + colorName]  = (...args) => logger.critical(color, ...args) && undefined;
    console['alert' + colorName]     = (...args) => logger.alert(color, ...args) && undefined;
    console['error' + colorName]     = (...args) => logger.error(color, ...args) && undefined;
    console['warn' + colorName]      = (...args) => logger.warn(color, ...args) && undefined;
    console['notice' + colorName]    = (...args) => logger.notice(color, ...args) && undefined;
    console['info' + colorName]      = (...args) => logger.info(color, ...args) && undefined;
    console['log' + colorName]       = (...args) => logger.log(color, ...args) && undefined;
    console['debug' + colorName]     = (...args) => logger.debug(color, ...args) && undefined;
});

export default console;
