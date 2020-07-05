
/**
 * Sidebar menu options for employers. 
 * Each option contains following parameters:
 *  @param title - name of the option
 *  @param icon - font awesome icon to be displayed on the left side
 *  @param active - flag if it should be active by default
 *  @param type - can be 'header' or 'simple'
 *  @param route - route to be actived on click event
 */
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