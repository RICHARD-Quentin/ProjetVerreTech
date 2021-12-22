import express from "express"
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
const jwtAuthz = require("express-jwt-authz");


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://kradihsoy.eu.auth0.com/.well-known/jwks.json`
    }),

    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://kradihsoy.eu.auth0.com/`,
    algorithms: ["RS256"]
});

const checkPermissions = (permissions: string | string[]) => {
    return jwtAuthz([permissions], {
        customScopeKey: "permissions",
        checkAllScopes: true,
        failWithError: true
    });
};

export {checkJwt, checkPermissions}