export enum Env {
    DEV = 'development',
    PROD = 'production',
    TEST = 'test',
}

export enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    DEBUG = 'debug',
}

export type ObjectLiteral = { [key: string]: any };

export type Device = 'ios' | 'android';
