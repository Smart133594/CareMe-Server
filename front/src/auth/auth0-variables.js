export const AUTH_CONFIG = {
  clientId: 'EU403vWtwHgHgjqQUrvo6EVzAaqAWkg9',
  domain: 'dev-zmpm22ar.auth0.com',
  callbackUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/callback' : 'https://vuely.theironnetwork.org/callback',
  apiUrl: 'API_IDENTIFIER'
}