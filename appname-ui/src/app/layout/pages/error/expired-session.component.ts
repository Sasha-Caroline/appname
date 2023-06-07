import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { ErrorDetailsComponent } from 'src/app/layout/pages/error/components/error-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
@TraceClassMethods()
@Component({
    selector: 'app-expired-session',
    template: `
        <div class="h-full flex justify-content-center align-items-center">
            <div class="w-8 md:w-5">
                <app-error-details image="timeout" [title]="'mensagem.error.sessao-expirada.titulo' | translate" [description]="'mensagem.error.sessao-expirada.mensagem' | translate">
                    <button pButton pRipple class="p-button-lg" (click)="authService.login()">
                        <fa-icon [icon]="['fas', 'right-to-bracket']" size="lg" class="mr-2"></fa-icon>
                        {{ 'botao.login' | translate }}
                    </button>
                </app-error-details>
            </div>
        </div>
    `,
    styles: [':host {display: block; height: 100%; }'],
    standalone: true,
    imports: [RippleModule, ButtonModule, ErrorDetailsComponent, SharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExpiredSessionComponent {
    constructor(protected authService: AuthService) {}
}
