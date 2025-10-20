var express = require('express');
var router = express.Router();

const { auth, requiresAuth } = require('express-openid-connect')

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: 'SrQLFhgPgfTw2nIJsvBR1yHGFJ1D2Ge5',
    issuerBaseURL: 'https://dev-ezn2m2421tt4b0iz.us.auth0.com',
    secret: 'LONG_RANDOM_STRING',
    idpLogout: true
}

router.use(auth(config));

/* GET home page. */
router.get(
    '/',
    (
        req,
        res, next) => {
        /* TODO Do RAG*/
        if(req.oidc.isAuthenticated()) {
            res.render('index', { title: 'Express' })
        } else {
            res.send('Logged out' );
        }
});

module.exports = router;
