const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const homeRoutes = require('./routes/homeRoute');
const registerRoutes = require('./routes/registerRoute');

const app = express();
const PORT = 3200;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(homeRoutes);
app.use(registerRoutes);

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});