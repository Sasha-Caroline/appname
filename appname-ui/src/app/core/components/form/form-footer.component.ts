import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TipoOperacao } from 'src/app/shared/enums/tipo-operacao.enum';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'form-footer',
    template: `
        <footer class="mt-4 surface-50 p-5 border-bluegray-200 border-top-1">
            <div class="flex justify-content-between align-items-center flex-wrap">
                <div class="flex justify-content-start align-items-center flex-wrap"><ng-content select="[left]"></ng-content></div>
                <div class="flex justify-content-end align-items-center flex-wrap gap-2">
                    <div *ngIf="showConfirmarExclusao">
                        <span class="mr-4 font-medium">{{ 'mensagem.confirmacao.exclusao' | translate }}</span>
                    </div>
                    <button *ngIf="showConfirmarExclusao" pButton pRipple (click)="onConfirmarExclusao()" class="p-button-primary">
                        <fa-icon [icon]="['fas', 'check']" size="lg" class="mr-2"></fa-icon>
                        {{ 'botao.confirmar' | translate }}
                    </button>
                    <ng-content></ng-content>
                    <button *ngIf="showSalvar" pButton pRipple (click)="onSalvar()" class="p-button-primary">
                        <fa-icon [icon]="['fas', 'floppy-disk']" size="lg" class="mr-2"></fa-icon>
                        {{ 'botao.salvar' | translate }}
                    </button>
                    <button pButton pRipple *ngIf="showCancelar" type="button" (click)="onCancelar()" class="p-button-outlined p-button-primary ">
                        <fa-icon [icon]="['fas', 'xmark']" size="lg" class="mr-2"></fa-icon>
                        {{ 'botao.cancelar' | translate }}
                    </button>

                    <button pButton pRipple *ngIf="showFechar" type="button" (click)="onFechar()" class="p-button-outlined p-button-primary">
                        <fa-icon [icon]="['fas', 'xmark']" size="lg" class="mr-2"></fa-icon>
                        {{ 'botao.fechar' | translate }}
                    </button>
                    <button pButton pRipple *ngIf="showVoltar" type="button" (click)="onVoltar()" class="p-button-outlined p-button-primary">
                        <fa-icon [icon]="['fas', 'angle-left']" size="lg" class="mr-2"></fa-icon>
                        {{ 'botao.voltar' | translate }}
                    </button>
                </div>
            </div>
        </footer>
    `,
    standalone: true,
    imports: [NgIf, SharedModule, ButtonModule, RippleModule],
})
export class FormFooterComponent {
    @Input()
    set tipoOperacao(tipoOperacao: TipoOperacao) {
        this.showSalvar = tipoOperacao === TipoOperacao.ALTERACAO || tipoOperacao === TipoOperacao.INCLUSAO;
        this.showConfirmarExclusao = tipoOperacao === TipoOperacao.EXCLUSAO;
        this.showCancelar = tipoOperacao !== TipoOperacao.VISUALIZACAO;
        this.showVoltar = tipoOperacao === TipoOperacao.VISUALIZACAO;
        this.showFechar = false;
    }

    @Input()
    showCancelar = true;

    @Input()
    showVoltar = false;

    @Input()
    showFechar = false;

    @Input()
    showSalvar = true;

    @Input()
    showConfirmarExclusao = false;

    @Output()
    cancelar = new EventEmitter<boolean>();

    @Output()
    voltar = new EventEmitter<boolean>();

    @Output()
    confirmarExclusao = new EventEmitter<boolean>();

    @Output()
    salvar = new EventEmitter<boolean>();

    @Output()
    fechar = new EventEmitter<boolean>();

    constructor() {}

    onCancelar(): void {
        this.cancelar.emit(true);
    }

    onVoltar(): void {
        this.voltar.emit(true);
    }

    onFechar(): void {
        this.fechar.emit(true);
    }

    onSalvar(): void {
        this.salvar.emit(true);
    }

    onConfirmarExclusao(): void {
        this.confirmarExclusao.emit(true);
    }
}
