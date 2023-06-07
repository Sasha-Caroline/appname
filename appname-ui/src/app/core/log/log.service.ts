import { Injectable, InjectionToken } from '@angular/core';
import { Subject, debounceTime, filter } from 'rxjs';
import { LogEvent } from 'src/app/core/log/enums/log-event.enum';
import { LogLevel } from 'src/app/core/log/enums/log-level.enum';
import { LogEntry } from 'src/app/core/log/models/log-entry.model';
import { ConsolePublisher } from 'src/app/core/log/publishers/console-publisher';
import { LogPublisher } from 'src/app/core/log/publishers/log-publisher';
import { User } from 'src/app/core/models/user.model';

export interface Logger {
    trace(msg: string, ...optionalParams: any[]): Logger;
    debug(msg: string, ...optionalParams: any[]): Logger;
    info(msg: string, ...optionalParams: any[]): Logger;
    success(msg: string, ...optionalParams: any[]): Logger;
    warn(msg: string, ...optionalParams: any[]): Logger;
    error(msg: string, ...optionalParams: any[]): Logger;

    userInfo(user: User): Logger;
    context(context: string): Logger;
    closeContext(): Logger;
}

export const LOGGER = new InjectionToken<Logger>('LOGGER');

@Injectable({ providedIn: 'root' })
export class LogService implements Logger {
    public static instance: Logger;

    private publishers: LogPublisher[];
    private buffer: LogEntry[] = [];

    private events = new Subject<LogEvent>();

    private user: User = null;
    private contextStack: string[] = [];

    constructor() {
        LogService.instance = this;

        this.buildPublishers();
        this.subscribeEvents();
    }

    private subscribeEvents(): void {
        this.events
            .pipe(
                debounceTime(100),
                filter(event => event === LogEvent.FLUSH)
            )
            .subscribe(() => this.onFlushBuffer());
    }

    private buildPublishers(): void {
        this.publishers = [];
        this.publishers.push(new ConsolePublisher());
    }

    private appendBuffer(msg: string, level: LogLevel, params: any[]): void {
        const entry = { entryDate: new Date(), context: this.currentContext(), message: msg, level: level, extraInfo: params, userInfo: this.user, stack: this.stackTrace() } as LogEntry;
        this.buffer.push(entry);
    }

    private stackTrace(): string {
        const error = new Error();
        const stack = error.stack
            .split('\n')
            .slice(4)
            .map(line => line.replace(/\s+at\s+/, ''))
            .join('\n');
        return stack;
    }

    private flush(): void {
        this.events.next(LogEvent.FLUSH);
    }

    private onFlushBuffer() {
        const data = this.buffer.splice(0);

        if (data.length === 0) {
            return;
        }

        this.publishers.forEach(logger => data.forEach(entry => logger.log(entry)));
    }

    trace(msg: string, ...optionalParams: any[]): Logger {
        this.appendBuffer(msg, LogLevel.TRACE, optionalParams);
        this.flush();
        return this;
    }

    debug(msg: string, ...optionalParams: any[]): Logger {
        this.appendBuffer(msg, LogLevel.DEBUG, optionalParams);
        this.flush();
        return this;
    }

    info(msg: string, ...optionalParams: any[]): Logger {
        this.appendBuffer(msg, LogLevel.INFO, optionalParams);
        this.flush();
        return this;
    }

    success(msg: string, ...optionalParams: any[]): Logger {
        this.appendBuffer(msg, LogLevel.SUCCESS, optionalParams);
        this.flush();
        return this;
    }

    warn(msg: string, ...optionalParams: any[]): Logger {
        this.appendBuffer(msg, LogLevel.WARN, optionalParams);
        this.flush();
        return this;
    }

    error(msg: string, ...optionalParams: any[]): Logger {
        this.appendBuffer(msg, LogLevel.ERROR, optionalParams);
        this.flush();
        return this;
    }

    userInfo(user: User): Logger {
        this.user = user;
        return this;
    }

    context(context: string): Logger {
        this.contextStack.push(context);
        return this;
    }

    closeContext(): Logger {
        this.contextStack.pop();
        return this;
    }

    private currentContext(): string {
        return this.contextStack.length ? this.contextStack[this.contextStack.length - 1] : null;
    }
}
