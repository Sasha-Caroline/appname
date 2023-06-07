import { DOCUMENT } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { MenuService } from 'src/app/layout/services/menu.service';
import { MENU } from 'src/app/menu';

import { Title } from '@angular/platform-browser';
import { FaConfig } from '@fortawesome/angular-fontawesome';
import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';
import { GlobalMessageComponent } from 'src/app/core/messages/global-message.component';
import defaultLanguage from 'src/assets/i18n/pt.json';
import { AuthService } from './core/auth/auth.service';
@TraceClassMethods()
@Component({
    selector: 'app-root',
    template: `
        <global-message></global-message>
        <router-outlet></router-outlet>
    `,
    imports: [RouterOutlet, LayoutComponent, GlobalMessageComponent],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
    themeSelection = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private primengConfig: PrimeNGConfig,
        private translate: TranslateService,
        private menuService: MenuService,
        private authService: AuthService,
        private titleService: Title,
        private faConfig: FaConfig
    ) {
        this.faConfig.defaultPrefix = 'far';
        this.faConfig.fixedWidth = true;

        let theme = localStorage.getItem('theme');

        if (theme) {
            this.themeSelection = theme === 'light';
            this.changeTheme(this.themeSelection);
        }

        translate.addLangs(['pt']);
        translate.setTranslation('pt', defaultLanguage);
        translate.setDefaultLang('pt');

        const browserLang = translate.getBrowserLang();
        const lang = browserLang.match(/pt/) ? browserLang : 'pt';
        this.changeLang(lang);

        this.authService.configure();
        this.menuService.load(MENU);

        this.titleService.setTitle(`${translate.instant('app.sigla')} | ${translate.instant('app.nome')}`);
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.translate.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
    }

    changeTheme(state: boolean): void {
        let theme = state ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
        themeLink.href = `${theme}-theme.css`;
    }

    changeLang(lang: string): void {
        this.translate.use(lang);
    }
}
