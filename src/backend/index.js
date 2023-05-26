const express = require('express')
const bodyParser = require('body-parser')
const cors= require('cors')
const app = express()
const db = require('./queries')
const crypt = require('./crypt')
const argon2 = require('argon2')
const port = 4000
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const sessions = require('express-session')
const genFunc = require('connect-pg-simple')
const PostgresqlStore = genFunc(sessions);
const sessionStore = new PostgresqlStore({
  conString: 'postgres://postgres:ynwa1892@localhost:5432/proekt',
});
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proekt',
    password: 'ynwa1892',
    port: 5432,
})

const sessionMiddleware=sessions({
  resave:false,
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge: 1000*86400,
    name:'connect.sid',
    },
  secret:'keyboard cat',
  saveUninitialized:false,
  store: sessionStore

})
app.set('trust proxy', 1)
app.use(sessionMiddleware)
var isAuth = false;
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Expose-Headers', 'Set-Cookie')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
app.use(express.urlencoded({
  extended:false
}))
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
  
  
}))
app.set("view engine","ejs")
app.get('/getProducts', db.getProducts)
app.get('/getProductsSchool', db.getProductsSchool)
app.get('/authcheck', async (req, res) => {
  res.send(
    {
    "auth": req.session.userId
    }
  )
})
app.post('/addToDiary', async (req, res) => {
  const date = req.body.date;
  const food = req.body.food;
  const nutrition = req.body.nutrition;
  const quantity = req.body.quantity;
  const v = req.body.v;
  const p = req.body.p;
  const m = req.body.m;
  const he = req.body.he;
  pool.query('INSERT into public."diaryex" (date, food, nutrition, quantity, v, p, m, he, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)', [date, food, nutrition, quantity, v, p, m, he, req.session.userId], (error, results) => {
      if (error)
          throw error
      else {
          res.send(
              "Diary updated!"
          )
      }
  })
})
app.get('/getDiary', async (req, res) => {
  pool.query('SELECT * FROM public."diaryex" WHERE user_id=$1', [req.session.userId], async function (error, results) {
      if (error) {
          res.send({
              "code": 400,
              "failed": "error ocurred",
              "error": error
          })

      }
      else {
          res.send({
              "results": results
          })
      }
  })
}
)
app.get('/getDiaryFilter', async (req, res) => {
  const fromDate = req.query.fromDate
  const toDate = req.query.toDate
  pool.query('SELECT * FROM public."diaryex" WHERE date BETWEEN $1 AND $2 AND user_id=$3', [fromDate, toDate, req.session.userId], async function (error, results) {
      if (error) {
          res.send({
              "code": 400,
              "failed": "error ocurred",
              "error": error
          })

      }
      else {
          res.send({
              "results": results
          })
      }
  })
})
app.get('/barcodeSearch', db.barcodeSearch)
app.get('/logout', async(req,res)=>{
  req.session.destroy(function(err){
    if(err){
       console.log(err);
    }else{console.log(req.session)
      isAuth= false
      res.clearCookie('connect.sid');
      res.send("Session destroyed!")}})
    })
app.get('/login',async(req,res)=>{
  console.log(req.query)
  const email = req.query.email
    const pass = req.query.pass
    pool.query('SELECT * FROM public."users" WHERE email=$1',[email], async function(error, results){
        if(error)
        throw error
        else if(results.rows.length===0){
            res.send(
                "Имейлът или паролата не съвпадат"
            )
        }
        else{
            try {
                if (await argon2.verify(results.rows[0].hash, pass)) {
                  req.session.userId=results.rows[0].id
                  isAuth=true                  
                  console.log(req.session.userId)
                    res.send(
                      {
                        "code": 200,
                        "message": "Успешно влизане"
                        }
                    )
                } else {
                    res.send(
                        "Имейлът или паролата не съвпадат"
                    )
                }
              } catch (err) {
                throw err
              }
        }
    })
    
  
  
})
app.post('/register', crypt.register /* async(req,res)=>{
  console.log(req.session)
} */)
app.post('/forgot', crypt.forgot /*async(req,res)=>{
  console.log(req.session)
}*/)
app.get('/reset-password/:id/:token', crypt.reset)
app.post('/reset-password/:id/:token',crypt.resetPost)
/*
app.get('/login', db.login)
app.post('/register', db.createUser)
app.post('/add-product', db.addProduct)
app.get('/laptops', db.getLaptops)
app.get('/get-product', db.getProduct)
app.get('/filter',  db.filter)
app.get('/filter-monitors',  db.filterMonitors)
app.put('/edit-product', db.editProduct)
app.delete('/delete-product', db.deleteProduct)
app.post('/update-cart', db.updateCart)
app.get('/get-cart', db.getCart)
app.delete('/delete-from-cart', db.deleteFromCart)
app.delete('/delete-all', db.deleteAll)
app.get('/get-user', db.getUser)
app.get('/get-first', db.getFirst)
app.get('/get-second', db.getSecond)
app.get('/homepage', db.homePage)
*/
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
