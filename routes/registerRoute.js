const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register.ejs', {
        pageTitle: 'User Authencation'
    })
})

module.exports = router;