const router = require('express').Router();

const { signup } = require('../controllers/auth');

router.get('/register', (req, res) => {
    res.render('register', {
        pageTitle: 'User Authencation'
    })
})

router.post('/register', signup);

module.exports = router;