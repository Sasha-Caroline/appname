import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';

@TraceClassMethods()
@Injectable({ providedIn: 'root' })
export class LoadingUIService {
    private progressSource = new BehaviorSubject<boolean>(false);

    progress$ = this.progressSource.asObservable();
    count = 0;

    constructor() {}

    exibir(): void {
        this.count++;
        this.progressSource.next(true);
    }

    ocultar(): void {
        this.count--;
        if (!this.count) {
            this.progressSource.next(false);
        }
    }
}
