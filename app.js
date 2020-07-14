require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/indexRoute');
const loginRoutes = require('./routes/loginRoute');
const registerRoutes = require('./routes/registerRoute');

const app = express();
const PORT = 3200;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

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