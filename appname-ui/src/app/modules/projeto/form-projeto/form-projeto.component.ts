import { AsyncPipe, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { BaseCrudComponent } from 'src/app/core/components/base-crud.component';
import { FieldDirective } from 'src/app/core/components/form/field.directive';
import { FormFieldComponent } from 'src/app/core/components/form/form-field.component';
import { FormFooterComponent } from 'src/app/core/components/form/form-footer.component';
import { FormSectionComponent } from 'src/app/core/components/form/form-section.component';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { EntityToForm } from 'src/app/core/pipes/entity-to-form.pipe';
import { Projeto } from 'src/app/models/projeto.model';
import { SharedModule } from 'src/app/shared/shared.module';

@TraceClassMethods()
@Component({
    selector: 'app-form-projeto',
    templateUrl: 'form-projeto.component.html',
    styleUrls: ['form-projeto.component.scss'],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, AsyncPipe, ReactiveFormsModule, InputTextModule, TabViewModule, EntityToForm, FormSectionComponent, FormFieldComponent, FormFooterComponent, FieldDirective, SharedModule],
})
export class FormProjetoComponent extends BaseCrudComponent<Projeto> implements OnInit {
    protected form: FormGroup = this.fb.group({
        id: [{ value: null, disabled: true }],
        titulo: [{ value: '', disabled: false }, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)] }],
    });

    constructor(private fb: FormBuilder) {
        super();
    }

    protected override modelToForm(entity: Projeto): void {
        this.form.patchValue(entity);
    }
}
