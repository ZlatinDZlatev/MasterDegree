import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import HeaderFooterContainer from '../components/HeaderFooterContainer'
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardViewItems } from '../CardView/cardview'
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "false",
        minHeight: "72vh",
    },
    gridContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5rem",
        paddingTop: "10%",
        paddingLeft: "10%"
    },
    card: {
        '&:hover': {
            transform: "scale(1.2)"
        }

    },
    media:{
        height:"140px",
        maxWidth:"200px"
    }
}))



const Home = () => {
    const classes = useStyles()
    const [items,setItems]=useState([])
    useEffect(()=> {
        axios('http://localhost:4000/homepage')
        .then(res=>setItems(res.data.results.rows))
        .catch(err=>console.log(err))
    },[])

    return (
        <div>
            <HeaderFooterContainer>
                <Container className={classes.container}>
                    <div className={classes.gridContainer}>
                        {items && items.map((item, index) => {
                            return (
                                <Card sx={{ maxWidth: 300 }} className={classes.card}>
                                    <Link to={{pathname:`/products/${item.id_product}`}}>
                                    <img src={item.image} alt="" height={140} width={200} />
                                    </Link>
                                    <CardContent >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.brand}
                                        </Typography>
                                    </CardContent>
                                </Card>

                            );
                        })}
                    </div>
                </Container>
            </HeaderFooterContainer>
        </div>
    )
}

export default Home