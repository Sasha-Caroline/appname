import { Injectable, InjectionToken, inject } from '@angular/core';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';

import { Observable, filter, tap } from 'rxjs';
import { authConfig } from 'src/app/core/auth/auth.config';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { User } from 'src/app/core/models/user.model';
import { DataStore } from 'src/app/core/stores/data.store';
import { ServidorService } from 'src/app/services/servidor.service';

export const AUTH_STORE = new InjectionToken<DataStore<User>>('AuthStore', { providedIn: 'root', factory: () => new DataStore<User>() });
export const AUTH_USER = new InjectionToken<Observable<User>>('AuthUser');

@TraceClassMethods()
@Injectable({ providedIn: 'root' })
export class AuthService {
    private store: DataStore<User> = inject(AUTH_STORE);
    private logger: Logger = inject(LOGGER);

    constructor(private oauthService: OAuthService, private servidorService: ServidorService) {
        this.subscribeEvents(this.oauthService.events);
    }

    get user$(): Observable<User> {
        return this.store.value$;
    }

    get user(): User {
        return this.store.value;
    }

    private subscribeEvents(events: Observable<OAuthEvent>): void {
        events.pipe(filter(e => e.type === 'token_received')).subscribe({ next: () => this.onTokenReceived() });
        events.pipe(filter(e => e.type === 'token_refreshed')).subscribe({ next: () => this.onTokenRefreshed(this.oauthService) });
        events.pipe(filter(e => e.type === 'token_refresh_error')).subscribe({ next: () => this.onTokenRefreshError() });
        events.pipe(filter(e => e.type === 'logout')).subscribe({ next: () => this.onLogout() });
        events.pipe(filter(e => e.type === 'discovery_document_loaded')).subscribe({ next: () => this.onDiscoveryDocumentLoaded() });
    }

    async configure(): Promise<void> {
        this.oauthService.configure(authConfig);
        this.oauthService.setupAutomaticSilentRefresh();

        const hasReceivedTokens: boolean = await this.oauthService.loadDiscoveryDocumentAndTryLogin();
        if (hasReceivedTokens && this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
            this.updateUserState();
        }
    }

    login() {
        this.oauthService.initCodeFlow();
    }

    logout() {
        this.oauthService.revokeTokenAndLogout();
    }

    userIsAuthenticated(): boolean {
        return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
    }

    loadUserInfo(): User {
        if (this.userIsAuthenticated()) {
            const claims = this.oauthService.getIdentityClaims();
            this.logger.debug('Carregando dados do usuário autenticado', claims);
            const user: User = { name: claims['name'], email: claims['email'], login: claims['preferred_username'] } as User;
            user.roles = claims['resource_access']?.[authConfig.clientId]?.['roles'];
            this.logger.info('Usuário autenticado', user);
            this.logger.userInfo(user);

            return user;
        }

        return null;
    }

    updateUserState(): void {
        const user = this.loadUserInfo();

        const currentUser = this.store.value;

        if (!!user && (user.login !== currentUser?.login || JSON.stringify(user.roles) !== JSON.stringify(currentUser?.roles))) {
            this.logger.debug('Atualizando o estado do usuário autenticado', user);
            this.store.value = user;

            this.servidorService
                .buscarFoto(user.login)
                .pipe(
                    tap(photo => {
                        user.photo = photo;
                        this.store.value = user;
                    })
                )
                .subscribe();
        }
    }

    private onTokenReceived(): void {
        this.logger.debug('Token de Autenticação Recebido');

        this.updateUserState();
    }

    private onTokenRefreshed(oauthService: OAuthService): void {
        this.logger.debug('Token de Autenticação Atualizado');
        console.log('REFRESHED');
    }

    private onTokenRefreshError(): void {
        this.logger.error('Falha ao atualizar o token de autenticação');
        this.login();
    }

    private onLogout(): void {
        this.logger.debug('Logout realizado');
        this.store.value = {} as User;
    }

    private onDiscoveryDocumentLoaded(): void {}

    private onUserProfileLoaded(): void {}
}
