import Full from 'Container/Full'

const Dashboard = () => import('Views/Dashboard/DashboardClient');
const Profile = () => import('Views/Settings/Profile');
const Booking = () => import('Views/Bookings/ClientBookings');

export default {
    path: '/client',
    component: Full,
    redirect: '/client/bookings',
    children: [
        {
            path: '/client/bookings',
            component: Booking,
            meta: {
                requiresRole: true,
                role: 'client',
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
            path: '/client/settings/profile',
            component: Profile,
            meta: {
                requiresRole: true,
                role: 'client',
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
