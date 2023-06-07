import { NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'item-actions',
    template: `
        <div class="flex justify-content-end gap-2">
            <button
                *ngIf="showVisualizar"
                pButton
                pRipple
                [disabled]="disabledVisualizar"
                class="p-button-sm p-button-rounded p-button-info p-button-icon-only"
                (click)="onVisualizar()"
                [pTooltip]="'botao.visualizar' | translate"
                tooltipPosition="top">
                <fa-icon [icon]="['fas', 'eye']" size="lg"></fa-icon>
            </button>
            <button
                *ngIf="showAlterar"
                [disabled]="disabledAlterar"
                pButton
                pRipple
                class="p-button-sm p-button-rounded p-button-warning p-button-icon-only"
                (click)="onAlterar()"
                [pTooltip]="'botao.alterar' | translate"
                tooltipPosition="top">
                <fa-icon [icon]="['fas', 'pen-to-square']" size="lg"></fa-icon>
            </button>
            <button
                *ngIf="showExcluir"
                [disabled]="disabledExcluir"
                pButton
                pRipple
                class="p-button-sm p-button-rounded p-button-danger p-button-icon-only"
                (click)="onExcluir()"
                [pTooltip]="'botao.excluir' | translate"
                tooltipPosition="top">
                <fa-icon [icon]="['far', 'trash-can']" size="lg"></fa-icon>
            </button>
            <ng-content></ng-content>
        </div>
    `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SharedModule, TooltipModule, ButtonModule, RippleModule, NgIf],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ItemActionsComponent implements OnInit {
    @Input()
    showVisualizar = true;

    @Input()
    showAlterar = true;

    @Input()
    showExcluir = true;

    @Input()
    disabledVisualizar = false;

    @Input()
    disabledExcluir = false;

    @Input()
    disabledAlterar = false;

    @Output()
    visualizar = new EventEmitter<boolean>();

    @Output()
    alterar = new EventEmitter<boolean>();

    @Output()
    excluir = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    onVisualizar(): void {
        this.visualizar.emit(true);
    }

    onExcluir(): void {
        this.excluir.emit(true);
    }

    onAlterar(): void {
        this.alterar.emit(true);
    }
}
