const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://kradihsoy.eu.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://kradihsoy.eu.auth0.com/api/v2/',
    issuer: [`https://kradihsoy.eu.auth0.com/`],
    algorithms: ['RS256']
});

function checkScopes(conditions){
    return jwtAuthz(conditions)
}

// Examples :
//
// This route doesn't need authentication
// app.get('/api/public', function(req, res) {
//     res.json({
//         message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//     });
// });
//
// // This route needs authentication
// app.get('/api/private', checkJwt, function(req, res) {
//     res.json({
//         message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//     });
// });
//
// const checkScopes = jwtAuthz([ 'read:messages' ]);
//
// This route needs authentication and read access on messages
// app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
//     res.json({
//         message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//     });
// });

module.exports = {checkJwt, checkScopes}

app.listen(3000, () => {
    console.log('App listen to the port 3000')
})