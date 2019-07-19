declare namespace Logger {
    enum LEVEL {
        DEBUG = 100,
        LOG = 100,
        INFO = 200,
        NOTICE = 250,
        WARN = 300,
        ERROR = 400,
        CRITICAL = 500,
        ALERT = 550,
        EMERGENCY = 600,
    }

    type LEVEL_VALUE = LEVEL.DEBUG | LEVEL.LOG | LEVEL.INFO | LEVEL.NOTICE | LEVEL.WARN | LEVEL.ERROR | LEVEL.CRITICAL | LEVEL.ALERT | LEVEL.EMERGENCY;

    interface LoggerConstructorOptions {
        writers: Array<WriterInterface>;
        level?: LEVEL_VALUE;
    }

    export class Logger {
        public level: LEVEL_VALUE;
        public writer: WriterMulti;

        constructor(options?: LoggerConstructorOptions);

        public alert(...args): Logger;

        public critical(...args): Logger;

        public debug(...args): Logger;

        public emergency(...args): Logger;

        public error(...args): Logger;

        public handle(level: LEVEL_VALUE, args: Array<any>): Logger;

        public info(...args): Logger;

        public log(...args): Logger;

        public notice(...args): Logger;

        public warn(...args): Logger;
    }

    export abstract class FormatterInterface {
        public abstract format(level: LEVEL_VALUE, args: Array<any>): Array<any>;
    }

    export class FormatterDummy extends FormatterInterface {
        public format(level: LEVEL_VALUE, args: Array<any>): Array<any>;
    }

    export class FormatterConsole extends FormatterInterface {
        public format(level: LEVEL_VALUE, args: Array<any>): Array<any>;
    }

    interface WriterConstructorOptions {
        formatter?: FormatterInterface;
        level?: LEVEL_VALUE;
    }

    export abstract class WriterInterface {
        public level: LEVEL_VALUE;
        public formatter?: FormatterInterface;

        constructor(options?: WriterConstructorOptions);

        public abstract write(level: LEVEL_VALUE, args: Array<any>): Array<any>;
    }

    interface WriterMultiConstructorOptions {
        writers: Array<WriterInterface>;
        level?: LEVEL_VALUE;
    }

    export class WriterMulti extends WriterInterface {
        public writers: Array<WriterInterface>;

        constructor(options: WriterMultiConstructorOptions);

        public append(writer: WriterInterface): WriterMulti;

        public write(level: LEVEL_VALUE, args: Array<any>): Array<any>;
    }

    export class WriterConsole extends WriterInterface {
        public write(level: LEVEL_VALUE, args: Array<any>): Array<any>;
    }

    interface Color {
        GREY: ColorizeCSS;
        GREEN: ColorizeCSS;
        BLUE: ColorizeCSS;
        TURQUOISE: ColorizeCSS;
        YELLOW: ColorizeCSS;
        PINK: ColorizeCSS;
        RED: ColorizeCSS;
        ORANGE: ColorizeCSS;
        BLACK: ColorizeCSS;
    }

    export class Colorize {
        static black(text: string): ColorizeText;

        static blue(text: string): ColorizeText;

        static colorize(css: ColorizeCSS | Object, text: string): ColorizeText;

        static green(text: string): ColorizeText;

        static grey(text: string): ColorizeText;

        static orange(text: string): ColorizeText;

        static pink(text: string): ColorizeText;

        static red(text: string): ColorizeText;

        static turquoise(text: string): ColorizeText;

        static yellow(text: string): ColorizeText;
    }

    export class ColorizeText {
        text: string;
        css: ColorizeCSS;

        constructor(text: string, css: ColorizeCSS | Object);
    }

    export class ColorizeCSS {
        [key: string]: any;

        constructor(css: Object);

        public toString(): string;
    }
}
