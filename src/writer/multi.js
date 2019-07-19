import WriterInterface from './interface.js';

export default class WriterMulti extends WriterInterface {
    /**
     *
     * @return {number}
     */
    get level() {
        return this._level;
    }

    set level(level) {
        this._level = level;

        if (this.writers) {
            this.writers.forEach((writer) => writer.level = level);
        }
    }

    /**
     *
     * @param {number} level
     * @param {WriterInterface[]} writers
     */
    constructor({level = undefined, writers}) {
        super({level});

        this.writers = writers;
        this.writers.filter((writer) => writer.level === undefined).forEach((writer) => writer.level = this.level);
    }

    /**
     *
     * @param {WriterInterface} writer
     * @return {WriterMulti}
     */
    append(writer) {
        if (writer.level === undefined) {
            writer.level = this.level;
        }

        this.writers.push(writer);

        return this;
    }

    /**
     *
     * @param {number} level
     * @param {*[]} args
     * @return {WriterMulti}
     */
    write(level, args) {
        this.writers.forEach((writer) => {
            if (level < writer.level) {
                return;
            }

            let argsParam = [...args];
            if (writer.formatter) {
                argsParam = writer.formatter.format(level, argsParam);
            }

            writer.write(level, argsParam);
        });

        return this;
    }
}
