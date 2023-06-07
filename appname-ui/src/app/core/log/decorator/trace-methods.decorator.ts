import { LogService } from 'src/app/core/log/log.service';

export function TraceClassMethods() {
    return (target: Function) => {
        for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
            if (!descriptor) {
                continue;
            }

            const originalMethod = descriptor.value;
            const isMethod = originalMethod instanceof Function;
            if (!isMethod) {
                continue;
            }

            descriptor.value = function (...args: any[]) {
                const logger = LogService.instance;
                logger.context(`[${target.name}][${propertyName}]`);
                logger.trace(`Iniciado`);

                const begin = Date.now();
                const result = originalMethod.apply(this, args);

                const exitLog = () => {
                    logger.trace(`Finalizado em ${Date.now() - begin}ms`).closeContext();
                };

                // Async functions.
                if (typeof result === 'object' && typeof result?.then === 'function') {
                    const promise = result.then(exitLog);

                    if (typeof promise.catch === 'function') {
                        promise.catch((e: any) => e);
                    }
                } else {
                    exitLog();
                }

                return result;
            };

            Object.defineProperty(target.prototype, propertyName, descriptor);
        }
    };
}
