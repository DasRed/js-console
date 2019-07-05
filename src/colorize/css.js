function camelCaseToDash(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

export default class ColorizeCSS extends Object {
    /**
     *
     * @param {Object} css
     */
    constructor(css) {
        super();

        Object.assign(this, css);
    }

    /**
     *
     * @return {string}
     */
    toString() {
        return Object.entries(this)
                     .map(([key, value]) => `${camelCaseToDash(key)}: ${String(value)};`)
                     .join('')
    }
}
