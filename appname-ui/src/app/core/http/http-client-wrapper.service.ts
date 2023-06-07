import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { LOGGER, Logger } from 'src/app/core/log/log.service';

@TraceClassMethods()
@Injectable({ providedIn: 'root' })
export class HttpClientWrapper {
    constructor(private http: HttpClient, @Inject(LOGGER) private logger: Logger) {}

    get<T>(url: string, options?: any): Observable<T> {
        return this.request('GET', url, options);
    }

    post<T>(url: string, options?: any): Observable<T> {
        return this.request('POST', url, options);
    }

    patch<T>(url: string, options?: any): Observable<T> {
        return this.request('PATCH', url, options);
    }

    put<T>(url: string, options?: any): Observable<T> {
        return this.request('PUT', url, options);
    }

    delete<T>(url: string, options?: any): Observable<void> {
        return this.request('DELETE', url, options);
    }

    private request<T>(method: string, url: string, options?: any): Observable<T> {
        this.logger.context('[HTTP Request]');
        this.logger.debug(`${method} - ${url}`, options);
        this.logger.closeContext();

        return new Observable<T>(observer =>
            this.http.request<T>(method, url, options).subscribe({
                next: e => {
                    this.logger.context('[HTTP Response]');
                    this.logger.debug('', e);
                    const result: T = e as T;
                    this.logger.closeContext();
                    observer.next(result);
                },
                error: err => {
                    this.logger.context('[HTTP Error]');
                    this.logger.error('', err);
                    observer.error(err);
                    this.logger.closeContext();
                    throw err;
                },
                complete: () => {
                    observer.complete();
                },
            })
        );
    }
}
