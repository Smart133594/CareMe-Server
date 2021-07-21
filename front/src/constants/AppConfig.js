/**
 * App Config File
 */
const testMode = true
// const dev_domain = 'http://localhost/'	                    			
const dev_domain = 'http://dev.careme.om/'	                    			
const domain = 'https://careme.om/'		

export default {
	appLogo: '/static/img/site-logo.svg',                                   // App Logo,
	darkLogo: '/static/img/site-dark-logo.svg',							    // dark logo
	appLogo2: '/static/img/session.png',                                    // App Logo 2 For Login & Signup Page
	brand: 'Vuely',                                        			        // Brand Name
	copyrightText: 'Vuely © 2020 All Rights Reserved.',                     // Copyright Text
	enableUserTour: process.env.NODE_ENV === 'production' ? true : false,   // Enable User Tour
	googleApiKey: 'AIzaSyDHtGrrdXAMG6hAVxjuY5Pit5V8AHLwjyg',				// weather APi key,
	baseUrl:testMode?dev_domain:domain,
	payment_test: true,														// PAYMENT APi key,
	payment_public_key: 'nTFkb94A6HUKTojVerBVlDs8ucMhrX',					// PAYMENT APi key, TEST
	// payment_public_key: 'jDf6yrgcNb4Gj0h47cmGfpIvkGCwkL',					// PAYMENT APi key,
}
