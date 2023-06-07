import { Route } from '@angular/router';
import { ENTITY_SERVICE } from 'src/app/core/services/crud.service';
import { DataStore } from 'src/app/core/stores/data.store';
import { ENTITY_STATE, ENTITY_STORE, EntityStore, RESULTSET_STATE } from 'src/app/core/stores/entity.store';
import { Projeto } from 'src/app/models/projeto.model';
import { ProjetoComponent } from 'src/app/modules/projeto/projeto.component';
import { ProjetoService } from 'src/app/services/projeto.service';
import { TIPO_OPERACAO_STORE, TipoOperacao } from 'src/app/shared/enums/tipo-operacao.enum';

export default [
    {
        path: '',
        component: ProjetoComponent,
        providers: [
            { provide: TIPO_OPERACAO_STORE, useFactory: () => new DataStore<TipoOperacao>() },
            { provide: ENTITY_STORE, useFactory: () => new EntityStore<Projeto>() },
            { provide: ENTITY_STATE, useFactory: (store: any) => store.entity$, deps: [ENTITY_STORE] },
            { provide: RESULTSET_STATE, useFactory: (store: any) => store.resultSet$, deps: [ENTITY_STORE] },
            { provide: ENTITY_SERVICE, useFactory: (store: any) => new ProjetoService(store), deps: [ENTITY_STORE] },
        ],
        children: [
            { path: '', loadComponent: () => import('./list-projeto/list-projeto.component').then(m => m.ListProjetoComponent) },
            { path: 'form', loadComponent: () => import('./form-projeto/form-projeto.component').then(m => m.FormProjetoComponent), data: { tipoOperacao: TipoOperacao.INCLUSAO } },
            { path: 'form/:id', loadComponent: () => import('./form-projeto/form-projeto.component').then(m => m.FormProjetoComponent), data: { tipoOperacao: TipoOperacao.VISUALIZACAO } },
            { path: 'form/:id/editar', loadComponent: () => import('./form-projeto/form-projeto.component').then(m => m.FormProjetoComponent), data: { tipoOperacao: TipoOperacao.ALTERACAO } },
            { path: 'form/:id/excluir', loadComponent: () => import('./form-projeto/form-projeto.component').then(m => m.FormProjetoComponent), data: { tipoOperacao: TipoOperacao.EXCLUSAO } },
        ],
    },
] as Route[];
