import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { LOGGER, Logger } from 'src/app/core/log/log.service';

@Injectable()
export class DataStore<T> implements OnDestroy {
    private data = new BehaviorSubject<T>({} as T);
    private data$ = this.data.asObservable();

    private subscription: Subscription;

    private logger: Logger;

    constructor() {
        this.logger = inject(LOGGER);
        this.logger.context('[DataStore]');
        this.subscription = this.data$.pipe(tap(value => this.logger.context('[STATE]').debug('', value).closeContext())).subscribe();

        this.logger.closeContext();
    }

    set value(state: T) {
        this.data.next(state);
    }

    get value(): T {
        return this.data.value;
    }

    get value$(): Observable<T> {
        return this.data$;
    }

    ngOnDestroy(): void {
        this.logger.trace('[DataStore][ngOnDestroy] Iniciado');
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.logger.trace('[DataStore][ngOnDestroy] Finalizado');
    }
}
