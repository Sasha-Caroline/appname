import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'form-section',
    standalone: true,
    template: `
        <section class="pb-5  ">
            <header class="mb-4 surface-50 p-5 border-bluegray-200 border-y-1" *ngIf="title || description">
                <h2 class="text-2xl font-bold m-0">{{ title }}</h2>
                <span class="text-color-secondary ">{{ description }}</span>
            </header>
            <div class="formgrid grid px-5 ">
                <ng-content></ng-content>
            </div>
        </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf],
})
export class FormSectionComponent {
    @Input()
    title: string = '';

    @Input()
    description: string = '';

    constructor() {}
}
