const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'website',
    password: 'ynwa1892',
    port: 5432,
})

const login = (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    pool.query('SELECT * FROM public."Users" WHERE username = $1 ', [username], async function (error, results) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred",
                "error": error
            })

        } else {
            if (results.rows.length > 0) {
                if (password === results.rows[0].password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull",
                        "url": "/profile",
                        "user": results.rows[0].id_user
                    })
                }
                else {
                    res.send({
                        "code": 204,
                        "message": "Username and password does not match"
                    })
                }
            }
            else {
                res.send({
                    "code": 206,
                    "message": "Username does not exits"
                });
            }
        }
    });
}

const createUser = (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const fn = req.body.firstname;
    const ln = req.body.lastname;
    const address = req.body.address;
    const number = req.body.number;
    pool.query('SELECT * FROM public."Users" WHERE email  =$1', [email], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length === 0) {
            pool.query('SELECT * FROM public."Users" WHERE username  =$1', [username], (error, results) => {
                if (error) {
                    throw error
                }
                if (results.rows.length === 0) {
                    pool.query('INSERT INTO public."Users" (username, password, first_name, last_name, email, address, number) VALUES ($1, $2, $3, $4, $5, $6, $7)', [username, password, fn, ln, email, address, number], (error, results) => {
                        if (error) {
                            throw error
                        }
                        console.log(results)
                        pool.query('SELECT * FROM public."Users" WHERE username  =$1', [username], (error, results) => {
                            res.send(
                                {
                                    "code": 200,
                                    "message": "registered",
                                    "url": "/profile",
                                    "user": results.rows[0].id_user
                                }
                            )
                        })

                    })
                }
                else {
                    res.send(
                        {
                            "code": 206,
                            "message": "There is already a profile with this username!"
                        }
                    )
                }
            })
        }
        else {
            res.send(
                {
                    "code": 204,
                    "message": "There is already a profile with this email!"
                }
            )
        }
    })
}
const addProduct = (req, res) => {
    const brand = req.body.brand
    const model = req.body.model
    const price = req.body.price
    const quantity = req.body.quantity
    const image = req.body.image
    const category = req.body.category
    const desc = req.body.description
    pool.query('INSERT into public."Products" (brand, model, price, quantity, category, descr, image) VALUES ($1, $2, $3, $4, $5, $6, $7)', [brand, model, price, quantity, category, desc, image], (error, results) => {
        if (error)
            throw error
        else {
            res.send(
                "Product added successfully!"
            )
        }
    })
}
const getLaptops = (req, res) => {
    const category = "Laptops"
    pool.query('SELECT * from public."Products" WHERE category=$1', [category], (error, results) => {
        if (error)
            throw error
        res.send(
            {
                "results": results
            }
        )
    })
}
const getProduct = (req, res) => {
    const id = req.query.id
    pool.query('SELECT * from public."Products" WHERE id_product=$1', [id], (error, results) => {
        if (error)
            throw error
        res.send(
            {
                "results": results
            }
        )
    })
}
async function f1(brands) {
    var resultBrands = []


    return resultBrands
}
async function filter(req, res) {
    const prices = req.query.price
    const brands = JSON.parse(req.query.brand)
    const category="Laptops"

    var resultBrands = []
    for (let [key, value] of Object.entries(brands)) {
        let caps = ''
        if (value) {
            if (key !== "hp") {
                caps = key.charAt(0).toUpperCase() + key.slice(1)
            }
            else {
                caps = key.charAt(0).toUpperCase() + key.charAt(1).toUpperCase()

            }
            pool.query('SELECT * from public."Products" WHERE brand=$1 AND price>=$2 AND price<=$3 AND category=$4', [caps,prices[0], prices[1], category], (error, results) => {
                if (error)
                    throw error
                if (results.rows.length !== 0) {
                    results.rows.forEach(
                        row => {
                            resultBrands.push({ row })
                        })
                }
            })
        }
    }
    setTimeout(() => {
        res.send(
            {
                "results": resultBrands
            }
        )
    }, 1000)
}
const deleteProduct = (req,res) =>{
    const id=req.body.id_product
    pool.query('DELETE FROM public."Products" WHERE id_product=$1',[id],(error,results)=>{
        if (error)
            throw error
        res.send(
            {
            "results":results
            }
        )
    })
}
const editProduct = (req,res) => {
    console.log(req)
    const product = req.body.product
    pool.query('UPDATE public."Products" SET brand=$1, model=$2, price=$3, category=$4, descr=$5,image=$6, quantity=$7 WHERE id_product=$8',
    [product.brand,product.model, product.price,product.category, product.descr, product.image, product.quantity, product.id_product],
    (error,results)=>{
        if (error)
            throw error
        res.send(
            "Product updated successfully"
        )
    }
    )
}
const updateCart = (req,res) => {
    const productID = req.body.productID
    const userID = req.body.userID
    const quantity = req.body.quantity
    const price = req.body.price
    pool.query('INSERT into public."Cart" (user_id, product_id, buy_quantity, final_price) values ($1, $2, $3, $4)', [userID, productID , quantity, price], (error, results) => {
            if(error)
                throw error
            res.send(
                "Product added to cart successfully"
            )
    })
}
const getCart = (req, res) =>{
    const userID = req.query.id
    pool.query('SELECT * from public."Cart" INNER JOIN public."Products" ON public."Products".id_product=public."Cart".product_id WHERE public."Cart".user_id=$1',
    [userID],(error, results)=>{
        if(error)
            throw error
        res.send(
            {
                "results":results
            }
        )
    })
}

const deleteFromCart = (req, res) =>{
    const cartID = req.body.id_cart
    const userID = req.body.id_user
    pool.query('DELETE FROM public."Cart" WHERE id_cart=$1',[cartID],(error,results)=>{
        if (error)
            throw error
         pool.query('SELECT * from public."Cart" INNER JOIN public."Products" ON public."Products".id_product=public."Cart".product_id WHERE public."Cart".user_id=$1',
    [userID],(error, results)=>{
        if(error)
            throw error
        res.send(
            {
                "results":results
            }
        )
    })
    })
}

const filterMonitors = (req, res) =>{
    const prices = req.query.price
    const brands = JSON.parse(req.query.brand)
    const category="Monitors"

    var resultBrands = []
    for (let [key, value] of Object.entries(brands)) {
        let caps = ''
        if (value) {
            if (key !== "hp" && key!=="lg") {
                caps = key.charAt(0).toUpperCase() + key.slice(1)
            }
            else {
                caps = key.charAt(0).toUpperCase() + key.charAt(1).toUpperCase()

            }
            pool.query('SELECT * from public."Products" WHERE brand=$1 AND price>=$2 AND price<=$3 AND category=$4', [caps,prices[0], prices[1], category], (error, results) => {
                if (error)
                    throw error
                if (results.rows.length !== 0) {
                    results.rows.forEach(
                        row => {
                            resultBrands.push({ row })
                        })
                }
            })
        }
    }
    setTimeout(() => {
        res.send(
            {
                "results": resultBrands
            }
        )
    }, 1000)
}

const getUser = (req,res) => {
    const idUser = req.query.id
    pool.query('SELECT * FROM public."Users" WHERE id_user = $1', [idUser], (error, results) => {
        if (error)
            throw error
        res.send(
            {
                "results": results
            }
        )
    })

}
const getFirst = (req,res) =>{
    pool.query('SELECT * FROM public."Products" WHERE category = $1 LIMIT 2', ["Laptops"], (error, results) => {
        if (error)
            throw error
        res.send(
            {
                "results": results
            }
        )
    })
}

const getSecond = (req,res) =>{
    pool.query('SELECT * FROM public."Products" WHERE category = $1 LIMIT 2', ["Monitors"], (error, results) => {
        if (error)
            throw error
        res.send(
            {
                "results": results
            }
        )
    })
}

const deleteAll = (req, res) =>{
    const userID = req.body.id_user
    pool.query('DELETE FROM public."Cart" WHERE user_id=$1',[userID],(error,results)=>{
        if (error)
            throw error
        res.send(
            {
                "results":results
            }
        )
    })
}

const homePage = (req, res) =>{
    pool.query('SELECT * FROM public."Products" ORDER BY RANDOM() LIMIT 6;',(error,results)=>{
        if (error)
            throw error
        res.send(
            {
                "results":results
            }
        )
    })
    
}

module.exports = {
    login,
    createUser,
    addProduct,
    getLaptops,
    getProduct,
    filter,
    filterMonitors,
    deleteProduct,
    editProduct,
    updateCart,
    getCart,
    deleteFromCart,
    getUser,
    getFirst,
    getSecond,
    deleteAll,
    homePage
}