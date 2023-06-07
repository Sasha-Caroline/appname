import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { FooterComponent } from 'src/app/layout/components/footer/footer.component';
import { RightMenuComponent } from 'src/app/layout/components/rightmenu/rightmenu.component';
import { SidebarComponent } from 'src/app/layout/components/sidebar/sidebar.component';
import { StatusbarComponent } from 'src/app/layout/components/statusbar/statusbar.component';
import { TopbarComponent } from 'src/app/layout/components/topbar/topbar.component';
import { LayoutService } from 'src/app/layout/services/layout.service';

@TraceClassMethods()
@Component({
    templateUrl: './layout.component.html',
    standalone: true,
    imports: [NgIf, NgClass, AsyncPipe, RouterOutlet, SidebarComponent, RightMenuComponent, TopbarComponent, StatusbarComponent, FooterComponent],
})
export class LayoutComponent implements OnInit, OnDestroy {
    layoutClass: string[] = [];

    openSearchDialog: boolean = false;
    searchFilter: string = '';

    sidebarOutsideClickListener: any;
    rightMenuOutsideClickListener: any;

    @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
    @ViewChild(TopbarComponent) topbarComponent!: TopbarComponent;
    @ViewChild(RightMenuComponent) rightMenuComponent!: RightMenuComponent;

    constructor(public layoutService: LayoutService, public renderer: Renderer2) {
        if (!this.sidebarOutsideClickListener) {
            this.sidebarOutsideClickListener = this.renderer.listen('document', 'click', event => {
                const outsideClicked = !(
                    this.sidebarComponent.el.nativeElement.isSameNode(event.target) ||
                    this.sidebarComponent.el.nativeElement.contains(event.target) ||
                    this.topbarComponent.toggleSidebarButton.nativeElement.isSameNode(event.target) ||
                    this.topbarComponent.toggleSidebarButton.nativeElement.contains(event.target)
                );
                if (outsideClicked) {
                    this.layoutService.collapseSidebar();
                }
            });
        }

        if (!this.rightMenuOutsideClickListener) {
            this.rightMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                const outsideClicked = !(
                    this.rightMenuComponent.el.nativeElement.isSameNode(event.target) ||
                    this.rightMenuComponent.el.nativeElement.contains(event.target) ||
                    this.topbarComponent.profileMenuComponent.el.nativeElement.isSameNode(event.target) ||
                    this.topbarComponent.profileMenuComponent.el.nativeElement.contains(event.target)
                );
                if (outsideClicked) {
                    this.layoutService.collapseRightMenu();
                }
            });
        }
    }

    ngOnInit(): void {
        this.configSideBar();
    }

    @HostListener('window:resize')
    configSideBar() {
        this.layoutService.resetLayout();
    }

    ngOnDestroy(): void {}
}
