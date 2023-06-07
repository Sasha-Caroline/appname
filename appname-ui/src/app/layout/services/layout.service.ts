import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { DataStore } from 'src/app/core/stores/data.store';
import { LAYOUT_STATE, LayoutState } from 'src/app/layout/states/layout.state';

enum ResponsiveBreakpoint {
    TABLET = 600,
    TABLET_LANDSCAPE = 900,
    NOTEBOOK = 1200,
    DESKTOP = 1800,
}
@TraceClassMethods()
@Injectable({ providedIn: 'root' })
export class LayoutService {
    constructor(@Inject(LAYOUT_STATE) private store: DataStore<LayoutState>) {}

    get state(): Observable<LayoutState> {
        return this.store.value$;
    }

    get stateValue(): LayoutState {
        return this.store.value;
    }

    resetLayout() {
        const newState = { ...this.stateValue };
        newState.sidebarProfileMenuExpanded = false;

        if (this.isMobile()) {
            newState.sidebarVisible = false;
            newState.sidebarPinned = true;
            newState.sidebarExpanded = true;
        } else if (this.isTablet()) {
            newState.sidebarVisible = false;
            newState.sidebarPinned = false;
            newState.sidebarExpanded = true;
        } else {
            newState.sidebarVisible = true;
            newState.sidebarPinned = true;
            newState.sidebarExpanded = false;
        }

        this.store.value = newState;
    }

    isSidebarActivated(): boolean {
        return this.isMobile() ? this.stateValue.sidebarVisible : this.stateValue.sidebarExpanded;
    }

    isResponsiveBreakpoint(): boolean {
        return this.isMobile() || this.isTablet();
    }

    isMobile(): boolean {
        const windowWidth = window.innerWidth;
        return windowWidth <= ResponsiveBreakpoint.TABLET;
    }

    isTablet(): boolean {
        const windowWidth = window.innerWidth;
        return windowWidth > ResponsiveBreakpoint.TABLET && windowWidth <= ResponsiveBreakpoint.TABLET_LANDSCAPE;
    }

    isTabletLandscape(): boolean {
        const windowWidth = window.innerWidth;
        return windowWidth >= ResponsiveBreakpoint.TABLET_LANDSCAPE && windowWidth <= ResponsiveBreakpoint.NOTEBOOK;
    }

    isNotebook(): boolean {
        const windowWidth = window.innerWidth;
        return windowWidth > ResponsiveBreakpoint.NOTEBOOK && windowWidth <= ResponsiveBreakpoint.DESKTOP;
    }

    isDesktop(): boolean {
        const windowWidth = window.innerWidth;
        return windowWidth > ResponsiveBreakpoint.DESKTOP;
    }

    togglePinSidebar(): void {
        this.store.value = { ...this.stateValue, sidebarPinned: !this.stateValue.sidebarPinned };
    }

    pinSidebar(): void {
        this.store.value = { ...this.stateValue, sidebarPinned: true };
    }
    unpinSidebar(): void {
        this.store.value = { ...this.stateValue, sidebarPinned: false };
    }

    toggleSidebar(): void {
        this.store.value = { ...this.stateValue, sidebarVisible: !this.stateValue.sidebarVisible };
    }

    showSidebar(): void {
        this.store.value = { ...this.stateValue, sidebarVisible: true };
    }
    hideSidebar(): void {
        this.store.value = { ...this.stateValue, sidebarVisible: false };
    }

    toggleExpandSidebar(): void {
        this.store.value = { ...this.stateValue, sidebarExpanded: !this.stateValue.sidebarExpanded };
    }

    expandSidebar(): void {
        if (this.isMobile()) {
            this.store.value = { ...this.stateValue, sidebarVisible: true };
        } else {
            this.store.value = { ...this.stateValue, sidebarExpanded: true };
        }
    }
    collapseSidebar(): void {
        if (this.isMobile()) {
            this.store.value = { ...this.stateValue, sidebarVisible: false };
        } else {
            this.store.value = { ...this.stateValue, sidebarExpanded: false };
        }
    }

    toggleExpandSidebarProfile(): void {
        this.store.value = { ...this.stateValue, sidebarProfileMenuExpanded: !this.stateValue.sidebarProfileMenuExpanded };
    }

    expandSidebarProfile(): void {
        this.store.value = { ...this.stateValue, sidebarProfileMenuExpanded: true };
    }
    collapseSidebarProfile(): void {
        this.store.value = { ...this.stateValue, sidebarProfileMenuExpanded: false };
    }

    toggleRightMenu(): void {
        this.store.value = { ...this.stateValue, rightMenuExpanded: !this.stateValue.rightMenuExpanded };
    }

    expandRightMenu(): void {
        this.store.value = { ...this.stateValue, rightMenuExpanded: true };
    }
    collapseRightMenu(): void {
        this.store.value = { ...this.stateValue, rightMenuExpanded: false };
    }
}
