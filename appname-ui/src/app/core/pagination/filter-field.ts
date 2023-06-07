import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';

@TraceClassMethods()
export class FilterField {
    field: string;
    value: string[];

    private constructor(field: string, operator: string, value: string[]) {
        this.field = field;
        this.value = value;
    }

    public static filter(field: string, operator: string, value: string): FilterField {
        return new FilterField(field, operator, [value]);
    }

    public static equal(field: string, value: string): FilterField {
        return new FilterField(field, 'eq', [value]);
    }

    public static notEqual(field: string, value: string): FilterField {
        return new FilterField(field, 'neq', [value]);
    }

    public static greaterThan(field: string, value: string): FilterField {
        return new FilterField(field, 'gt', [value]);
    }

    public static greaterThanEqual(field: string, value: string): FilterField {
        return new FilterField(field, 'gte', [value]);
    }

    public static lessThan(field: string, value: string): FilterField {
        return new FilterField(field, 'lt', [value]);
    }

    public static lessThanEqual(field: string, value: string): FilterField {
        return new FilterField(field, 'lte', [value]);
    }

    public static in(field: string, value: string): FilterField {
        return new FilterField(field, 'in', [value]);
    }

    public static between(field: string, start: string, end: string): FilterField {
        return new FilterField(field, 'btw', [start, end]);
    }
}
