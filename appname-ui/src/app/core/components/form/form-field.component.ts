import { NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { FieldDirective } from 'src/app/core/components/form/field.directive';

@Component({
    selector: 'form-field',
    template: `
        <label htmlFor="id" class="font-semibold">{{ label }}</label>
        <ng-content></ng-content>
        <ng-container *ngIf="!showField">
            <ng-content select="[visualizacao]"></ng-content>
        </ng-container>
    `,
    styles: [':host {display: block; margin-bottom: 1.75rem;}'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf],
})
export class FormFieldComponent implements AfterViewInit {
    @Input()
    id: string;

    @Input()
    label: string;

    @Input()
    showField: boolean = true;

    @ContentChild(FieldDirective) field: FieldDirective;

    ngAfterViewInit(): void {
        if (!this.showField) {
            this.field.hide();
        }
    }
}
