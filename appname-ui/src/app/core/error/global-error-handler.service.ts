import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { GlobalMessageService } from 'src/app/core/messages/global-message.service';

@TraceClassMethods()
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    // router: Router = inject(Router);

    constructor(private injector: Injector, private translate: TranslateService, @Inject(LOGGER) logger: Logger) {
        super();
    }

    public override handleError(err: Error | HttpErrorResponse): void {
        super.handleError(err);

        const ngZone: NgZone = this.injector.get(NgZone);
        const router = this.injector.get(Router);

        const messageService: GlobalMessageService = this.injector.get(GlobalMessageService);

        const message = { message: this.translate.instant('mensagem.error.default.titulo'), detail: this.translate.instant('mensagem.error.default.mensagem') };

        let showMessage = true;
        if (err instanceof HttpErrorResponse) {
            const serverError = err;
            switch (serverError.status) {
                case 0:
                    void router.navigateByUrl('/pages/error');
                    showMessage = false;
                    break;
                case 400:
                    void router.navigateByUrl('/pages/bad-request');
                    showMessage = false;
                    break;
                case 401:
                    void router.navigateByUrl('/pages/unauthorized');
                    showMessage = false;
                    break;
                case 403:
                    void router.navigateByUrl('/pages/forbidden');
                    showMessage = false;
                    break;
                case 404:
                    void router.navigateByUrl('/pages/not-found');
                    showMessage = false;
                    break;
                case 500:
                    void router.navigateByUrl('/pages/unavailable-server');
                    showMessage = false;
                    break;
                case 503:
                    void router.navigateByUrl('/pages/unavailable-service');
                    showMessage = false;
                    break;
                default:
                    if (serverError.error) {
                        message.message = this.translate.instant('mensagem.error.default.titulo');
                        message.detail = serverError.error.message;
                    }
            }
        }

        if (showMessage) {
            ngZone.run(() => messageService.erro(message.message, { detail: message.detail }));
        }
    }
}
