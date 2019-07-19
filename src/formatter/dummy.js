import FormatterInterface from './interface.js';

export default class FormatterDummy extends FormatterInterface {
    /**
     * @param {number} level
     * @param {*[]} args
     * @return {*[]}
     */
    format(level, args) {
        return args;
    }
}
