import { Container } from '@material-ui/core'
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
import FilterBarMonitors from '../components/FilterBarMonitors';

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


const Monitors = () => {
    const classes=useStyles()
    const [price, setPrice] = useState(
   [200,3000]
    );
    const [checkBoxesBrand, setCheckBoxesBrand] = useState({
        acer: true,
        asus: true,
        dell: true,
        hp: true,
        lg:true,
        philips:true,
        samsung:true
      });
    React.useEffect(()=>{    
        axios("http://localhost:4000/filter-monitors", {params:{price:price,        
        brand: checkBoxesBrand}})
       .then(res=>sessionStorage.setItem("monitors",JSON.stringify(res.data.results)))
    },[checkBoxesBrand,price])
    return (
        <HeaderFooterContainer>
            <Container className={classes.container}>
           <PriceFilter price={price} setPrice={setPrice} />
                <div className={classes.row}>
                    <FilterBarMonitors checkBoxesBrand={checkBoxesBrand} setCheckBoxesBrand={setCheckBoxesBrand} />
                    <div className={classes.gridContainer}>
                        {sessionStorage.getItem("monitors")&&JSON.parse(sessionStorage.getItem("monitors")).map((item, index) => {
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

export default Monitors