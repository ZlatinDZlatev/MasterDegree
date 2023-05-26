const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./queries');
const crypt = require('./crypt');
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessions = require('express-session');

const sessionMiddleware = sessions({
  resave: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 600000,
    name: 'connect.sid',
  },
  secret: 'keyboard cat',
  saveUninitialized: false,
});

app.set('trust proxy', 1);
app.use(sessionMiddleware);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use(
  cors({
    origin: 'http://localhost:3000/',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);

app.set('view engine', 'ejs');

app.get('/getProducts', db.getProducts);
app.get('/getProductsSchool', db.getProductsSchool);
app.post('/addToDiary', db.addToDiary);
app.get('/getDiary', db.getDiary);
app.get('/getDiaryFilter', db.getDiaryFilter);
app.get('/barcodeSearch', db.barcodeSearch);

app.post('/register', crypt.register);

app.get('/login', async (req, res) => {
  req.session.username = 'John';
  console.log("ded3f")
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Add this line
  res.send('Session saved!');
});

app.post('/forgot', async (req, res) => {
  console.log(req.session);
  console.log("dferfe")
 // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Add this line
 // res.send('Session saved!');

});

app.get('/reset-password/:id/:token', crypt.reset);

app.post('/reset-password/:id/:token', crypt.resetPost);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});