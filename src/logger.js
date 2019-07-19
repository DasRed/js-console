import WriterMulti from './writer/multi.js';

export default class Logger {
    static LEVEL = {
        DEBUG:     100,
        LOG:       100,
        INFO:      200,
        NOTICE:    250,
        WARN:      300,
        ERROR:     400,
        CRITICAL:  500,
        ALERT:     550,
        EMERGENCY: 600,
    };

    /**
     *
     * @return {number}
     */
    get level() {
        return this.writer.level;
    }

    set level(level) {
        this.writer.level = level;
    }

    /**
     *
     * @param {WriterInterface[]} writers
     * @param {number} [level = Logger.LEVEL.ERROR]
     */
    constructor({level = Logger.LEVEL.ERROR, writers}) {
        this.writer = new WriterMulti({level, writers});
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    alert(...args) {
        return this.handle(Logger.LEVEL.ALERT, args);
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    critical(...args) {
        return this.handle(Logger.LEVEL.CRITICAL, args);
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    debug(...args) {
        return this.handle(Logger.LEVEL.DEBUG, args);
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    emergency(...args) {
        return this.handle(Logger.LEVEL.EMERGENCY, args);
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    error(...args) {
        return this.handle(Logger.LEVEL.ERROR, args);
    }

    /**
     *
     * @param {number} level
     * @param {*[]} args
     * @return {Logger}
     */
    handle(level, args) {
        this.writer.write(level, args);

        return this;
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    info(...args) {
        return this.handle(Logger.LEVEL.INFO, args);
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    log(...args) {
        return this.handle(Logger.LEVEL.LOG, args);
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    notice(...args) {
        return this.handle(Logger.LEVEL.NOTICE, args);
    }

    /**
     *
     * @param {...*} args
     * @return {Logger}
     */
    warn(...args) {
        return this.handle(Logger.LEVEL.WARN, args);
    }
}

