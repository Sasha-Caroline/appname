import { LogLevel } from 'src/app/core/log/enums/log-level.enum';
import { User } from 'src/app/core/models/user.model';

export interface LogEntry {
    entryDate: Date;
    userInfo: User;
    context: string;
    message: string;
    level: LogLevel;
    extraInfo: any[];
    stack: string;
}
