import ColorizeText from './colorize/text.js';
import ColorizeCSS from './colorize/css.js';

export default class Colorize {
    static COLOR = {
        GREY:      new ColorizeCSS({color: '#777777',}),
        GREEN:     new ColorizeCSS({color: '#00AA00',}),
        BLUE:      new ColorizeCSS({color: '#0000CC',}),
        TURQUOISE: new ColorizeCSS({color: '#00AAAA',}),
        YELLOW:    new ColorizeCSS({color: '#AAAA00',}),
        PINK:      new ColorizeCSS({color: '#CC00CC',}),
        RED:       new ColorizeCSS({color: '#CC0000',}),
        ORANGE:    new ColorizeCSS({color: '#ff9800',}),
        BLACK:     new ColorizeCSS({color: '#000000',}),
    };

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static black(text) {
        return this.colorize(Colorize.COLOR.black, text);
    }

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static blue(text) {
        return this.colorize(Colorize.COLOR.BLUE, text);
    }

    /**
     *
     * @param {ColorizeCSS|Object} css
     * @param {string} text
     * @return {ColorizeText}
     */
    static colorize(css, text) {
        return new ColorizeText(text, css);
    }

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static green(text) {
        return this.colorize(Colorize.COLOR.GREEN, text);
    }

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static grey(text) {
        return this.colorize(Colorize.COLOR.GREY, text);
    }

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static orange(text) {
        return this.colorize(Colorize.COLOR.ORANGE, text);
    }

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static pink(text) {
        return this.colorize(Colorize.COLOR.PINK, text);
    }

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static red(text) {
        return this.colorize(Colorize.COLOR.RED, text);
    }

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static turquoise(text) {
        return this.colorize(Colorize.COLOR.TURQUOISE, text);
    }

    /**
     *
     * @param {string} text
     * @return {ColorizeText}
     */
    static yellow(text) {
        return this.colorize(Colorize.COLOR.YELLOW, text);
    }
}
