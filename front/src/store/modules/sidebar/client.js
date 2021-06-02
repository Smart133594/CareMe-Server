// Sidebar Routers
export const clients = {
	'message.modules': [
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

    'message.settings': [
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
