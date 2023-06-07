import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { ErrorDetailsComponent } from 'src/app/layout/pages/error/components/error-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
@TraceClassMethods()
@Component({
    selector: 'app-unexpected-error',
    template: `
        <div class="h-full flex justify-content-center align-items-center">
            <div class="w-8 md:w-5">
                <app-error-details image="unexpected" [title]="'mensagem.error.0.titulo' | translate" [description]="'mensagem.error.0.mensagem' | translate"></app-error-details>
            </div>
        </div>
    `,
    styles: [':host {display: block; height: 100%; }'],
    standalone: true,
    imports: [RippleModule, ButtonModule, ErrorDetailsComponent, SharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UnexpectedErrorComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
