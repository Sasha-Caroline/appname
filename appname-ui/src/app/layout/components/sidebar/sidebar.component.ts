import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';

import { MenuComponent } from 'src/app/layout/components/menu/menu.component';
import { ProfileMenuComponent } from 'src/app/layout/components/profilemenu/profilemenu.component';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { SharedModule } from 'src/app/shared/shared.module';
@TraceClassMethods()
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, RippleModule, NgClass, MenuComponent, ProfileMenuComponent, AsyncPipe, SharedModule],
})
export class SidebarComponent implements AfterViewInit {
    @Output() enter = new EventEmitter<boolean>();
    @Output() leave = new EventEmitter<boolean>();
    @Output() togglePin = new EventEmitter<boolean>();

    @ViewChild(ProfileMenuComponent) profileMenuComponent!: ProfileMenuComponent;
    @ViewChild('sidebarMenu') sidebarMenu!: ElementRef;
    @ViewChild(MenuComponent) menuComponent!: MenuComponent;

    constructor(public layoutService: LayoutService, public el: ElementRef) {}

    ngAfterViewInit(): void {}

    mouseEnterSidebar(event: MouseEvent) {
        this.layoutService.expandSidebar();
        this.enter.emit(true);
    }

    mouseLeaveSidebar(event: MouseEvent) {
        this.layoutService.collapseSidebar();
        this.leave.emit(true);
    }

    togglePinSidebar(): void {
        this.togglePin.emit(true);
    }
}
