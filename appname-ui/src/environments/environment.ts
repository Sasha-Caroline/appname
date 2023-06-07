export const environment = {
    production: window['env']['PRODUCTION'] || false,
    securityEnabled: true,
    versao: window['env']['IMAGE_VERSION'] !== '${IMAGE_VERSION}' ?  window['env']['IMAGE_VERSION'] :  '' ,
    ambiente: window['env']['AMBIENTE'] !== '${AMBIENTE}' ? window['env']['AMBIENTE'] : '',
    apiUrl: window['env']['API_URL'] !== '${API_URL}' ? window['env']['API_URL'] : 'http://localhost:8080/api',
    defaultTimezone: window['env']['DEFAULT_TIMEZONE'] !== '${DEFAULT_TIMEZONE}' ? window['env']['DEFAULT_TIMEZONE'] : 'America/Belem',
    defaultLocale: window['env']['DEFAULT_LOCALE'] !== '${DEFAULT_LOCALE}' ? window['env']['DEFAULT_LOCALE'] : 'pt-BR'
};
