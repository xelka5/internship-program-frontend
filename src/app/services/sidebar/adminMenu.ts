export var adminMenu = [
    {
        title: 'Actions',
        type: 'header'
    },
    {
        title: 'ADMIN_MENU.ACTIVE_APPLICATIONS',
        icon: 'fa fa-archive',
        active: false,
        type: 'simple',
        route: '/dashboard/archive'
    },
    {
        title: 'ADMIN_MENU.PENDING_APPROVALS',
        icon: 'fa fa-sticky-note',
        active: false,
        type: 'simple',
        route: '/dashboard/users'
    },
    {
        title: 'ADMIN_MENU.STATISTICS',
        icon: 'fa fa-sticky-note',
        active: false,
        type: 'simple',
        route: '/dashboard/transactions'
    },
    {
        title: 'COMMON_MENU.ACCOUNT_SETTINGS',
        icon: 'fa fa-cogs',
        active: false,
        type: 'simple',
        route: '/dashboard/account-settings'
    },
    {
        title: 'COMMON_MENU.LOGOUT',
        icon: 'fa fa-sign-out',
        active: false,
        type: 'simple'
    }
];