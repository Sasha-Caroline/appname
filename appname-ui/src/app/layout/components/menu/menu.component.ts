import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { MenuItemComponent } from 'src/app/layout/components/menu-item/menu-item.component';
import { MenuService } from 'src/app/layout/services/menu.service';
@TraceClassMethods()
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styles: [':host {width: 100%}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, MenuItemComponent, AsyncPipe],
})
export class MenuComponent implements OnInit {
    constructor(public menuService: MenuService) {}

    ngOnInit(): void {}

    trackMenuItemById(index: number, menuItem: MenuItem): string {
        return menuItem.id;
    }
}
