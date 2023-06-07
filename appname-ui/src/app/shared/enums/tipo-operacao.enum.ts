import { InjectionToken } from '@angular/core';
import { DataStore } from 'src/app/core/stores/data.store';

export enum TipoOperacao {
    INCLUSAO = 'tipoOperacao.inclusao',
    EXCLUSAO = 'tipoOperacao.exclusao',
    ALTERACAO = 'tipoOperacao.alteracao',
    VISUALIZACAO = 'tipoOperacao.visualizacao',
}

export const TIPO_OPERACAO_STORE = new InjectionToken<DataStore<TipoOperacao>>('tipoOperacaoStore');
