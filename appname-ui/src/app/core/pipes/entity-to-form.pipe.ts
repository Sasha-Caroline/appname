import { Inject, Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { Entity } from 'src/app/core/models/entity.model';

@TraceClassMethods()
@Pipe({
    name: 'entityToForm',
    standalone: true,
})
export class EntityToForm implements PipeTransform {
    constructor(@Inject(LOGGER) private logger: Logger) {}

    transform<E extends Entity<ID>, ID>(entity: E, form: FormGroup): E {
        if (!!entity && !!form) {
            form.patchValue(entity);
        }

        return entity;
    }
}
