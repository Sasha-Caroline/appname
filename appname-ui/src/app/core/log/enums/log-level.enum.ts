export enum LogLevel {
    OFF = 0,
    TRACE = 1,
    DEBUG = 2,
    INFO = 3,
    SUCCESS = 4,
    WARN = 5,
    ERROR = 6,
}

export type LogLevelString = keyof typeof LogLevel;
