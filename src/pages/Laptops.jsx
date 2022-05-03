import { Container, Slider } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import HeaderFooterContainer from '../components/HeaderFooterContainer'
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import axios from 'axios';
import PriceFilter from '../components/PriceFilter';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "false",
        minHeight: "36rem"
    },
    gridContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5rem",
        paddingTop: "10%",
        paddingLeft: "10%"
    },
    row:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    card: {
        '&:hover': {
            transform: "scale(1.2)"
        }
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    price:{
        fontWeight:"bold",
        fontFamily:"League Spartan"
    }
}))


const Laptops = () => {
    const classes=useStyles()
    const [price, setPrice] = useState(
   [200,3000]
    );
    const [checkBoxesBrand, setCheckBoxesBrand] = useState({
        acer: true,
        apple: true,
        asus: true,
        dell: true,
        hp: true,
        lenovo:true,
        msi:true
      });
    const [laptops, setLaptops]=useState([{id_product:0, brand: " ", model:" ", price:0.0, category:" ", descr:" ", offers_id:0, image:" ", quantity:0}])
    React.useEffect(()=>{
         
        axios("http://localhost:4000/filter", {params:{price:price,
            
        brand: checkBoxesBrand}})
       .then(res=>{sessionStorage.setItem("laptops",JSON.stringify(res.data.results)
       )
       setLaptops(JSON.parse(sessionStorage.getItem("laptops")))
    })
    
    },[checkBoxesBrand,price])
    return (
        <HeaderFooterContainer>
            <Container className={classes.container}>
           <PriceFilter price={price} setPrice={setPrice} />
                <div className={classes.row}>
                    <FilterBar checkBoxesBrand={checkBoxesBrand} setCheckBoxesBrand={setCheckBoxesBrand} />
                    <div className={classes.gridContainer}>
                        {sessionStorage.getItem("laptops")&&JSON.parse(sessionStorage.getItem("laptops")).map((item, index) => {
                            const url=item.row.id_product
                            console.log(item)
                            return (
                                <Card sx={{ maxWidth: 200 }} className={classes.card}>
                                    <Link to={{pathname:`/products/${url}`}}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            width="200"
                                            image={item.row.image}
                                            alt="/"
                                        />
                                    </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.row.brand}
                                        </Typography>
                                        <div className={classes.column}>
                                        <div>
                                        {item.row.model}
                                        </div>
                                        <div className={classes.price}>
                                        {item.row.price}
                                        </div>
                                        
                                        </div>
                                    </CardContent>
                                </Card>

                            );
                        })}
                    </div>
                    <div>

                    </div>
                    <div>                 
</div>
                </div>
            </Container>
        </HeaderFooterContainer>
    )
}

export default Laptops