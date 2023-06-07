import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TipoOperacao } from 'src/app/shared/enums/tipo-operacao.enum';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'tag-tipo-operacao',
    template: `
        <div *ngIf="tipoOperacao === tipoOperacaoEnum.INCLUSAO" class="p-1 font-medium text-green-800 border-round border-1 border-green-600 bg-green-200">
            <fa-icon [icon]="['fas', 'file-circle-plus']"></fa-icon>
            {{ 'botao.novo' | translate }}
        </div>
        <div *ngIf="tipoOperacao === tipoOperacaoEnum.ALTERACAO" class="p-1 font-medium text-yellow-800 border-round border-1 border-yellow-600 bg-yellow-200">
            <fa-icon [icon]="['fas', 'pen-to-square']"></fa-icon>
            {{ 'botao.alterar' | translate }}
        </div>
        <div *ngIf="tipoOperacao === tipoOperacaoEnum.EXCLUSAO" class="p-1 font-medium text-red-800 border-round border-1 border-red-600 bg-red-200">
            <fa-icon [icon]="['far', 'trash-can']"></fa-icon>
            {{ 'botao.excluir' | translate }}
        </div>
        <div *ngIf="tipoOperacao === tipoOperacaoEnum.VISUALIZACAO" class="p-1 font-medium text-blue-800 border-round border-1 border-blue-600 bg-blue-200">
            <fa-icon [icon]="['fas', 'eye']"></fa-icon>
            {{ 'botao.visualizar' | translate }}
        </div>
    `,
    standalone: true,
    imports: [NgIf, SharedModule],
})
export class TagTipoOperacaoComponent {
    public tipoOperacaoEnum: typeof TipoOperacao = TipoOperacao;

    @Input()
    tipoOperacao: TipoOperacao;
}
