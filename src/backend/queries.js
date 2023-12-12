const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proekt',
    password: 'ynwa1892',
    port: 5432,
})

const getProductsGradina = (req, res) => {
    pool.query('SELECT * FROM public."gradina"', async function (error, results) {
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

const getProductsQsla = (req, res) => {
    pool.query('SELECT * FROM public."qsla"', async function (error, results) {
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

const getProductsSchool = (req, res) => {
    pool.query('SELECT * FROM public."uchilishte"', async function (error, results) {
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

const getProducts = (req, res) => {
    pool.query('SELECT * FROM public."products"', async function (error, results) {
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

const addToDiary = (req, res) => {
    const date = req.body.date;
    const food = req.body.food;
    const nutrition = req.body.nutrition;
    const quantity = req.body.quantity;
    const v = req.body.v;
    const p = req.body.p;
    const m = req.body.m;
    const he = req.body.he;
    pool.query('INSERT into public."diaryex" (date, food, nutrition, quantity, v, p, m, he, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)', [date, food, nutrition, quantity, v, p, m, he], (error, results) => {
        if (error)
            throw error
        else {
            res.send(
                "Diary updated!"
            )
        }
    })
}

const getDiary = (req, res) => {
    pool.query('SELECT * FROM public."diaryex"', async function (error, results) {
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

const getDiaryFilter = (req, res) => {
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate
    pool.query('SELECT * FROM public."diaryex" WHERE date BETWEEN $1 AND $2', [fromDate, toDate], async function (error, results) {
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

const barcodeSearch = (req, res) => {
    const barcode = req.query.barcode
    pool.query('SELECT * FROM public."barcode" WHERE barcode=$1', [barcode], async function (error, results) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred",
                "error": error
            })

        }
        else {
            if (results) {
                res.send({
                    "code": 200,
                    "results": results
                })
            }
            else{
                res.send({
                    "code": 600,
                })
            }
        }
    })

}


module.exports = {
    getProductsGradina,
    getProductsSchool,
    getProductsQsla,
    getProducts,
    addToDiary,
    getDiary,
    getDiaryFilter,
    barcodeSearch
}