import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
@TraceClassMethods()
@Component({
    selector: 'app-statusbar',
    templateUrl: './statusbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RippleModule],
})
export class StatusbarComponent {
    constructor(public el: ElementRef) {}
}
