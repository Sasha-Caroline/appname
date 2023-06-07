import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[field]', standalone: true })
export class FieldDirective {
    constructor(private el: ElementRef) {}

    hide(): void {
        this.el.nativeElement.style.display = 'none';
    }
}
