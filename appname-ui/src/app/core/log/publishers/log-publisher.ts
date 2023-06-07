import { Observable } from 'rxjs';
import { LogLevel } from 'src/app/core/log/enums/log-level.enum';
import { LogEntry } from 'src/app/core/log/models/log-entry.model';
import { loggerProperties } from 'src/environments/log.properties';
export abstract class LogPublisher {
    protected dateTimeFormat: string = loggerProperties.dateTimeFormat;
    protected showDateTime: boolean = loggerProperties.showDateTime;
    protected showStackTrace: boolean = loggerProperties.showStackTrace;
    protected level: string = loggerProperties.level;

    showLevel(entryLevel: LogLevel): boolean {
        const logLevel: LogLevel = LogLevel[this.level];
        return entryLevel >= logLevel && entryLevel != LogLevel.OFF;
    }

    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}
