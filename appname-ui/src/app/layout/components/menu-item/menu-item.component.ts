import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { SharedModule } from 'src/app/shared/shared.module';
@TraceClassMethods()
@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styles: [':host {width: 100%}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, RippleModule, RouterLinkActive, RouterLink, NgClass, NgFor, forwardRef(() => MenuItemComponent), SharedModule],
})
export class MenuItemComponent {
    @Input() item: MenuItem;
    @Input() index: number;

    @Input() root: boolean;

    activated: boolean = false;

    itemClick($event: any) {
        this.activated = !this.activated;
    }

    icon(): IconLookup {
        if (!!this.item.icon) {
            const icon = this.item.icon.split(' ');
            return { prefix: icon[0], iconName: icon[1] } as IconLookup;
        }

        return null;
    }
}
