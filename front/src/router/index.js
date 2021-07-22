import Vue from 'vue'
import Router from 'vue-router'
import admin from './admin';
import provider from './provider';
import client from './client';

import Home from 'Container/Home'

const HomeScreen = () => import('Views/Home/HomeScreen');
const Vendors = () => import('Views/Home/Vendors');
const VendorDetails = () => import('Views/Home/VendorDetails');
const Servicies = () => import('Views/Home/Servicies');
const Service = () => import('Views/Home/Service');
const Products = () => import('Views/Home/Products');
const Product = () => import('Views/Home/Product');
const Wishes = () => import('Views/Home/Wishes');
const Carts = () => import('Views/Home/Carts');
const AboutScreen = () => import('Views/Home/About');
const FaqScreen = () => import('Views/Home/Faq');
const PolicyScreen = () => import('Views/Home/Policy');
const DeliveryTerms = () => import('Views/Home/DeliveryTerms');
const TermsAndConditions = () => import('Views/Home/TermsAndConditions');
const ExchangeAndReturns = () => import('Views/Home/ExchangeAndReturns');
const CustomerServices = () => import('Views/Home/CustomerServices');
const HowToRegisterOrders = () => import('Views/Home/HowToRegisterOrders');
const Share = () => import('Views/Home/Share');
const Page404 = () => import('Views/Page404');
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        admin,
        provider,
        client,
        {
            path: '/',
            component: Home,
            redirect: '/homepage',
            children: [
                {
                    path: '/homepage',
                    component: HomeScreen,
                },
                {
                    path: '/aboutus',
                    component: AboutScreen,
                },
                {
                    path: '/faq',
                    component: FaqScreen,
                },
                {
                    path: '/policy',
                    component: PolicyScreen,
                },
                {
                    path: '/delivery-terms',
                    component: DeliveryTerms,
                },

                {
                    path: '/terms-and-conditions',
                    component: TermsAndConditions,
                },
                {
                    path: '/exchange-and-returns',
                    component: ExchangeAndReturns,
                },
                {
                    path: '/customer-service',
                    component: CustomerServices,
                },
                {
                    path: '/how-register-order',
                    component: HowToRegisterOrders,
                },
               
                {
                    path: '/vendors/:category_id/:city_id',
                    component: Vendors,
                },
                {
                    path: '/vendor-details/:vendor_id',
                    component: VendorDetails,
                },
                {
                    path: '/servicies/:city_id/:category_id/:vendor_id/:department_id/:pricies/:discount',
                    component: Servicies,
                },
                {
                    path: '/service/:service_id/:type',
                    component: Service,
                },
                {
                    path: '/products/:city_id/:category_id/:vendor_id/:department_id/:pricies/:discount',
                    component: Products,
                },
                {
                    path: '/product/:product_id',
                    component: Product,
                },
                {
                    path: '/wishlist',
                    component: Wishes,
                },
                {
                    path: '/carts/:type',
                    component: Carts,
                },
               
                {
                    path: '/404',
                    component: Page404,
                },
            ]
        },

        {
            path: '/share',
            component: Share,
        }
    ]
})
