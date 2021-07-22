// src/main.js

import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'
import { Vue2Dragula } from 'vue2-dragula'
import VueQuillEditor from 'vue-quill-editor'
import wysiwyg from 'vue-wysiwyg'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import Nprogress from 'nprogress'
import VueI18n from 'vue-i18n'
import VueTour from 'vue-tour'
import fullscreen from 'vue-fullscreen'
import InstantSearch from 'vue-instantsearch'
import VueVideoPlayer from 'vue-video-player';
import Croppa from 'vue-croppa';
import BootstrapVue from 'bootstrap-vue'
// global components
import GlobalComponents from './globalComponents'
// router
import router from './router'
import Geocoder from "@pderas/vue2-geocoder";
// store
import { store } from './store/store';

// include all css files
import './lib/VuelyCss'

//current position
import VueGeolocation from 'vue-browser-geolocation';
import VueAwesomeSwiper from 'vue-awesome-swiper'
// messages
import messages from './lang';
import appConfig from './constants/AppConfig'

Vue.config.productionTip = false

// navigation guards before each
router.beforeEach((to, from, next) => {
    Nprogress.start()
    if(!to.matched.length){
        next({
            path: '/404',
        })
    }
    else if (to.matched.some(record => record.meta.requiresRole)) {
        let filtered = to.matched.filter(record => record.meta.requiresRole)
        let url = filtered[0]
        if (localStorage.getItem('user') === null) {
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            var user = JSON.parse(localStorage.getItem('user'))
            if (user.role == url.meta.role)
                next()
            else
                next({
                    path: '/',
                    query: { redirect: to.fullPath }
                })
        }
    } else {
        next() // make sure to always call next()!
    }
})

// navigation guard after each
router.afterEach(() => {
    Nprogress.done()
    setTimeout(() => {
        const contentWrapper = document.querySelector(".v-content__wrap");
        if (contentWrapper !== null) {
            contentWrapper.scrollTop = 0;
        }
        const boxedLayout = document.querySelector('.app-boxed-layout .app-content');
        if (boxedLayout !== null) {
            boxedLayout.scrollTop = 0;
        }
        const miniLayout = document.querySelector('.app-mini-layout .app-content');
        if (miniLayout !== null) {
            miniLayout.scrollTop = 0;
        }
    }, 200);
})

Vue.use(InstantSearch);
Vue.use(VueI18n)
Vue.use(VueTour)
Vue.use(Vue2Dragula)
Vue.use(VueQuillEditor)
Vue.use(VueResource)
Vue.use(wysiwyg, {})
Vue.use(VueBreadcrumbs)
Vue.use(Notifications, { velocity })
Vue.use(fullscreen);
Vue.use(GlobalComponents);
Vue.use(VueVideoPlayer);
Vue.use(Croppa);
Vue.use(BootstrapVue)
Vue.use(VueGeolocation);
Vue.use(VueAwesomeSwiper)
Vue.use(Geocoder, {
    defaultCountryCode: null,
    defaultLanguage:    null, 
    defaultMode:        'lat-lng',
    googleMapsApiKey:    appConfig.googleApiKey,
});

Vue.use(VueGoogleMaps, {
    load: {
        key: appConfig.googleApiKey,
        libraries: 'places',
    }
})

const i18n = new VueI18n({
    locale: store.getters.selectedLocale.locale, // set locale
    messages, // set locale messages
})

new Vue({
    store,
    i18n,
    router,
    vuetify,
    render: h => h(App),
    components: { App }
}).$mount('#app')
