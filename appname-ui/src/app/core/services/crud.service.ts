import { Injectable, InjectionToken } from '@angular/core';
import { Observable, shareReplay, take } from 'rxjs';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { Entity } from 'src/app/core/models/entity.model';
import { QueryService } from 'src/app/core/services/query.service';
import { EntityStore } from 'src/app/core/stores/entity.store';

export const ENTITY_SERVICE = new InjectionToken<CrudService<any>>('entityService');

@TraceClassMethods()
@Injectable()
export abstract class CrudService<E extends Entity<any>> extends QueryService<E> {
    constructor(store?: EntityStore<E>) {
        super(store);
    }

    protected override getUrl(): string {
        return `${this.API}/${this.PATH}`;
    }

    private create(entidade: E): Observable<E> {
        const options = {
            body: entidade,
        };

        return this.http.post<E>(`${this.getUrl()}`, options).pipe(take(1), shareReplay());
    }

    private update(entidade: E): Observable<E> {
        const options = {
            body: entidade,
        };

        return this.http.put<E>(`${this.getUrl()}/${entidade.id}`, options).pipe(take(1), shareReplay());
    }

    new(): void {
        this.store.entity = {} as E;
    }

    save(entidade: E, callbackSucesso?: (entity: E) => void, callbackError?: (err: any) => void): void {
        if (entidade) {
            if (entidade.id) {
                this.onSave(this.update(entidade), callbackSucesso, callbackError);
            } else {
                this.onSave(this.create(entidade), callbackSucesso, callbackError);
            }
        }
    }

    onSave(entity$: Observable<E>, callbackSucesso?: (entity: E) => void, callbackError?: (err: any) => void): void {
        entity$.subscribe({
            next: e => {
                const entity: E = { ...e };
                this.store.entity = entity;
                this.onSaved(entity);
                console.log('[SUCCESS] SAVE', entity);
                if (callbackSucesso) callbackSucesso(entity);
            },
            error: err => {
                console.log('[ERROR] SAVE', err);
                if (callbackError) callbackError(err);
            },
        });
    }

    onSaved(entity: E): void {}

    delete(obj: number | string | Entity<any>, callbackSucesso?: (entity: E) => void, callbackError?: (err: any) => void): void {
        if (obj !== null && obj !== undefined) {
            const id = this.isEntity(obj) ? obj['id'] : obj;
            this.onDelete(this.http.delete<void>(`${this.getUrl()}/${id}`).pipe(take(1), shareReplay()), obj, callbackSucesso, callbackError);
        }
    }

    onDelete(obs$: Observable<void>, obj: number | string | Entity<any>, callbackSucesso?: (entity: E) => void, callbackError?: (err: any) => void): void {
        obs$.subscribe({
            next: () => {
                let newState: E = {} as E;
                if (this.isEntity(obj)) {
                    newState = { ...(obj as E) };
                } else {
                    newState.id = obj;
                }

                this.store.entity = newState;
                this.onDeleted(obj);
                console.log('[SUCCESS] DELETE', obj);
                if (callbackSucesso) callbackSucesso(newState);
            },
            error: err => {
                console.log('[ERROR] DELETE', err);
                if (callbackError) callbackError(err);
            },
        });
    }

    onDeleted(obj: number | string | Entity<any>): void {}
}
