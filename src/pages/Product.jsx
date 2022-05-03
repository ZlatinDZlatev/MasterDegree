import React, { useState } from 'react'
import HeaderFooterContainer from '../components/HeaderFooterContainer'
import { makeStyles } from '@material-ui/core/styles';
import { Container, FormControlLabel } from '@material-ui/core'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import GreenButton from '../basic/GreenButton';
import WhiteCart from '../basic/WhiteCart';
import LoginInput from '../basic/LoginInput';
import GreenCheckbox from '../basic/GreenCheckbox';
import RedButton from '../basic/RedButton';
import YellowButton from '../basic/YellowButton';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
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
        height: "100%",
        width: "100%",
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
    title: {
        fontWeight: "bold",
        fontFamily: "League Spartan",
        fontSize: "44px",
        justifyContent: "center",
        display: "flex",
        paddingTop: "3%"
    },
    image: {
        border: "1px solid",
        marginRight: "5%",
        marginTop: "6%"
    },
    price: {

        border: "3px",
        borderStyle: "solid",
        borderColor: "#23ad3e",
        borderRadius: "50px",
        width: "200%",
        height: "40%",
        fontSize: "30px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        marginTop: "6%"
    },
    description: {
        width: "300%",
        height: "40%",
        backgroundColor: "white",
        border: "none",
        fontFamily: "League Spartan",
        fontSize: "16px",
        resize: "none",
        marginTop: "6%"
    }
}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Product = () => {
    const {  formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });
    const classes = useStyles()
    let { id } = useParams();
    const navigate = useNavigate();
    const [warranty, setWarranty] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [maxQuantity, setMaxQuantity] = useState(1)
    const [openEdit, setOpenEdit]=useState(false)
    const [product, setProduct] = useState({ id_product: 0, brand: " ", model: " ", price: 0.0, category: " ", descr: " ", offers_id: 0, image: " " })
    const handleDelete = () => {
        console.log(id)
        axios.delete('http://localhost:4000/delete-product', { data: { id_product: id } })
            .then(
                res => {
                    console.log(res.results)
                    navigate('/products')
                }
            )
    }
  
    async function updateCart () {
        if(localStorage.getItem("user")){
        axios.post('http://localhost:4000/update-cart',{productID: product.id_product, userID: localStorage.getItem("user"), quantity: quantity, price: product.price})
        .then(
            res=>{
            navigate('/cart')
            }
            )
        }
        else {
            alert("Please log in your account!")
        }
    }
    const handleWarranty = () => {
        setWarranty(!warranty)
        if(warranty===false){
            setProduct({...product,  price:parseFloat(product.price) + 50.00})
        }
        else{
            setProduct({...product,  price:parseFloat(product.price) - 50.00})
        }
    }
    const handleClose = () => {
        setOpenEdit(false)
    }
    const handleEdit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:4000/edit-product',{product: product})
        .then(
            res=>{
                console.log(res)
                handleClose();
            }
        )
    }
    React.useEffect(() => {
        axios('http://localhost:4000/get-product', { params: { id: id } })
            .then(response => {
                console.log(response)
                setProduct(response.data.results.rows[0])
                setMaxQuantity(response.data.results.rows[0].quantity)
                setQuantity(1)
            })
    }, [])
    return (
        <HeaderFooterContainer>
            <Container className={classes.container}>
                <div className={classes.title}>
                    {product.brand}
                    &nbsp;
                    {product.model}
                </div>
                {
                    localStorage.getItem('user') === '1' ?
                        (
                            <div>
                                <YellowButton variant='outlined' onClick={()=>{setOpenEdit(true)}}>Edit</YellowButton>
                                <RedButton variant='outlined' onClick={handleDelete}>Delete</RedButton>
                                <Dialog
                                    classes={{ paper: classes.paper }}
                                    open={openEdit}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>{"Edit this product"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            <form onSubmit={handleEdit} name="product" id='3'>
                                                <div className={classes.column}>
                                                    <LoginInput
                                                        variant="outlined"
                                                        label="Brand"
                                                       name="brand"

                                                        value={product.brand}
                                                        onChange={(event)=>{setProduct({...product,[event.target.name]:event.target.value})}}
                                                        error={!!errors.brand}
                                                        helperText={errors?.brand?.message}
                                                    />
                                                    &nbsp;

                                                    <LoginInput
                                                        variant="outlined"
                                                        label="Model"
                                                        type="text"
                                                        name="model"
                                                        value={product.model}
                                                        onChange={(event)=>{setProduct({...product,[event.target.name]:event.target.value})}}
                                                        error={!!errors.model}
                                                        helperText={errors?.model?.message} />
                                                    &nbsp;
                                                    <LoginInput
                                                        variant="outlined"
                                                        label="Price"
                                                        type="number"
                                                        name="price"
                                                        value={product.price}
                                                        onChange={(event)=>{setProduct({...product,[event.target.name]:event.target.value})}}
                                                        InputProps={
                                                            {
                                                                inputProps: {
                                                                    step: 0.01, min: 0, max: 100000
                                                                }
                                                            }
                                                        }
                                                        error={!!errors.price}
                                                        helperText={errors?.price?.message} />
                                                    &nbsp;
                                                    <LoginInput
                                                        variant="outlined"
                                                        label="Quantity"
                                                        type="number"
                                                        name="quantity"
                                                        InputProps={
                                                            {
                                                                inputProps: {
                                                                    step: 1, min: 1, max: 1000
                                                                }
                                                            }
                                                        }
                                                        value={product.quantity}
                                                        onChange={(event)=>{setProduct({...product,[event.target.name]:event.target.value})}}
                                                        error={!!errors.quantity}
                                                        helperText={errors?.quantity?.message} />
                                                    &nbsp;
                                                    <LoginInput
                                                        variant="outlined"
                                                        label="Category"
                                                        type="text"
                                                        value={product.category}
                                                        name="category"
                                                        onChange={(event)=>{setProduct({...product,[event.target.name]:event.target.value})}}
                                                        error={!!errors.category}
                                                        helperText={errors?.category?.message} />
                                                    &nbsp;
                                                    <LoginInput
                                                        variant="outlined"
                                                        label="Description"
                                                        type="text"
                                                        name="descr"
                                                        value={product.descr}
                                                        onChange={(event)=>{setProduct({...product,[event.target.name]:event.target.value})}}
                                                        error={!!errors.description}
                                                        helperText={errors?.description?.message} />
                                                    &nbsp;
                                                    <LoginInput
                                                        variant="outlined"
                                                        label="Image URL"
                                                        type="text"
                                                        value={product.image}
                                                        name="image"
                                                        onChange={(event)=>{setProduct({...product,[event.target.name]:event.target.value})}}
                                                        error={!!errors.image}
                                                        helperText={errors?.image?.message} />
                                                    &nbsp;
                                                    <div>
                                                        <GreenButton variant="outlined" type="submit">Add</GreenButton>
                                                        <GreenButton variant="outlined" onClick={handleClose}>Back</GreenButton>
                                                    </div>
                                                </div>
                                            </form>
                                        </DialogContentText>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ) : null
                }
                <div className={classes.row}>
                    <img src={product.image} height="30%" width="30%" className={classes.image} />
                    <textarea rows={50} disabled value={product.descr} className={classes.description} />
                    <div className={classes.price}>
                        <div style={{ alignSelf: "center" }}>Price: {product.price} lv</div>
                        <div style={{ fontSize: "16px", paddingLeft: "25%" }}>
                            <div className={classes.row}>
                                <div style={{ paddingTop: "4%" }}>
                                    Quantity:
                                </div>
                                <LoginInput
                                    variant="outlined"
                                    type="number"
                                    InputProps={
                                        {
                                            inputProps: {
                                                step: 1, min: 1, max: maxQuantity
                                            }
                                        }
                                    }
                                    value={quantity}
                                    onChange={(e) => {
                                        setQuantity(e.target.value)
                                        console.log(quantity)
                                        setProduct({...product,quantity: quantity})
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ marginLeft: "13%" }}>
                            <FormControlLabel
                                control={<GreenCheckbox checked={warranty} onChange={handleWarranty}/>}
                                label="Additional warranty 1 year? Price: 50.00 lv" />
                        </div>
                        <GreenButton onClick={updateCart} style={{ width: "50%", height: "15%", alignSelf: "center" }} startIcon={<WhiteCart />}>Add to cart </GreenButton>
                    </div>
                </div>

            </Container>
        </HeaderFooterContainer>
    )
}

export default Product
