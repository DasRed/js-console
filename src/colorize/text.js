import ColorizeCSS from './css.js';

export default class ColorizeText {
    /**
     *
     * @param {string} text
     * @param {ColorizeCSS|Object} css
     */
    constructor(text, css) {
        this.css  = css instanceof ColorizeCSS ? css : new ColorizeCSS(css);
        this.text = text;
    }
}
