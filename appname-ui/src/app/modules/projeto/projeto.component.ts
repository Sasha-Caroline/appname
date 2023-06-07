import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BaseCrudComponent } from 'src/app/core/components/base-crud.component';
import { FormHeaderComponent } from 'src/app/core/components/form/form-header.component';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { Projeto } from 'src/app/models/projeto.model';
import { SharedModule } from 'src/app/shared/shared.module';

@TraceClassMethods()
@Component({
    selector: 'app-projeto',
    template: `
        <div class="h-full" *ngIf="entity$ | async as entity">
            <form-header
                [tipoOperacao]="operacao"
                [title]="'projeto.titulo.plural' | translate"
                (novo)="novo()"
                (visualizar)="visualizar(entity)"
                (alterar)="alterar(entity)"
                (excluir)="excluir(entity)"></form-header>
            <section class="h-full py-5 px-8">
                <router-outlet></router-outlet>
            </section>
        </div>
    `,
    styles: [':host {display: block; }'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe, ButtonModule, RippleModule, SharedModule, FormHeaderComponent],
})
export class ProjetoComponent extends BaseCrudComponent<Projeto> {
    constructor() {
        super();
    }
}
