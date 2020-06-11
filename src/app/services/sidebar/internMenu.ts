export var internMenu = [
    {
        title: 'Actions',
        type: 'header'
    },
    {
        title: 'INTERN_MENU.NEW_INTERNSHIP',
        icon: 'fa fa-briefcase',
        active: false,
        type: 'simple',
        route: '/dashboard/search-internships'
    },
    {
        title: 'INTERN_MENU.ACTIVE_INTERNSHIPS',
        icon: 'fa fa-archive',
        active: false,
        type: 'simple',
        route: '/dashboard/archive'
    },
    {
        title: 'INTERN_MENU.MY_APPLICATIONS',
        icon: 'fa fa-sticky-note',
        active: false,
        type: 'simple',
        route: '/dashboard/my-applications'
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