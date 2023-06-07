import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { LOGGER, Logger } from 'src/app/core/log/log.service';
import { Entity } from 'src/app/core/models/entity.model';
import { ResultList } from 'src/app/core/pagination/result-list';

@TraceClassMethods()
@Pipe({
    name: 'scroll',
    standalone: true,
})
export class ScrollPipe implements PipeTransform {
    constructor(@Inject(LOGGER) private logger: Logger) {}

    transform<E extends Entity<ID>, ID>(resultSet: ResultList<E>): E[] {
        if (!resultSet || !resultSet.content) return null;

        const e: E[] = new Array<E>(resultSet.totalElements);
        const numberOfElements: number = resultSet.numberOfElements;
        e.splice(resultSet.pageable.offset, numberOfElements, ...resultSet.content);
        this.logger.debug('Entidades: ', e);
        return e;
    }
}
