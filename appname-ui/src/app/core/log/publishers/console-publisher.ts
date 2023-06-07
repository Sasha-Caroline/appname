import { Observable, of } from 'rxjs';
import { LogLevel } from 'src/app/core/log/enums/log-level.enum';
import { LogEntry } from 'src/app/core/log/models/log-entry.model';
import { LogPublisher } from 'src/app/core/log/publishers/log-publisher';
import { User } from 'src/app/core/models/user.model';
import { DateUtils } from 'src/app/core/utils/date-utils';

export class ConsolePublisher extends LogPublisher {
    log(entry: LogEntry): Observable<boolean> {
        switch (entry.level) {
            case LogLevel.INFO:
            case LogLevel.SUCCESS:
                this.print(entry, console.info);
                break;
            case LogLevel.WARN:
                this.print(entry, console.warn);
                break;
            case LogLevel.ERROR:
                this.print(entry, console.error);
                break;
            default:
                this.print(entry, console.log);
                break;
        }

        if (this.showStackTrace) {
            console.group('Stack Trace');
            console.log(entry.stack);
            console.groupEnd();
        }

        return of(true);
    }

    private print(entry: LogEntry, handler: (message?: any, ...optionalParams: any[]) => void): void {
        if (this.showLevel(entry.level)) {
            const message: string = `[${LogLevel[entry.level]}] ${this.formatUserInfo(entry.userInfo)}${this.formatDateTime(entry.entryDate)}- ${this.formatContext(entry.context)}${entry.message}`;
            if (entry.extraInfo?.length) {
                handler(message, entry.extraInfo);
            } else {
                handler(message);
            }
        }
    }

    private formatContext(entryContext: string): string {
        if (!entryContext) return '';

        return `${entryContext} `;
    }

    private formatUserInfo(userInfo: User): string {
        if (!userInfo?.login) return '';

        return `${userInfo.login} | `;
    }

    private formatDateTime(entryDate: Date): string {
        if (!entryDate || !this.showDateTime) return '';

        return `${DateUtils.format(entryDate, this.dateTimeFormat)} `;
    }

    clear(): Observable<boolean> {
        console.clear();
        return of(true);
    }
}
