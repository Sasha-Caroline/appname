import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { ProfileMenuComponent } from 'src/app/layout/components/profilemenu/profilemenu.component';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { SharedModule } from 'src/app/shared/shared.module';
@TraceClassMethods()
@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RippleModule, ProfileMenuComponent, TooltipModule, SharedModule],
})
export class TopbarComponent implements AfterViewInit {
    @ViewChild(ProfileMenuComponent) profileMenuComponent!: ProfileMenuComponent;
    @ViewChild('topbarActions') topbarActions!: ElementRef;
    @ViewChild('toggleSidebarButton') toggleSidebarButton: ElementRef;

    constructor(public layoutService: LayoutService, public el: ElementRef) {}

    ngAfterViewInit(): void {}
}
