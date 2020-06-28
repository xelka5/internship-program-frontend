export var employerMenu = [
    {
        title: 'Actions',
        type: 'header'
    },
    {
        title: 'EMPLOYER_MENU.MY_PROGRAMS',
        icon: 'fa fa-briefcase',
        active: false,
        type: 'simple',
        route: '/dashboard/my-internships'
    },
    {
        title: 'EMPLOYER_MENU.CREATE_PROGRAM',
        icon: 'fa fa-briefcase',
        active: false,
        type: 'simple',
        route: '/dashboard/add-internship'
    },
    // {
    //     title: 'EMPLOYER_MENU.INTERNS_REPORTS',
    //     icon: 'fa fa-archive',
    //     active: false,
    //     type: 'simple',
    //     route: '/dashboard/intern-reports'
    // },
    {
        title: 'COMMON_MENU.FINISHED_INTERNSHIPS',
        icon: 'fa fa-sticky-note',
        active: false,
        type: 'simple',
        route: '/dashboard/finished-internships'
    },
    {
        title: 'EMPLOYER_MENU.PENDING_APPLICATIONS',
        icon: 'fa fa-list',
        active: false,
        type: 'simple',
        route: '/dashboard/pending-applications'
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