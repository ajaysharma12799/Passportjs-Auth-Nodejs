const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login', {
        pageTitle: 'User Authencation'
    })
})

router.post('/login', (req, res) => {
    
})

module.exports = router;