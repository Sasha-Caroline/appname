import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, ErrorHandler, LOCALE_ID, forwardRef, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ROUTES } from 'src/app/routes';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authInterceptor } from 'src/app/core/auth/auth.interceptor';
import { AUTH_STORE, AUTH_USER } from 'src/app/core/auth/auth.service';
import { GlobalErrorHandler } from 'src/app/core/error/global-error-handler.service';
import { User } from 'src/app/core/models/user.model';
import { LoadingUIInterceptor } from 'src/app/core/progress/loading-ui.interceptor';
import { DataStore } from 'src/app/core/stores/data.store';
import { httpLoaderFactory } from 'src/app/core/translate/translate-loader-factory';
import { ServidorService } from 'src/app/services/servidor.service';
import { LOGGER, LogService } from './app/core/log/log.service';

registerLocaleData(ptBr);

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideOAuthClient(),
        importProvidersFrom(
            BrowserModule,
            BrowserAnimationsModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps: [HttpClient],
                },
            })
        ),
        ServidorService,
        MessageService,
        ConfirmationService,
        {
            provide: APP_INITIALIZER,
            useFactory: (library: FaIconLibrary) => {
                library.addIconPacks(fas);
                library.addIconPacks(far);
            },
            deps: [FaIconLibrary],
        },
        {
            provide: AUTH_USER,
            useFactory: (store: DataStore<User>) => {
                return store.value$;
            },
            deps: [AUTH_STORE],
        },
        { provide: LOGGER, useExisting: forwardRef(() => LogService) },

        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingUIInterceptor, multi: true },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideRouter(
            ROUTES
            // , withDebugTracing()
        ),
    ],
}).catch(e => console.error(e));
