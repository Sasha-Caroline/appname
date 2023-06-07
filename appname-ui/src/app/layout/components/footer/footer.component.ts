import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { SharedModule } from 'src/app/shared/shared.module';
@TraceClassMethods()
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SharedModule],
})
export class FooterComponent {
    constructor(public el: ElementRef) {}
}
