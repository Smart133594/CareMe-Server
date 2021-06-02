// Sidebar Routers
export const providers = {
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

        // {
        //     action: 'ti-write',
        //     title: 'message.orders',
        //     active: false,
        //     path: '/orders',
        //     items: null,
        //     label: 'Old'
        // },
    ],

    'message.features' : [
        {
            action: 'ti-hand-open',
            title: 'message.workers',
            active: false,
            path: '/workers',
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
            action: 'zmdi-network-off',
            title: 'message.offDays',
            active: false,
            label: 'Old',
            path: '/settings/offdays',
            items: null,
        },
        {
            action: 'zmdi-network-locked',
            title: 'message.holidays',
            active: false,
            label: 'Old',
            path: '/settings/holidays',
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
