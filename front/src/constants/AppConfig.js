/**
 * App Config File
 */
export default {
	appLogo: '/static/img/site-logo.svg',                                   // App Logo,
	darkLogo: '/static/img/site-dark-logo.svg',							    // dark logo
	appLogo2: '/static/img/session.png',                                    // App Logo 2 For Login & Signup Page
	brand: 'Vuely',                                        			        // Brand Name
	copyrightText: 'Vuely © 2020 All Rights Reserved.',                     // Copyright Text
	enableUserTour: process.env.NODE_ENV === 'production' ? true : false,   // Enable User Tour
	localhost: 'http://localhost/',						                    // weather API Id
	domain: 'http://157.175.103.0/',						                    // weather API Id
	googleApiKey: 'AIzaSyDHtGrrdXAMG6hAVxjuY5Pit5V8AHLwjyg',				// weather APi key,
	payment_public_key: 'HGvTMLDssJghr9tlN9gr4DVYt0qyBy',							// PAYMENT APi key,
	payment_test: true,														// PAYMENT APi key,
    testMode:true,
}
