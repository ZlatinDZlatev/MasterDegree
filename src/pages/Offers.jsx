import { Container, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import HeaderFooterContainer from '../components/HeaderFooterContainer'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import GreenButton from '../basic/GreenButton';
import WhiteCart from '../basic/WhiteCart'
import { useNavigate } from 'react-router-dom';


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
        height: "45%",
        width: "150%",
        borderTop: "    1px solid  #d4d4d4",
    },
    brandModel: {
        display: "flex",
        flexDirection: "row",
        fontSize: "30px",
        fontFamily: "League Spartan",
        fontWeight: "bold",
        alignSelf: "center",
        marginLeft: "5%"
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
        fontSize: "30px",
        alignSelf: "center",
        marginLeft: "5%"
    },
    offer: {
        display: "flex",
        flexDirection: "row",
        border:"1px solid",
        marginBottom:"3%"
    }
}));

const Offers = () => {
    const classes = useStyles()
    const [first, setFirst] = useState([])
    const [second, setSecond] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios('http://localhost:4000/get-first')
            .then(res => setFirst(res.data.results.rows))

        axios('http://localhost:4000/get-second')
            .then(res => setSecond(res.data.results.rows))
    }, [])
    return (
        <HeaderFooterContainer>
            <Container className={classes.container}>
                <Typography className={classes.typography}>Offers</Typography>
                {
                    first && second && first.map((item, index) => {
                        return (
                            second.map((row, i) => {
                                return (
                                    index === i ?
                                        <div className={classes.offer}>
                                            <div style={{paddingRight:"30%"}}>
                                            <div className={classes.row}>
                                                <img src={item.image} style={{paddingLeft:"1%", alignSelf:"center"}} height="100%" width="20%" />
                                                <div className={classes.brandModel}>
                                                    <div > {item.brand}</div>
                                                    &nbsp;
                                                    <div>{item.model}</div>
                                                </div>
                                                <div className={classes.quantity}>Quantity: 1</div>
                                                <div className={classes.price}>Price: {item.price}lv</div>
                                            </div>
                                            <div className={classes.row}>
                                                <img src={row.image} style={{paddingLeft:"1%", alignSelf:"center"}} height="80%" width="20%" />
                                                <div className={classes.brandModel}>
                                                    <div > {row.brand}</div>
                                                    &nbsp;
                                                    <div>{row.model}</div>
                                                </div>
                                                <div className={classes.quantity}>Quantity: 1</div>
                                                <div className={classes.price}>Price: {row.price}lv</div>
                                            </div>
                                            </div>
                                            <div style={{width:"20%",height:"75%", display:"flex", flexDirection:"column",justifyContent: "space-evenly",fontFamily:"League Spartan", fontSize: "18px", paddingTop:"3%"}}>
                                            <div style={{textDecoration:"line-through"}}>Total price: {parseFloat(row.price)+parseFloat(item.price)}lv</div>
                                            <div style={{color:"#ed0909"}}>Discount: 20%</div>
                                            <div style={{fontSize:"24px", fontWeight:"bold", marginBottom:"8%"}}>Final price:{(0.8*(parseFloat(row.price)+parseFloat(item.price))).toFixed(2)}lv</div>
                                            <GreenButton onClick={ ()=>{
                                                if(localStorage.getItem("user")) {
                                                    axios.post('http://localhost:4000/update-cart',{productID: item.id_product, userID: localStorage.getItem("user"), quantity: 1, price: parseFloat(0.8*item.price)})
                                                    axios.post('http://localhost:4000/update-cart',{productID: row.id_product, userID: localStorage.getItem("user"), quantity: 1, price: parseFloat(0.8*row.price)})
                                                    .then(navigate('/cart'))
                                                }
                                                else {
                                                    alert("Please log in your account!")
                                                }
                                            } } style={{ width: "70%", height: "15%" }} startIcon={<WhiteCart />}>Add to cart </GreenButton>

                                            </div>
                                        </div> : null
                                )
                            })
                        )
                    })
                }

            </Container>
        </HeaderFooterContainer>
    )
}

export default Offers