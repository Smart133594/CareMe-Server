// Sidebar Routers
export const admins = {
    'message.general': [
        // {
        //     action: 'zmdi-view-dashboard',
        //     title: 'message.dashboard',
        //     active: true,
        //     path: '/dashboard',
        //     items: null,
        //     label: 'Old'
        // },

        {
            action: 'ti-bookmark-alt',
            title: 'message.bookings',
            active: false,
            path: '/bookings',
            items: null,
            label: 'Old'
        },

        {
            action: 'ti-write',
            title: 'message.orders',
            active: false,
            path: '/orders',
            items: null,
            label: 'Old'
        },
    ],

    'message.users' : [
        {
            action: 'zmdi-ticket-star',
            title: 'message.coupons',
            active: false,
            path: '/coupons',
            items: null,
            label: 'Old'
        },

        {
            action: 'zmdi-accounts',
            title: 'message.providers',
            active: false,
            path: '/users/providers',
            items: null,
            label: 'Old'
        },

        {
            action: 'zmdi-male-female',
            title: 'message.clients',
            active: false,
            path: '/users/clients',
            items: null,
            label: 'Old'
        },
    ],

    'message.features' : [
        {
            action: 'ti-pie-chart',
            title: 'message.categories',
            active: false,
            path: '/categories',
            items: null,
            label: 'Old'
        },

        {
            action: 'zmdi-group',
            title: 'message.vendors',
            active: false,
            path: '/vendors',
            items: null,
            label: 'Old'
        },

        {
            action: 'zmdi-washing-machine',
            title: 'message.departments',
            active: false,
            path: '/departments',
            items: null,
            label: 'New'
        },

        {
            action: 'zmdi-favorite-outline',
            title: 'message.servicies',
            active: false,
            path: '/servicies',
            items: null,
            label: 'Old'
        },

        {
            action: 'zmdi-shape',
            title: 'message.products',
            active: false,
            path: '/products',
            items: null,
            label: 'Old'
        },
    ],

    'message.settings': [
        {
            action: 'ti-layout-slider',
            title: 'message.banners',
            active: false,
            label: 'Old',
            path: '/settings/banners',
            items: null,
        },
        {
            action: 'ti-user',
            title: 'message.profile',
            active: false,
            label: 'Old',
            path: '/settings/profile',
            items: null,
        },
    ],
}
