import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ScrollerOptions } from 'primeng/scroller';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { BaseCrudComponent } from 'src/app/core/components/base-crud.component';
import { ItemActionsComponent } from 'src/app/core/components/form/item-actions.component';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { ScrollPipe } from 'src/app/core/pipes/scroll.pipe';
import { Projeto } from 'src/app/models/projeto.model';
import { SharedModule } from 'src/app/shared/shared.module';
@TraceClassMethods()
@Component({
    selector: 'app-list-projeto',
    templateUrl: 'list-projeto.component.html',
    styleUrls: ['list-projeto.component.scss'],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, NgFor, AsyncPipe, ScrollPipe, SharedModule, TableModule, InputTextModule, ButtonModule, RippleModule, TooltipModule, ChipModule, SkeletonModule, ItemActionsComponent],
})
export class ListProjetoComponent extends BaseCrudComponent<Projeto> {
    options: ScrollerOptions;

    constructor() {
        super();
    }
    
}
