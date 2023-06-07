import { Perfil } from 'src/app/shared/enums/perfil.enum';

export function isAllowed(roles: string[] | Perfil[]): boolean {


    // const user = authService.loadUserInfo();

    return true;

    // let allowed = false;

    // roles?.forEach(r => {
    //     allowed = allowed || true;
    //     // || this.keycloak.isUserInRole(typeof r == 'string' ? r : r.value, keycloakProperties['role-resource']);
    // });

    // return allowed;
}

// export function hasAnyRoles(): Promise<boolean> {
//     return true;
// }
