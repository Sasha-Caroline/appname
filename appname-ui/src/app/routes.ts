import { Route } from '@angular/router';
import { authGuard } from 'src/app/core/auth/auth.guard';
import { roleGuard } from 'src/app/core/auth/role.guard';

export const ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        children: [{ path: 'projeto', canMatch: [authGuard, roleGuard], data: { roles: ['ADMIN'] }, loadChildren: () => import('./modules/projeto/routes') }],
    },
    {
        path: 'pages',
        loadChildren: () => import('./layout/pages/routes'),
    },
    {
        path: '**',
        redirectTo: 'pages/not-found',
    },
] as Route[];
