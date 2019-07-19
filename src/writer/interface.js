export default class WriterInterface {
    /**
     *
     * @param {number} [level]
     * @param {FormatterInterface} [formatter]
     */
    constructor({level = undefined, formatter = undefined} = {}) {
        this.level     = level;
        this.formatter = formatter;
    }

    /**
     *
     * @param {number} level
     * @param {*[]} args
     * @return {WriterInterface}
     */
    write(level, args) {
        throw new Error('Method WriterInterface.write must be overwritten');
    }
}
