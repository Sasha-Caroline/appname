import { Inject, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { DataStore } from 'src/app/core/stores/data.store';
import { MENU_STATE, MenuState } from 'src/app/layout/states/menu.state';
@TraceClassMethods()
@Injectable({ providedIn: 'root' })
export class MenuService {
    constructor(@Inject(MENU_STATE) private store: DataStore<MenuState>) {}

    get state(): Observable<MenuState> {
        return this.store.value$;
    }

    get stateValue(): MenuState {
        return this.store.value;
    }

    load(model: MenuItem[]): void {
        this.store.value = { model };
    }
}
