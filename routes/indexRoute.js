const router = require('express').Router();

const { isAuthenticated } = require('../controllers/auth');

router.get('/', (req, res) => { // INDEX-PAGE ROUTE
    res.render('home', {
        pageTitle: 'User Authencation'
    })
})

router.get('/dashboard',isAuthenticated , (req, res) => { // DASHBOARD ROUTE
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        user: req.user
    })
})

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are Logged Out');
    res.redirect('/user/login');
})

module.exports = router;