export var employerMenu = [
    {
        title: 'Actions',
        type: 'header'
    },
    {
        title: 'EMPLOYER_MENU.CREATE_PROGRAM',
        icon: 'fa fa-briefcase',
        active: false,
        type: 'simple',
        route: '/dashboard/active'
    },
    {
        title: 'EMPLOYER_MENU.CONTACT_ADMINISTRATION',
        icon: 'fa fa-archive',
        active: false,
        type: 'simple',
        route: '/dashboard/archive'
    },
    {
        title: 'EMPLOYER_MENU.PENDING_APPLICATIONS',
        icon: 'fa fa-list',
        active: false,
        type: 'simple',
        route: '/dashboard/assigned-developers'
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