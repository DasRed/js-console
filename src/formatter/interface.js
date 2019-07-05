export default class FormatterInterface {
    /**
     *
     * @param {number} level
     * @param {*[]} args
     * @return {*[]}
     */
    format(level, args) {
        throw new Error('Method FormatterInterface.format must be overwritten');
    }
}
