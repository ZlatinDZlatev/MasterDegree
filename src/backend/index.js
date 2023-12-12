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
    maxAge: 1000*86400, // в милисекунди, което се равнява на 1 ден
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
app.get('/getProductsGradina', db.getProductsGradina)
app.get('/getProductsQsla', db.getProductsQsla)
app.get('/getProductsSchool', db.getProductsSchool)
app.get('/getProducts', db.getProducts)
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
  const kcal = req.body.kcal
  pool.query('INSERT into public."diary" (date, food, nutrition, quantity, v, p, m, he, user_id, energy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10)', [date, food, nutrition, quantity, v, p, m, he, req.session.userId, kcal], (error, results) => {
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
  pool.query('SELECT * FROM public."diary" WHERE user_id=$1 ORDER BY date ASC', [req.session.userId], async function (error, results) {
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
  pool.query('SELECT * FROM public."diary" WHERE date BETWEEN $1 AND $2 AND user_id=$3 ORDER BY date ASC', [fromDate, toDate, req.session.userId], async function (error, results) {
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

app.get('/getDiaryByDate', async (req, res) => {
  const date = req.query.date
  const query = `
  SELECT * FROM public."diary"
  WHERE date_trunc('day', date) = $1
  AND user_id=$2 ORDER BY date ASC
`;
  pool.query(query, [date, req.session.userId], async function (error, results) {
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

app.post('/addRecipe', async(req, res) => {
  const description = req.body.description
  const m = req.body.mRecepta
  const v = req.body.vRecepta
  const p = req.body.pRecepta
  const kcal = req.body.kcalRecepta
  const he = v/12
  const recepta = req.body.recepta
  const quantity = req.body.quantity
  const title = req.body.title
  const gluten = req.body.gluten
  const beltyk = req.body.beltyk

  pool.query('INSERT into public."recipes" (p, m, v, he, energy, quantity, description, user_id, recipe, value, gluten, beltyk) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10, $11, $12)', [p, m, v, he, kcal, quantity, description, req.session.userId, recepta, title, gluten, beltyk], (error, results) => {
    if (error)
        throw error
    else {
        res.send(
            "Рецептата е добавена успешно"
        )
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
app.post('/register', crypt.register)
app.post('/forgot', crypt.forgot)
app.get('/reset-password/:id/:token', crypt.reset)
app.post('/reset-password/:id/:token',crypt.resetPost)
app.get('/fetch-my-recipes', async(req, res)=>{
  pool.query('SELECT * FROM public."recipes" WHERE user_id=$1',[req.session.userId], async function(error, results){
    if(error)
    throw error
    res.send(
      {
      "results":results
      }
    )
  }
  )
})

app.get('/fetch-all-recipes', async(req, res)=>{
  pool.query('SELECT * FROM public."recipes" ', async function(error, results){
    if(error)
    throw error
    res.send(
      {
      "results":results
      }
    )
  }
  )
})

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
