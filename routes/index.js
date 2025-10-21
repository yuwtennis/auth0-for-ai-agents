const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect')
const Config = require('../env')

router.use(auth(Config.auth0_config));

/* GET home page. */
router.get(
    '/',
    (
        req,
        res
    ) => {
        /* TODO Do RAG*/
        if(req.oidc.isAuthenticated()) {
            res.render('index', { user: req.oidc.user.email })
        } else {
            res.send('Logged out' );
        }
});

module.exports = router;
