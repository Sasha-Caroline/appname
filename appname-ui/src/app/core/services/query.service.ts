import { HttpParams } from '@angular/common/http';
import { Injectable, Optional, inject } from '@angular/core';
import { Observable, distinctUntilChanged, shareReplay, take } from 'rxjs';
import { HttpClientWrapper } from 'src/app/core/http/http-client-wrapper.service';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { Entity } from 'src/app/core/models/entity.model';
import { FilterField } from 'src/app/core/pagination/filter-field';
import { ResultList } from 'src/app/core/pagination/result-list';
import { SortField } from 'src/app/core/pagination/sort-field';
import { EntityStore } from 'src/app/core/stores/entity.store';
import { ObservableUtils } from 'src/app/core/utils/observable-utils';
import { environment } from 'src/environments/environment';
@TraceClassMethods()
@Injectable()
export abstract class QueryService<E extends Entity<any>> {
    protected API: string = environment.apiUrl;
    protected abstract PATH: string;
    protected observableUtils: ObservableUtils = new ObservableUtils();
    protected http: HttpClientWrapper = inject(HttpClientWrapper);

    constructor(@Optional() protected store?: EntityStore<E>) {}

    protected getUrl(): string {
        return `${this.API}/${this.PATH}`;
    }

    protected isEntity(obj: any): obj is Entity<any> {
        return 'id' in obj;
    }

    total(filter?: FilterField[], callbackSucesso?: (total: number) => void, callbackError?: (err: any) => void): Observable<number> {
        let params = new HttpParams();

        const result$ = this.http.get<number>(`${this.getUrl()}/total`, { params: params }).pipe(distinctUntilChanged(), take(1), shareReplay());
        this.onTotal(result$, callbackSucesso, callbackError);
        return result$;
    }

    onTotal(total$: Observable<number>, callbackSucesso?: (total: number) => void, callbackError?: (err: any) => void): void {
        if (this.store) {
            total$.subscribe({
                next: total => {
                    this.store.total = total;
                    if (callbackSucesso) callbackSucesso(total);
                },
                error: err => {
                    console.error(err);
                    if (callbackError) callbackError(err);
                },
            });
        }
    }

    list(
        filter?: FilterField[],
        offset?: number,
        limit?: number,
        sort?: SortField[],
        callbackSucesso?: (entity: ResultList<E>) => void,
        callbackError?: (err: any) => void
    ): Observable<ResultList<E>> {
        let params = new HttpParams();

        params = offset != null && offset != undefined ? params.append('offset', offset) : params;
        params = limit != null && limit != undefined ? params.append('limit', offset + limit) : params;

        const result$ = this.http.get<ResultList<E>>(`${this.getUrl()}`, { params: params }).pipe(distinctUntilChanged(), take(1), shareReplay());
        this.onList(result$, callbackSucesso, callbackError);
        return result$;
    }

    onList(data$: Observable<ResultList<E>>, callbackSucesso?: (entity: ResultList<E>) => void, callbackError?: (err: any) => void): void {
        if (this.store) {
            data$.subscribe({
                next: d => {
                    const newState: ResultList<E> = { ...d };
                    this.store.resultSet = newState;
                    if (callbackSucesso) callbackSucesso(newState);
                },
                error: err => {
                    console.error(err);
                    if (callbackError) callbackError(err);
                },
            });
        }
    }

    onListed(entity: E[]): void {}

    load(id: number | string, callbackSucesso?: (entity: E) => void, callbackError?: (err: any) => void): Observable<E> {
        const result$ = this.http.get<E>(`${this.getUrl()}/${id}`).pipe(take(1), shareReplay());
        this.onLoad(result$, callbackSucesso, callbackError);
        return result$;
    }

    onLoad(entity$: Observable<E>, callbackSucesso?: (entity: E) => void, callbackError?: (err: any) => void): void {
        if (this.store) {
            entity$.subscribe({
                next: e => {
                    const newState: E = { ...e };
                    this.store.entity = newState;

                    this.onLoaded(newState);
                    if (callbackSucesso) callbackSucesso(newState);
                },
                error: err => {
                    console.error(err);
                    if (callbackError) callbackError(err);
                },
            });
        }
    }

    onLoaded(entity: E): void {}
}
