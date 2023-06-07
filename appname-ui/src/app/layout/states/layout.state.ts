import { InjectionToken } from '@angular/core';
import { DataStore } from 'src/app/core/stores/data.store';

export interface LayoutState {
    sidebarExpanded: boolean;
    sidebarVisible: boolean;
    sidebarPinned: boolean;
    sidebarProfileMenuExpanded: boolean;

    rightMenuExpanded: boolean;
}

export const LAYOUT_STATE = new InjectionToken<DataStore<LayoutState>>('LayoutState', { providedIn: 'root', factory: () => new DataStore<LayoutState>() });
