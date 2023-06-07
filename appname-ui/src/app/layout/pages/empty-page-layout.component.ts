import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { FooterComponent } from 'src/app/layout/components/footer/footer.component';

@TraceClassMethods()
@Component({
    templateUrl: './empty-page-layout.component.html',
    standalone: true,
    imports: [RouterOutlet, FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmptyPageLayoutComponent implements OnInit, OnDestroy {
    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
