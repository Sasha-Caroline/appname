import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { NamePipe } from 'src/app/core/pipes/name.pipe';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../../../core/auth/auth.service';
@TraceClassMethods()
@Component({
    selector: 'app-profilemenu',
    templateUrl: './profilemenu.component.html',
    styles: [':host {width: 100%}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, AsyncPipe, TitleCasePipe, NamePipe, RippleModule, SharedModule],
})
export class ProfileMenuComponent {
    @Output() onMenuClick = new EventEmitter<any>();

    constructor(public layoutService: LayoutService, protected authService: AuthService, public el: ElementRef) {}

    click(event: any): void {
        this.onMenuClick.emit(event);
    }
}
