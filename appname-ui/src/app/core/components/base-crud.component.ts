import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ResultList } from 'server/util/result-list';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { GlobalMessageService } from 'src/app/core/messages/global-message.service';
import { Entity } from 'src/app/core/models/entity.model';
import { FilterField } from 'src/app/core/pagination/filter-field';
import { SortField } from 'src/app/core/pagination/sort-field';
import { CrudService, ENTITY_SERVICE } from 'src/app/core/services/crud.service';
import { DataStore } from 'src/app/core/stores/data.store';
import { ENTITY_STATE, RESULTSET_STATE } from 'src/app/core/stores/entity.store';
import { TIPO_OPERACAO_STORE, TipoOperacao } from 'src/app/shared/enums/tipo-operacao.enum';

@TraceClassMethods()
@Directive()
export abstract class BaseCrudComponent<E extends Entity<any>> implements OnInit, OnDestroy {
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected router: Router = inject(Router);

    protected translate: TranslateService = inject(TranslateService);
    protected logger: Logger = inject(LOGGER);
    protected messageService: GlobalMessageService = inject(GlobalMessageService);

    protected tipoOperacaoStore: DataStore<TipoOperacao> = inject(TIPO_OPERACAO_STORE);

    protected service: CrudService<E> = inject<CrudService<E>>(ENTITY_SERVICE);
    protected entity$: Observable<E> = inject<Observable<E>>(ENTITY_STATE);
    protected resultSet$: Observable<ResultList<E>> = inject<Observable<ResultList<E>>>(RESULTSET_STATE);

    protected tipoOperacaoHandler: { [operacao: string]: () => void } = {};

    constructor() {
        this.initTipoOperacoHandler();
        this.tipoOperacaoStore.value = this.route.snapshot.data['tipoOperacao'];
        this.logger.debug(`Tipo de Operação: ${!!this.operacao ? this.translate.instant(this.operacao) : 'Pesquisa'}`);

        if (!this.isPesquisa()) {
            this.tipoOperacaoHandler[this.operacao]();
        } else {
            this.listarEntidades();
        }
    }

    protected initTipoOperacoHandler(): void {
        this.tipoOperacaoHandler[TipoOperacao.INCLUSAO] = (): void => this.service.new();
        this.tipoOperacaoHandler[TipoOperacao.EXCLUSAO] = (): void => this.carregarEntidade();
        this.tipoOperacaoHandler[TipoOperacao.ALTERACAO] = (): void => this.carregarEntidade();
        this.tipoOperacaoHandler[TipoOperacao.VISUALIZACAO] = (): void => this.carregarEntidade();
    }

    get operacao(): TipoOperacao {
        return this.tipoOperacaoStore.value;
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {}

    limpar(): void {
        this.service.new();
    }

    protected showErroMessage(message: string, err?: any): void {
        err?.error?.message ? this.messageService.erro(err.error.message) : this.messageService.erro(message);
    }

    /**
     * Controle de Navegação
     */

    novo(router?: Router): void {
        if (!router) router = this.router;
        router.navigate(['form'], { relativeTo: !this.operacao ? this.route : this.route.parent });
    }

    pesquisar(router?: Router): void {
        if (!router) router = this.router;
        router.navigate(['.'], { relativeTo: !this.operacao ? this.route : this.route.parent });
    }

    alterar(entity: E, router?: Router): void {
        if (!router) router = this.router;
        router.navigate(['form', entity.id, 'editar'], { relativeTo: !this.operacao ? this.route : this.route.parent });
    }

    visualizar(entity: E, router?: Router): void {
        if (!router) router = this.router;
        router.navigate(['form', entity.id], { relativeTo: !this.operacao ? this.route : this.route.parent });
    }

    excluir(entity: E, router?: Router): void {
        if (!router) router = this.router;
        router.navigate(['form', entity.id, 'excluir'], { relativeTo: !this.operacao ? this.route : this.route.parent });
    }

    voltar(router?: Router): void {
        if (!router) router = this.router;
        router.navigate(['.'], { relativeTo: this.route.parent });
        this.limpar();
    }

    /**
     * Verificação do Tipo de Operação Atual
     */

    isInclusao(tipoOperacao?: TipoOperacao): boolean {
        return tipoOperacao ? TipoOperacao.INCLUSAO === tipoOperacao : TipoOperacao.INCLUSAO === this.operacao;
    }

    isAlteracao(tipoOperacao?: TipoOperacao): boolean {
        return tipoOperacao ? TipoOperacao.ALTERACAO === tipoOperacao : TipoOperacao.ALTERACAO === this.operacao;
    }

    isVisualizacao(tipoOperacao?: TipoOperacao): boolean {
        return tipoOperacao ? TipoOperacao.VISUALIZACAO === tipoOperacao : TipoOperacao.VISUALIZACAO === this.operacao;
    }

    isExclusao(tipoOperacao?: TipoOperacao): boolean {
        return tipoOperacao ? TipoOperacao.EXCLUSAO === tipoOperacao : TipoOperacao.EXCLUSAO === this.operacao;
    }

    isPesquisa(tipoOperacao?: TipoOperacao): boolean {
        return !tipoOperacao && !this.operacao;
    }

    /**
     * Método que especifica a regra para exibir os controles no formulário (Modo edição)
     */

    get showFields(): boolean {
        return this.isAlteracao() || this.isInclusao();
    }

    /**
     * Método utilizado para exportar os dados do formulário para a entidade
     */
    protected formToModel(form: FormGroup): E {
        return form.getRawValue() as E;
    }

    /**
     * Método utilizado para exportar os dados da entidade para o formulário
     */
    protected modelToForm(entity: E): void {}

    /**
     * Ações do formulário
     */

    salvar(form?: FormGroup): void {
        if (!form) return;

        if (form.valid) {
            const entity: E = this.formToModel(form);
            this.logger.debug('Entidade', entity);
            this.service.save(
                entity,
                (e: E) => {
                    this.messageService.sucesso(this.translate.instant('mensagem.salvar.sucesso'));
                    this.visualizar(e, this.router);
                }
                // (err: any) => {
                //     this.showErroMessage(this.translate.instant('mensagem.salvar.erro'), err);
                // }
            );
        } else {
            this.messageService.alerta('Existem pendências no formulário. Favor, saná-las antes de continuar.');
        }
    }

    confirmarExclusao(entidade: E): void {
        if (!entidade) {
            this.messageService.erro(this.translate.instant('mensagem.operacao.invalida'));
        } else {
            this.service.delete(
                entidade,
                (e: E) => {
                    this.messageService.sucesso(this.translate.instant('mensagem.excluir.sucesso'));
                    this.voltar(this.router);
                }
                // (err: any) => {
                //     this.showErroMessage(this.translate.instant('mensagem.excluir.erro'), err);
                // }
            );
        }
    }

    carregarEntidade(): void {
        const id: string = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigateByUrl('/pages/bad-request');
        }

        this.service.load(
            id,
            (entity: E) => {
                this.modelToForm(entity);
            }
            // (err: any) => {
            //     this.showErroMessage(this.translate.instant('mensagem.carregarEntidade.erro'), err);
            // }
        );
    }

    listarEntidades(filtro?: FilterField[], offset?: number, limit?: number, sort?: SortField[]): void {
        this.service.list(
            filtro,
            offset,
            limit,
            sort,
            (data: ResultList<E>) => {}
            // (err: any) => {
            //     this.showErroMessage(this.translate.instant('mensagem.listar.erro'), err);
            // }
        );
    }
}
