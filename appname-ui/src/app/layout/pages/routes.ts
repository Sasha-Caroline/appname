import { Route } from '@angular/router';
import { EmptyPageLayoutComponent } from 'src/app/layout/pages/empty-page-layout.component';

export default [
    {
        path: '',
        component: EmptyPageLayoutComponent,
        children: [
            { path: 'error', loadComponent: () => import('./error/unexpected-error.component').then(m => m.UnexpectedErrorComponent) },
            { path: 'expired-session', loadComponent: () => import('./error/expired-session.component').then(m => m.ExpiredSessionComponent) },
            { path: 'unauthorized', loadComponent: () => import('./error/unauthorized.component').then(m => m.UnauthorizedComponent) },
            { path: 'forbidden', loadComponent: () => import('./error/forbidden.component').then(m => m.ForbiddenComponent) },
            { path: 'not-found', loadComponent: () => import('./error/page-not-found.component').then(m => m.PageNotFoundComponent) },
            { path: 'unavailable-service', loadComponent: () => import('./error/unavailable-service.component').then(m => m.UnavailableServiceComponent) },
            { path: 'unavailable-server', loadComponent: () => import('./error/unavailable-server.component').then(m => m.UnavailableServerComponent) },
            { path: 'bad-request', loadComponent: () => import('./error/bad-request.component').then(m => m.BadRequestComponent) },
        ],
    },
] as Route[];
