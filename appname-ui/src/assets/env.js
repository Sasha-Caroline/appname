(function (window) {
    window['env'] = window['env'] || {};

    // Environment variables
    window['env']['PRODUCTION'] = true;
    window['env']['IMAGE_VERSION'] = '${IMAGE_VERSION}';
    window['env']['AMBIENTE'] = '${AMBIENTE}';
    window['env']['API_URL'] = '${API_URL}';
    window['env']['DEFAULT_TIMEZONE'] = '${DEFAULT_TIMEZONE}';
    window['env']['DEFAULT_LOCALE'] = '${DEFAULT_LOCALE}';

    window['env']['OAUTH_ISSUER'] = '${OAUTH_ISSUER}';
    window['env']['OAUTH_CLIENT_ID'] = '${OAUTH_CLIENT_ID}';

    window['env']['LOG_LEVEL'] = '${LOG_LEVEL}';
    window['env']['LOG_SHOW_STACK_TRACE'] = '${LOG_SHOW_STACK_TRACE}';
    window['env']['LOG_SHOW_DATE_TIME'] = '${LOG_SHOW_DATE_TIME}';
    window['env']['LOG_DATE_TIME_FORMAT'] = '${LOG_DATE_TIME_FORMAT}';
})(this);
