import { TranslateService } from '@ngx-translate/core';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';

@TraceClassMethods()
export class TranslateUtils {
    public static convertEnum(enumType: any, translate?: TranslateService): { label: string; value: string }[] {
        const itens: {
            label: string;
            value: string;
        }[] = [];

        const keys = Object.keys(enumType);

        keys?.forEach(key => {
            let label: string;

            if (translate) {
                label = translate.instant(enumType[key]);
            }

            if (!label) {
                label = enumType[key];
            }

            itens.push({ label: label, value: key });
        });

        return itens;
    }
}
