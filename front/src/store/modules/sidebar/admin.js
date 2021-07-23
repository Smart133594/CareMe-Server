// Sidebar Routers
export const admins = {
    'message.general': [
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
			action: 'zmdi-portable-wifi-changes',
			title: 'message.systemSetting',
			active: false,
			label: 'Old',
			items: [
				{
                    title: 'message.banners',
                    label: 'Old',
                    path: '/settings/banners',
                },
                {
                    title: 'message.aboutUs',
                    label: 'Old',
                    path: '/settings/aboutus',
                },
                {
                    title: 'message.privacyPolicy',
                    label: 'Old',
                    path: '/settings/policy',
                },
                {
                    title: 'message.deliveryTerms',
                    label: 'Old',
                    path: '/settings/delivery-terms',
                },
                {
                    title: 'message.termsAndConditions',
                    label: 'Old',
                    path: '/settings/terms-and-conditions',
                },
                {
                    title: 'message.exchangeAndReturns',
                    label: 'Old',
                    path: '/settings/exchange-and-returns',
                },
                {
                    title: 'message.customerService',
                    label: 'Old',
                    path: '/settings/customer-service',
                },
                {
                    title: 'message.howToOrder',
                    label: 'Old',
                    path: '/settings/how-register-order',
                },
                {
                    title: 'message.socialLinks',
                    label: 'Old',
                    path: '/settings/social-links',
                },
                {
                    title: 'message.systemSetting',
                    label: 'Old',
                    path: '/settings/system-setting',
                },
                {
                    title: 'message.profile',
                    label: 'Old',
                    path: '/settings/profile',
                },
			]
		},
    ],
}
