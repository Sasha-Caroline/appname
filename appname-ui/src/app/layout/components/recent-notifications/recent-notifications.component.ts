import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { SharedModule } from 'src/app/shared/shared.module';
@TraceClassMethods()
@Component({
    selector: 'app-recent-notifications',
    templateUrl: './recent-notifications.component.html',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [SharedModule, StyleClassModule, RippleModule, TooltipModule, RouterModule],
})
export class RecentNotificationsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
