import { Pipe, PipeTransform } from '@angular/core';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { User } from 'src/app/core/models/user.model';
@TraceClassMethods()
@Pipe({ name: 'name', standalone: true })
export class NamePipe implements PipeTransform {
    transform(name: string | string[] | User[], type: 'firstName' | 'lastName' | 'fullName' | 'givenName' = 'givenName'): string | string[] {
        if (name) {
            if (typeof name == 'string') {
                const fullNameAsString: string = name;
                return this.handle(fullNameAsString, type);
            } else if (typeof name[0] == 'string') {
                const fullNameAsStringArray: string[] = name as string[];
                return fullNameAsStringArray.map(n => this.handle(n, type));
            } else {
                const fullNameAsUserArray: User[] = name as User[];
                return fullNameAsUserArray.map(u => this.handle(u.name, type));
            }
        }
        return null;
    }

    private handle(fullName: string, type: 'firstName' | 'lastName' | 'fullName' | 'givenName' = 'givenName'): string {
        const givenName = fullName.split(/(\s).+\s/).join('');
        if (type == 'fullName') return fullName;
        if (type == 'givenName') return givenName;

        const splittedName: string[] = givenName.split(' ');
        if (type == 'firstName') return splittedName[0];
        if (type == 'lastName' && splittedName.length > 1) return splittedName[1];

        return '';
    }
}
