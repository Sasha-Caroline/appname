import { Injectable } from '@angular/core';
import { Observable, catchError, take } from 'rxjs';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { QueryService } from 'src/app/core/services/query.service';
import { Servidor } from 'src/app/models/servidor.model';

@TraceClassMethods()
@Injectable()
export class ServidorService extends QueryService<Servidor> {
    protected override PATH: string = 'servidores';

    buscarFoto(id: string, thumb = false): Observable<string> {
        return this.http.get<string>(`${this.getUrl()}/${id}/foto?thumb=${String(thumb)}`, { responseType: 'text' }).pipe(
            catchError((err, caught) => {
                if (err.status !== 404) {
                    throw JSON.parse(err.error);
                }
                return '';
            }),
            take(1)
        );
    }
}
