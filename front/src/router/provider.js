import Full from 'Container/Full'

const Dashboard = () => import('Views/Dashboard/DashboardProvider');
const Departments = () => import('Views/Departments/Departments');
const Servicies = () => import('Views/Servicies/Servicies');
const Products = () => import('Views/Products/Products');
const Workers = () => import('Views/Workers/Workers');
const Bookings = () => import('Views/Bookings/Bookings');
const Orders = () => import('Views/Orders/Orders');
const OffDays = () => import('Views/Settings/OffDays');
const Holidays = () => import('Views/Settings/Holidays');
const Profile = () => import('Views/Settings/Profile');

export default {
    path: '/provider',
    component: Full,
    redirect: '/provider/bookings',
    children: [
        {
            path: '/provider/dashboard',
            component: Dashboard,
            meta: {
                requiresRole: true,
                role: 'provider',
                title: 'message.dashboard',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Timelines /'
                    },
                    {
                        breadcrumbActive: "Icon Dots"
                    }
                ]
            }
        },

        {
            path: '/provider/bookings',
            component: Bookings,
            meta: {
                requiresRole: true,
                role: 'provider',
                title: 'message.bookings',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Timelines /'
                    },
                    {
                        breadcrumbActive: "Icon Dots"
                    }
                ]
            }
        },

        // {
        //     path: '/provider/orders',
        //     component: Orders,
        //     meta: {
        //         requiresRole: true,
        //         role: 'provider',
        //         title: 'message.orders',
        //         breadcrumb: [
        //             {
        //                 breadcrumbInactive: 'Timelines /'
        //             },
        //             {
        //                 breadcrumbActive: "Icon Dots"
        //             }
        //         ]
        //     }
        // },

        {
            path: '/provider/workers',
            component: Workers,
            meta: {
                requiresRole: true,
                role: 'provider',
                title: 'message.workers',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Timelines /'
                    },
                    {
                        breadcrumbActive: "Icon Dots"
                    }
                ]
            }
        },

        {
            path: '/provider/departments',
            component: Departments,
            meta: {
                requiresRole: true,
                role: 'provider',
                title: 'message.departments',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Timelines /'
                    },
                    {
                        breadcrumbActive: "Icon Dots"
                    }
                ]
            }
        },

        {
            path: '/provider/servicies',
            component: Servicies,
            meta: {
                requiresRole: true,
                role: 'provider',
                title: 'message.servicies',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Timelines /'
                    },
                    {
                        breadcrumbActive: "Icon Dots"
                    }
                ]
            }
        },

        // {
        //     path: '/provider/products',
        //     component: Products,
        //     meta: {
        //         requiresRole: true,
        //         role: 'provider',
        //         title: 'message.products',
        //         breadcrumb: [
        //             {
        //                 breadcrumbInactive: 'Timelines /'
        //             },
        //             {
        //                 breadcrumbActive: "Icon Dots"
        //             }
        //         ]
        //     }
        // },

        {
            path: '/provider/settings/offdays',
            component: OffDays,
            meta: {
                requiresRole: true,
                role: 'provider',
                title: 'message.offDays',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Timelines /'
                    },
                    {
                        breadcrumbActive: "Icon Dots"
                    }
                ]
            }
        },

        {
            path: '/provider/settings/holidays',
            component: Holidays,
            meta: {
                requiresRole: true,
                role: 'provider',
                title: 'message.holidays',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Timelines /'
                    },
                    {
                        breadcrumbActive: "Icon Dots"
                    }
                ]
            }
        },

        {
            path: '/provider/settings/profile',
            component: Profile,
            meta: {
                requiresRole: true,
                role: 'provider',
                title: 'message.profile',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Timelines /'
                    },
                    {
                        breadcrumbActive: "Icon Dots"
                    }
                ]
            }
        },
    ]
}
