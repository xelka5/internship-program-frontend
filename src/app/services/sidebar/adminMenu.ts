export var adminMenu = [
    {
        title: 'Actions',
        type: 'header'
    },
    {
        title: 'ADMIN_MENU.ALL_INTERNSHIPS',
        icon: 'fa fa-archive',
        active: false,
        type: 'simple',
        route: '/dashboard/all-internships'
    },
    {
        title: 'ADMIN_MENU.PENDING_APPROVALS',
        icon: 'fa fa-sticky-note',
        active: false,
        type: 'simple',
        route: '/dashboard/pending-approvals'
    },
    {
        title: 'ADMIN_MENU.STATISTICS',
        icon: 'fa fa-sticky-note',
        active: false,
        type: 'simple',
        route: '/dashboard/statistics'
    },
    {
        title: 'COMMON_MENU.FINISHED_INTERNSHIPS',
        icon: 'fa fa-sticky-note',
        active: false,
        type: 'simple',
        route: '/dashboard/finished-internships-review'
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