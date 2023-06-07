import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, firstValueFrom, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { environment } from 'src/environments/environment';

export const authGuard: CanMatchFn = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    const logger: Logger = inject(LOGGER);
    const router: Router = inject(Router);
    logger.context('[AuthGuard]');
    logger.trace('Iniciado');

    if (environment.securityEnabled) {
        const authService = inject(AuthService);
        const user = authService.loadUserInfo();
        if (!user) {
            void router.navigateByUrl('/pages/unauthorized');
        }

        logger.success('Usuário autenticado', user);
    } else {
        logger.debug('Segurança desabilitada');
    }

    return firstValueFrom(of(true)).finally(() => {
        logger.trace('Finalizado');
        logger.closeContext();
    });
};
