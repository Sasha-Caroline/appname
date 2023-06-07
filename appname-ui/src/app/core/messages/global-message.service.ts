import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
@TraceClassMethods()
@Injectable({
    providedIn: 'root',
})
export class GlobalMessageService {
    private readonly tempoDeExibicao = 5000;

    constructor(private messageService: MessageService) {}

    sucesso(message: string, { key = 'main', detail = '', sticky = false, life = this.tempoDeExibicao } = {}): void {
        this.messageService.add({ key, life, sticky, severity: 'success', summary: message, detail });
    }

    alerta(message: string, { key = 'main', detail = '', sticky = false, life = this.tempoDeExibicao } = {}): void {
        this.messageService.add({ key, life, sticky, severity: 'warn', summary: message, detail });
    }

    erro(message: string, { key = 'main', detail = '', sticky = false, life = this.tempoDeExibicao } = {}): void {
        this.messageService.add({ key, life, sticky, severity: 'error', summary: message, detail });
    }

    info(message: string, { key = 'main', detail = '', sticky = false, life = this.tempoDeExibicao } = {}): void {
        this.messageService.add({ key, life, sticky, severity: 'info', summary: message, detail });
    }

    apagar(key = 'main'): void {
        this.messageService.clear(key);
    }
}
