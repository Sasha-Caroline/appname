import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, firstValueFrom, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

export const roleGuard: CanMatchFn = (route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    const logger: Logger = inject(LOGGER);
    logger.context('[RoleGuard]');
    logger.trace('Iniciado');

    if (environment.securityEnabled) {
        const router: Router = inject(Router);
        const authService = inject(AuthService);

        const user: User = authService.loadUserInfo();

        if (!user) {
            logger.debug('Usuário não autenticado', user);
            void router.navigateByUrl('/pages/unauthorized');
            return false;
        }
        logger.debug(`Verificando autorização de acesso à rota ${route.path}`, user);
        const data = route.data;
        const routeRoles: string[] = data?.['roles'] ? (data['roles'] as string[]) : null;

        if (!!routeRoles) {
            const userRoles: string[] = user?.roles;
            logger.debug(`Rota ${route.path} possui perfis de acesso definidos`, routeRoles);
            if (!!userRoles && routeRoles.some(role => userRoles.includes(role))) {
                logger.success(`Acesso à rota ${route.path} concedido`, userRoles);
                return true;
            }

            logger.error(`Acesso à rota ${route.path} negado`, user, userRoles);

            void router.navigateByUrl('/pages/forbidden');
            return false;
        }

        logger.warn(`Rota ${route.path} sem perfis de acesso definidos`);
    } else {
        logger.debug('Segurança desabilitada');
    }
    return firstValueFrom(of(true)).finally(() => logger.trace('[RoleGuard] Finalizado').closeContext());
};
