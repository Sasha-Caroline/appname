import { Injectable, InjectionToken, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { Entity } from 'src/app/core/models/entity.model';
import { ResultList } from 'src/app/core/pagination/result-list';
import { DataStore } from 'src/app/core/stores/data.store';

export const ENTITY_STORE = new InjectionToken<DataStore<Entity<any>>>('entityStore');
export const ENTITY_STATE = new InjectionToken<Observable<Entity<any>>>('entityState');
export const RESULTSET_STATE = new InjectionToken<Observable<ResultList<Entity<any>>>>('entityState');

@Injectable()
export class EntityStore<E extends Entity<any>> implements OnDestroy {
    private totalState = new BehaviorSubject<number>(0);
    private totalState$ = this.totalState.asObservable();

    private entityState = new BehaviorSubject<E>({} as E);
    private entityState$ = this.entityState.asObservable();

    private resultSetState = new BehaviorSubject<ResultList<E>>({} as ResultList<E>);
    private resultSetState$ = this.resultSetState.asObservable();

    private subscription: Subscription;

    private logger: Logger;

    constructor() {
        this.logger = inject(LOGGER);
        this.logger.context('[EntityStore]');
        this.subscription = this.resultSetState$.pipe(tap(value => this.logger.context(`[STORE]`).debug('', value).closeContext())).subscribe();

        this.logger.closeContext();
    }

    set total(state: number) {
        this.totalState.next(state);
    }

    get total(): number {
        return this.totalState.value;
    }

    get total$(): Observable<number> {
        return this.totalState$;
    }

    set entity(state: E) {
        this.entityState.next(state);
    }

    get entity(): E {
        return this.entityState.value;
    }

    get entity$(): Observable<E> {
        return this.entityState$;
    }

    set resultSet(state: ResultList<E>) {
        this.resultSetState.next(state);
    }

    get resultSet(): ResultList<E> {
        return this.resultSetState.value;
    }

    get resultSet$(): Observable<ResultList<E>> {
        return this.resultSetState$;
    }

    ngOnDestroy(): void {
        this.logger.trace('[EntityStore][ngOnDestroy] Iniciado');
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.logger.trace('[EntityStore][ngOnDestroy] Finalizado');
    }
}
