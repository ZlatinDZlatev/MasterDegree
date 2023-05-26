const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proekt',
    password: 'ynwa1892',
    port: 5432,
})
const crypto = require('crypto')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


const register = (req, res) =>{
    const email = req.body.email
    const pass = req.body.pass
    pool.query('SELECT * FROM public."users" WHERE email=$1',[email], async function(error, results){
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred",
                "error": error
            })

        }
        else if(results.rows.length>0) {
            res.send({
                "results": results,
                "code":200,
                "message": "Вече съществува потребител с този имейл адрес!"
            })
        }
        else{
            var hash = await argon2.hash(pass)
            pool.query('INSERT INTO public."users" (email, hash) VALUES ($1, $2)',[email, hash], async function(error, results){
                if (error)
                throw error
            else {
                res.send(
                    "Регистрацията успешна!"
                )
            }
            })
           
        }
    })
}

const login = (req, res) =>{
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
}

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe"

const forgot = (req, res) =>{
    const email=req.body.email
    console.log(req.session.userId)
    pool.query('SELECT * FROM public."users" WHERE email=$1',[email], async function(error, results){
        if(error)
        throw error
        else if(results.rows.length===0){
            console.log(req.session.userId)
            res.send(
                "Няма потребител с такъв имейл!"
            )
        }
        else{
            console.log(results)
            const secret = JWT_SECRET + results.rows[0].hash
            const token = jwt.sign({email: results.rows[0].email, id: results.rows[0].id}, secret, {expiresIn: "15m"})
            const link = `http://localhost:4000/reset-password/${results.rows[0].id}/${token}`
            console.log(link)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'nodemailer798@gmail.com',
                  pass: 'zrokigdjlwnmeppe'
                }
              });
              
              var mailOptions = {
                from: 'nodemailer798@gmail.com',
                to: results.rows[0].email,
                subject: 'Забравена парола',
                text: link
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              })
        }
    })
}

const reset = (req, res) =>{
    const{id, token} = req.params
    pool.query('SELECT * FROM public."users" WHERE id=$1',[id], async function(error, results){
        if(error)
        throw error
        else if(results.rows.length===0){
            res.send(
                "Няма потребител с такъв имейл!"
            )
        }
        else{
            const secret = JWT_SECRET + results.rows[0].hash
            try{
                const verify = jwt.verify(token, secret)
                res.render("index", {email: verify.email, status:"Not verified"})
            }
            catch(error){
                res.send("Not verified")
            }
        }
    })
}

const resetPost = (req, res) =>{
    const{id, token} = req.params
    const {password} = req.body
    pool.query('SELECT * FROM public."users" WHERE id=$1',[id], async function(error, results){
        if(error)
        throw error
        else if(results.rows.length===0){
            res.send(
                "Няма потребител с такъв имейл!"
            )
        }
        else{
            const secret = JWT_SECRET + results.rows[0].hash
            try{
                const verify = jwt.verify(token, secret)
                const hash = await argon2.hash(password)    
                pool.query('UPDATE public."users" SET hash=$1 WHERE id=$2',
    [hash, id],
    (error,results)=>{
        if (error)
            throw error
        res.render("index", {email: verify.email, status:"Verified"})

    }
    )
                   }
            catch(error){
                res.send("Something went wrong")
            }
        }
    })

}

module.exports ={
    register,
    login,
    forgot,
    reset,
    resetPost
}