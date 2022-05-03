import { Container, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import HeaderFooterContainer from '../components/HeaderFooterContainer'
import { makeStyles } from '@material-ui/core'
import RedButton from '../basic/RedButton'
import axios from 'axios'
import GreenButton from '../basic/GreenButton'

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "false",
        minHeight: "36rem",
        display: "flex",
        flexDirection: "column"

    },
    row: {
        display: "flex",
        flexDirection: "row",
        height: "30%",
        width: "100%",
        borderTop: "    1px solid  #d4d4d4",
        borderBottom: "1px solid #d4d4d4",
    },
    brandModel: {
        display: "flex",
        flexDirection: "row",
        fontSize: "30px",
        fontFamily: "League Spartan",
        fontWeight: "bold",
        alignSelf: "center",
        marginLeft:"5%"
    },
    typography: {
        fontSize: "44px",
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: "2%",
        paddingBottom: "5%"
    },
    price: {
        fontSize: "30px",
        alignSelf: "center",
        marginLeft: "5%"
    },
    quantity: {
        display: "flex",
        flexDirection: "row",
        fontSize:"30px",
        alignSelf:"center",
        marginLeft:"5%"
    }
}));

const Cart = () => {
    const [cart,setCart]=useState([])
    var total=0

    React.useEffect(()=>{
        axios('http://localhost:4000/get-cart',{params:{id:localStorage.getItem("user")}})
        .then(res=>setCart(res.data.results.rows))
    },[])


    const classes = useStyles()
    const handleOrder = () =>{
        axios.delete('http://localhost:4000/delete-all',{data:{id_user: localStorage.getItem("user")}})
        .then(res=>{setCart([])
            alert("Order successful!")
        })
    }
    return (
        <HeaderFooterContainer>
            <Container className={classes.container}>
                <Typography className={classes.typography}>Shopping cart</Typography>
                {
                    cart && cart.map((item, index) => {

                        total=total+(item.final_price*item.buy_quantity)
                        return (
                            <div className={classes.row}>
                                <img src={item.image} height="100%" width="20%" />
                                <div className={classes.brandModel}>
                                    <div > {item.brand}</div>
                                    &nbsp;
                                    <div>{item.model}</div>
                                </div>
                                <div className={classes.quantity}>Quantity: {item.buy_quantity}</div>
                                <div className={classes.price}>Price: {(item.final_price*item.buy_quantity).toFixed(2)}lv</div>
                                <RedButton style={{ height: "30%", width: "10%", alignSelf: "center", marginLeft: "10%" }} onClick={() =>{
        axios.delete('http://localhost:4000/delete-from-cart',{data:{id_cart: item.id_cart, id_user: localStorage.getItem("user")}})
        .then(res=>{res.data.results.rows?setCart(res.data.results.rows):setCart([])})
    }}>Remove</RedButton>
                            </div>
                        )
                    })
                }
            {cart.length!==0?
            (<div style={{display:"flex", flexDirection:"row", marginTop:"2%"}}>
            <div style={{marginLeft:"60%", fontFamily:"League Spartan", fontWeight:"bold", fontSize:"28px"}}>
                Total price: {total.toFixed(2)} lv
            </div>
            <GreenButton onClick={handleOrder} style={{marginLeft:"5%"}}>Order now</GreenButton>
            </div>):null
}
            </Container>
        </HeaderFooterContainer>
    )
}

export default Cart