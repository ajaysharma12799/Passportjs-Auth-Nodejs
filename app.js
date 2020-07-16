require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRoutes = require('./routes/indexRoute');
const loginRoutes = require('./routes/loginRoute');
const registerRoutes = require('./routes/registerRoute');

const app = express();
const PORT = 3200;

// PASSPORT CONFIG
require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({ // EXPRESS SESSION MIDDLEWARE
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); // CONNECT-FLASH

// GLOBAL VARS
app.use( (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
} )

app.use('/', indexRoutes);
app.use('/user', loginRoutes);
app.use('/user', registerRoutes);

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( () => {
    console.log('DataBase Successfully Connected');
} )
.catch( () => {
    console.log('Failed to Connect with DataBase');
} );

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});