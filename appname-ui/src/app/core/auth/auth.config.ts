import { AuthConfig } from 'angular-oauth2-oidc';
import { authProperties } from 'src/environments/auth.properties';

export const authConfig: AuthConfig = {
    issuer: authProperties['issuer'],
    redirectUri: authProperties['redirectUri'],
    clientId: authProperties['clientId'],
    responseType: authProperties['responseType'],
    strictDiscoveryDocumentValidation: authProperties['strictDiscoveryDocumentValidation'],
    scope: authProperties['scope'],
    requireHttps: authProperties['requireHttps'],

    sessionChecksEnabled: true,
};
