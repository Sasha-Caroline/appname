import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [TranslateModule, FontAwesomeModule],
    exports: [TranslateModule, FontAwesomeModule],
})
export class SharedModule {}
