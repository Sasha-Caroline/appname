import { Order } from 'src/app/core/enums/order.enum';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';

@TraceClassMethods()
export class SortField {
    field: string;
    order: Order;

    private constructor(field: string, order: number | Order) {
        this.field = field;

        if (typeof order === 'number') {
            this.order = order == 1 ? Order.ASC : Order.DESC;
        } else {
            this.order = order;
        }
    }

    public static asc(field: string): SortField {
        return new SortField(field, Order.ASC);
    }

    public static desc(field: string): SortField {
        return new SortField(field, Order.DESC);
    }

    public static sort(field: string, order: number | Order): SortField {
        return new SortField(field, order);
    }

    public toString(): string {
        return this.field + ',' + this.order;
    }
}
