import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { LoadingUIService } from 'src/app/core/progress/loading-ui.service';
@TraceClassMethods()
@Injectable()
export class LoadingUIInterceptor implements HttpInterceptor {
    constructor(private loadingUIService: LoadingUIService, @Inject(LOGGER) logger: Logger) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const metodosElegiveis = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
        if (metodosElegiveis.includes(request.method)) {
            this.loadingUIService.exibir();
        }

        return next.handle(request).pipe(finalize(() => this.loadingUIService.ocultar()));
    }
}
