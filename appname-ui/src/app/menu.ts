import { MenuItem } from 'primeng/api';

export const MENU: MenuItem[] = [
    {
        label: 'menu.home',
        icon: 'fas house',
        routerLink: ['/'],
    },
    {
        label: 'menu.cadastros',
        items: [
            {
                label: 'menu.projetos',
                icon: 'fas diagram-project',
                routerLink: ['/projeto'],
            },
        ],
    },
    {
        label: 'menu.paginas',
        items: [
            {
                label: 'menu.erro-inesperado',
                routerLink: ['/pages/error'],
            },
            {
                label: 'menu.sessao-expirada',
                routerLink: ['/pages/expired-session'],
            },
            {
                label: 'menu.acesso-nao-autorizado',
                routerLink: ['/pages/unauthorized'],
            },
            {
                label: 'menu.acesso-negado',
                routerLink: ['/pages/forbidden'],
            },
            {
                label: 'menu.recurso-nao-encontrado',
                routerLink: ['/pages/not-found'],
            },
            {
                label: 'menu.servico-indisponivel',
                routerLink: ['/pages/unavailable-service'],
            },
            {
                label: 'menu.servidor-indisponivel',
                routerLink: ['/pages/unavailable-server'],
            },
            {
                label: 'menu.solicitacao-invalida',
                routerLink: ['/pages/bad-request'],
            },
        ],
    },
];
