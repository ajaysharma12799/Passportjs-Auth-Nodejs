const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home.ejs', {
        pageTitle: 'User Authencation'
    })
})

module.exports = router;