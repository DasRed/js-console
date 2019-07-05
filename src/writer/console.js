import WriterInterface from './interface.js';
import Logger from '../logger.js';

const LEVEL_MAP = {
    [Logger.LEVEL.DEBUG]:     console.debug,
    [Logger.LEVEL.LOG]:       console.log,
    [Logger.LEVEL.INFO]:      console.info,
    [Logger.LEVEL.NOTICE]:    console.warn,
    [Logger.LEVEL.WARN]:      console.warn,
    [Logger.LEVEL.ERROR]:     console.error,
    [Logger.LEVEL.CRITICAL]:  console.error,
    [Logger.LEVEL.ALERT]:     console.error,
    [Logger.LEVEL.EMERGENCY]: console.error,
    default:                  console.log,
};

export default class WriterConsole extends WriterInterface {
    /**
     *
     * @param {number} level
     * @param {*[]} args
     * @return {WriterConsole}
     */
    write(level, args) {
        const fn = LEVEL_MAP[level] || LEVEL_MAP.default;

        fn(...args);

        return this;
    }
}
