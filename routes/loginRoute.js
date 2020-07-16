const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login', {
        pageTitle: 'User Authencation'
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/user/login',
        successRedirect: '/dashboard'
    })(req, res, next);
})


module.exports = router;