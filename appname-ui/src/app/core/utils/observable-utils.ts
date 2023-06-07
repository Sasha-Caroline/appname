import { HttpErrorResponse } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';

@TraceClassMethods()
export class ObservableUtils {
    private DEFAULT_CONTEXT = 'APP_CONTEXT';

    private destroyables: { [context: string]: ReplaySubject<boolean> } = {};

    public untilDestroyed(context: string = this.DEFAULT_CONTEXT): ReplaySubject<boolean> {
        let subject$: ReplaySubject<boolean> = this.destroyables[context];

        if (!subject$) {
            subject$ = new ReplaySubject<boolean>(1);
            this.destroyables[context] = subject$;
        }
        return subject$;
    }

    public destroy(context: string = this.DEFAULT_CONTEXT): void {
        const subject$: ReplaySubject<boolean> = this.destroyables[context];
        this.complete(subject$);
        delete this.destroyables[context];
    }

    public destroyAll(ignoredContexts: string[] = []): void {
        let subject$: ReplaySubject<boolean> = null;

        for (const context in this.destroyables) {
            if (ignoredContexts.indexOf(context) < 0) {
                subject$ = this.destroyables[context];
                this.complete(subject$);
                delete this.destroyables[context];
            }
        }
    }

    private complete(subject$: ReplaySubject<boolean>): void {
        if (subject$) {
            subject$.next(true);
            subject$.complete();
        }
    }

    public ignoreError404<T>(error: HttpErrorResponse, caught: Observable<T>): Observable<T> {
        if (error.status !== 404) {
            console.log('ERROR', error);
            throw error;
        }
        return of<T>(null);
    }
}
