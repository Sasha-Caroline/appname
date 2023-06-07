import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { finalize } from 'rxjs';
import { LOGGER, Logger } from 'src/app/core/log/log.service';

import { environment } from 'src/environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const logger: Logger = inject(LOGGER);
    logger.context('[AuthInterceptor]');
    logger.trace('Iniciado');

    logger.debug(`Interceptada a requisição [${req.method}] ${req.url} `);

    const allowedUrls: string[] = [environment.apiUrl as string];
    const authStorage: OAuthStorage = inject(OAuthStorage);

    const url = req.url.toLowerCase();
    if (!allowedUrls.find(u => url.startsWith(u))) {
        logger.debug('Não foi necessário incluir cabeçalho Bearer na requisição');
        return next(req);
    }

    const token = authStorage.getItem('access_token');
    const header = 'Bearer ' + token;
    const headers = req.headers.set('Authorization', header);

    logger.info(`Cabeçalho 'Bearer [token]' incluído na requisição`, headers);

    req = req.clone({ headers });

    return next(req).pipe(finalize(() => logger.trace('Finalizado').closeContext()));
};
