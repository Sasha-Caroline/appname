import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';

@TraceClassMethods()
@Component({
    selector: 'global-message',
    template: `
        <p-toast
            key="main"
            [baseZIndex]="999999999"
            [preventOpenDuplicates]="true"
            [breakpoints]="{
                '3840px': { width: '35%', top: '1rem' },
                '1800px': { width: '40%', top: '1rem' },
                '1200px': { width: '50%', top: '1rem' },
                '900px': { width: '75%', top: '1rem' },
                '600px': { width: '100%', top: '1rem' }
            }"
            [showTransitionOptions]="'400ms'"
            [hideTransitionOptions]="'400ms'"
            [showTransformOptions]="'translateY(-200%)'"
            [hideTransformOptions]="'translateY(-200%)'"
            position="top-center"
            contentStyleClass="text-center"></p-toast>
    `,
    standalone: true,
    imports: [ToastModule],
})
export class GlobalMessageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
