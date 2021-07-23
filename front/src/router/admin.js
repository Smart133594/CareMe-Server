import Full from 'Container/Full'

const Dashboard = () => import('Views/Dashboard/Dashboard');
const Vendors = () => import('Views/Vendors/Vendors');
const Banners = () => import('Views/Settings/Banners');
const Categories = () => import('Views/Categories/Categories');
const Departments = () => import('Views/Departments/Departments');
const Providers = () => import('Views/Users/Providers');
const Clients = () => import('Views/Users/Clients');
const Servicies = () => import('Views/Servicies/Servicies');
const Products = () => import('Views/Products/Products');
const Bookings = () => import('Views/Bookings/Bookings');
const Orders = () => import('Views/Orders/Orders');
const Profile = () => import('Views/Settings/Profile');
const Coupons = () => import('Views/Coupons/Coupons');
const AboutUs = () => import('Views/Settings/AboutUs');
const Policy = () => import('Views/Settings/Policy');
const DeliveryTerms = () => import('Views/Settings/DeliveryTerms');
const TermsAndConditions = () => import('Views/Settings/TermsAndConditions');
const ExchangeAndReturns = () => import('Views/Settings/ExchangeAndReturns');
const CustomerServices = () => import('Views/Settings/CustomerServices');
const HowToRegisterOrders = () => import('Views/Settings/HowToRegisterOrders');
const SocialLinks = () => import('Views/Settings/SocialLinks');
const SystemSettings = () => import('Views/Settings/SystemSettings');

export default {
    path: '/admin',
    component: Full,
    redirect: '/admin/bookings',
    children: [
        {
            path: '/admin/dashboard',
            component: Dashboard,
            meta: {
                requiresRole: true,
                role: 'admin',
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
            path: '/admin/bookings',
            component: Bookings,
            meta: {
                requiresRole: true,
                role: 'admin',
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

        {
            path: '/admin/orders',
            component: Orders,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.orders',
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
            path: '/admin/coupons',
            component: Coupons,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.coupons',
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
            path: '/admin/users/providers',
            component: Providers,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.providers',
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
            path: '/admin/users/clients',
            component: Clients,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.clients',
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
            path: '/admin/categories',
            component: Categories,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.categories',
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
            path: '/admin/vendors',
            component: Vendors,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.vendors',
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
            path: '/admin/departments',
            component: Departments,
            meta: {
                requiresRole: true,
                role: 'admin',
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
            path: '/admin/servicies',
            component: Servicies,
            meta: {
                requiresRole: true,
                role: 'admin',
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
        {
            path: '/admin/products',
            component: Products,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.products',
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
            path: '/admin/settings/banners',
            component: Banners,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.banners',
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
            path: '/admin/settings/aboutus',
            component: AboutUs,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.aboutUs',
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
            path: '/admin/settings/policy',
            component: Policy,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.privacyPolicy',
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
            path: '/admin/settings/delivery-terms',
            component: DeliveryTerms,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.deliveryTerms',
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
            path: '/admin/settings/terms-and-conditions',
            component: TermsAndConditions,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.termsAndConditions',
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
            path: '/admin/settings/exchange-and-returns',
            component: ExchangeAndReturns,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.exchangeAndReturns',
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
            path: '/admin/settings/customer-service',
            component: CustomerServices,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.customerService',
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
            path: '/admin/settings/how-register-order',
            component: HowToRegisterOrders,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.howToOrder',
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
            path: '/admin/settings/social-links',
            component: SocialLinks,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.socialLinks',
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
            path: '/admin/settings/system-setting',
            component: SystemSettings,
            meta: {
                requiresRole: true,
                role: 'admin',
                title: 'message.systemSetting',
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
            path: '/admin/settings/profile',
            component: Profile,
            meta: {
                requiresRole: true,
                role: 'admin',
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

