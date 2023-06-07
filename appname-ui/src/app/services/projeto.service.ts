import { Injectable } from '@angular/core';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { CrudService } from 'src/app/core/services/crud.service';
import { EntityStore } from 'src/app/core/stores/entity.store';
import { Projeto } from 'src/app/models/projeto.model';

@TraceClassMethods()
@Injectable()
export class ProjetoService extends CrudService<Projeto> {
    protected override PATH: string = 'projeto';

    constructor(store: EntityStore<Projeto>) {
        super(store);
    }
}
