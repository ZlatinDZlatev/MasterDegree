import { Container } from '@material-ui/core'
import React from 'react'
import HeaderFooterContainer from '../components/HeaderFooterContainer'
import { makeStyles } from '@material-ui/core/styles';
import { CardViewItems } from '../CardView/cardview'
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import greenplus from '../cardviewimages/plus_button.png'
import GreenButton from '../basic/GreenButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm } from "react-hook-form";
import LoginInput from '../basic/LoginInput';
import axios from 'axios';

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
    card: {
        '&:hover': {
            transform: "scale(1.2)"
        }
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Products = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });
    const classes = useStyles()
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };
    const onSubmit = (data) => {
        console.log(data)
        axios.post('http://localhost:4000/add-product',
        {brand: data.brand, model:data.model, price: data.price, quantity: data.quantity,
        category: data.category, image: data.image, description: data.description},{headers: {
            'Content-Type': 'application/json',
        }})
        .then(response=>{
            handleClose();
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <HeaderFooterContainer>
                <Container className={classes.container}>
                    <div className={classes.gridContainer}>
                        {CardViewItems.map((item, index) => {
                            return (
                                <Card sx={{ maxWidth: 245 }} className={classes.card}>
                                    <Link to={item.path}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item.image}
                                            alt="/"
                                        />
                                    </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                </Card>

                            );
                        })}
                        {localStorage.getItem('user') === '1' ?
                            (
                                <div>
                                    <span onClick={handleClickOpen}>
                                        <Card sx={{ maxWidth: 245 }} className={classes.card}>
                                            <CardMedia
                                                component="img"
                                                image={greenplus}
                                                height="140"
                                                alt="/"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Add a product
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </span>
                                    <Dialog
                                        classes={{ paper: classes.paper }}
                                        open={openDialog}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogTitle>{"Add a new product"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-slide-description">
                                                <form onSubmit={handleSubmit(onSubmit)} name="product" id='3'>
                                                    <div className={classes.column}>
                                                        <LoginInput
                                                            variant="outlined"
                                                            label="Brand"
                                                            {...register("brand",
                                                                {
                                                                    required: "Please fill in brand",
                                                                }
                                                            )
                                                            }
                                                            error={!!errors.brand}
                                                            helperText={errors?.brand?.message}
                                                        />
                                                        &nbsp;

                                                        <LoginInput
                                                            variant="outlined"
                                                            label="Model"
                                                            type="text"
                                                            {...register("model",
                                                                {
                                                                    required: "Please fill in model",
                                                                }
                                                            )
                                                            }
                                                            error={!!errors.model}
                                                            helperText={errors?.model?.message} />
                                                        &nbsp;
                                                        <LoginInput
                                                            variant="outlined"
                                                            label="Price"
                                                            type="number"
                                                            InputProps={
                                                                {
                                                                    inputProps: {
                                                                        step: 0.01, min: 0, max: 100000
                                                                    }
                                                                }
                                                            }
                                                            {...register("price",
                                                                {
                                                                    required: "Please fill in price",
                                                                }
                                                            )
                                                            }
                                                            error={!!errors.price}
                                                            helperText={errors?.price?.message} />
                                                        &nbsp;
                                                        <LoginInput
                                                            variant="outlined"
                                                            label="Quantity"
                                                            type="number"
                                                            InputProps={
                                                                {
                                                                    inputProps: {
                                                                        step: 1, min: 1, max: 1000
                                                                    }
                                                                }
                                                            }
                                                            {...register("quantity",
                                                                {
                                                                    required: "Please fill in quantity",
                                                                }
                                                            )
                                                            }
                                                            error={!!errors.quantity}
                                                            helperText={errors?.quantity?.message} />
                                                            &nbsp;
                                                        <LoginInput
                                                            variant="outlined"
                                                            label="Category"
                                                            type="text"
                                                            {...register("category",
                                                                {
                                                                    required: "Please fill in category",
                                                                }
                                                            )
                                                            }
                                                            error={!!errors.category}
                                                            helperText={errors?.category?.message} />
                                                            &nbsp;
                                                            <LoginInput
                                                            variant="outlined"
                                                            label="Description"
                                                            type="text"
                                                            {...register("description",
                                                                {
                                                                    required: "Please fill in description",
                                                                }
                                                            )
                                                            }
                                                            error={!!errors.description}
                                                            helperText={errors?.description?.message} /> 
                                                            &nbsp;
                                                            <LoginInput
                                                            variant="outlined"
                                                            label="Image URL"
                                                            type="text"
                                                            {...register("image",
                                                                {
                                                                    required: "Please fill in image",
                                                                }
                                                            )
                                                            }
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
                    </div>
                </Container>
            </HeaderFooterContainer>
        </div>
    )
}

export default Products