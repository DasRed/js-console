export default class WriterInterface {
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
