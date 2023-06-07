import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { TagTipoOperacaoComponent } from 'src/app/shared/components/tags/tag-tipo-operacao.component';
import { TipoOperacao } from 'src/app/shared/enums/tipo-operacao.enum';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'form-header',
    template: `
        <section class="h-8rem flex justify-content-between align-items-center surface-section surface-border border-bottom-1 px-4 pt-4 pb-2">
            <div>
                <div class="flex align-items-center gap-4">
                    <h1 class="text-3xl lg:text-4xl font-extrabold m-0">{{ title }}</h1>
                    <tag-tipo-operacao [tipoOperacao]="tipo"></tag-tipo-operacao>
                </div>
                <div class="text-bluegray-400 font-medium mt-2">
                    <fa-icon [icon]="['fas', 'database']" size="lg"></fa-icon>
                    {{ 'mensagem.registros.ativos' | translate : { total: '100' } }}
                </div>
            </div>
            <nav class="flex align-content-center gap-2">
                <button *ngIf="showNovo" [disabled]="disabledNovo" pButton pRipple class="p-button-success" (click)="onNovo()" [pTooltip]="'botao.novo' | translate" tooltipPosition="top">
                    <fa-icon [icon]="['fas', 'file-circle-plus']" size="lg" class="mr-2"></fa-icon>
                    {{ 'botao.novo' | translate }}
                </button>
                <button
                    *ngIf="showVisualizar"
                    [disabled]="disabledVisualizar"
                    pButton
                    pRipple
                    class="p-button-info"
                    (click)="onVisualizar()"
                    [pTooltip]="'botao.visualizar' | translate"
                    tooltipPosition="top">
                    <fa-icon [icon]="['fas', 'eye']" size="lg" class="mr-2"></fa-icon>
                    {{ 'botao.visualizar' | translate }}
                </button>
                <button *ngIf="showAlterar" [disabled]="disabledAlterar" pButton pRipple class="p-button-warning" (click)="onAlterar()" [pTooltip]="'botao.alterar' | translate" tooltipPosition="top">
                    <fa-icon [icon]="['fas', 'pen-to-square']" size="lg" class="mr-2"></fa-icon>
                    {{ 'botao.alterar' | translate }}
                </button>
                <button *ngIf="showExcluir" [disabled]="disabledExcluir" pButton pRipple class="p-button-danger" (click)="onExcluir()" [pTooltip]="'botao.excluir' | translate" tooltipPosition="top">
                    <fa-icon [icon]="['fas', 'trash-can']" size="lg" class="mr-2"></fa-icon>
                    {{ 'botao.excluir' | translate }}
                </button>
                <ng-content></ng-content>
            </nav>
        </section>
    `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, ButtonModule, RippleModule, TooltipModule, SharedModule, TagTipoOperacaoComponent],
})
export class FormHeaderComponent implements OnInit {
    protected tipo: TipoOperacao;

    @Input()
    title = '';

    @Input()
    showVisualizar = true;

    @Input()
    showExcluir = true;

    @Input()
    showNovo = true;

    @Input()
    showAlterar = true;

    @Input()
    disabledVisualizar = false;

    @Input()
    disabledExcluir = false;

    @Input()
    disabledNovo = false;

    @Input()
    disabledAlterar = false;

    @Output()
    visualizar = new EventEmitter<boolean>();

    @Output()
    alterar = new EventEmitter<boolean>();

    @Output()
    excluir = new EventEmitter<boolean>();

    @Output()
    novo = new EventEmitter<boolean>();

    @Input()
    set tipoOperacao(tipoOperacao: TipoOperacao) {
        this.tipo = tipoOperacao;
        this.showAlterar = tipoOperacao !== TipoOperacao.ALTERACAO && tipoOperacao !== TipoOperacao.INCLUSAO && !!tipoOperacao;
        this.showVisualizar = tipoOperacao !== TipoOperacao.VISUALIZACAO && tipoOperacao !== TipoOperacao.INCLUSAO && !!tipoOperacao;
        this.showNovo = tipoOperacao !== TipoOperacao.INCLUSAO;
        this.showExcluir = tipoOperacao !== TipoOperacao.EXCLUSAO && tipoOperacao !== TipoOperacao.INCLUSAO && !!tipoOperacao;
    }

    constructor() {}

    ngOnInit() {}

    onVisualizar(): void {
        this.visualizar.emit(true);
    }

    onExcluir(): void {
        this.excluir.emit(true);
    }

    onAlterar(): void {
        this.alterar.emit(true);
    }

    onNovo(): void {
        this.novo.emit(true);
    }
}
