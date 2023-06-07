export const authProperties = {
    'issuer': window['env']['OAUTH_ISSUER'] !== '${OAUTH_ISSUER}' ? window['env']['OAUTH_ISSUER'] : 'http://localhost:8280/auth/realms/TRT8_DEV',
    //'issuer': window['env']['OAUTH_ISSUER'] !== '${OAUTH_ISSUER}' ? window['env']['OAUTH_ISSUER'] : 'https://keycloak-hom.trt8.jus.br/auth/realms/TRT8_DEV',
    'clientId': window['env']['OAUTH_CLIENT_ID'] !== '${OAUTH_CLIENT_ID}' ? window['env']['OAUTH_CLIENT_ID'] : 'appname-ui',
    'redirectUri': window.location.origin,
    'responseType': 'code',
    'strictDiscoveryDocumentValidation': true,
    'scope': 'openid profile email roles offline_access',
    'requireHttps': window['env']['OAUTH_ISSUER'] !== '${OAUTH_ISSUER}',
    'showDebugInformation': window['env']['OAUTH_ISSUER'] === '${OAUTH_ISSUER}'
};
