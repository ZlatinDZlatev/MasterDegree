import React from 'react'
import NavLink from './NavLink';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WhiteTextField from '../basic/WhiteTextField';
import WhiteSearch from '../basic/WhiteSearch';
import { InputAdornment } from '@material-ui/core';
import WhiteCart from '../basic/WhiteCart';
import WhiteButton from '../basic/WhiteButton';
import GreenButton from '../basic/GreenButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm } from "react-hook-form";
import LoginInput from '../basic/LoginInput';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    header: {
        backgroundImage: "linear-gradient(90deg, #23ad3e, #40DA5F)",

    },

    logo: {
        height: "100%",
        width: "100%",
        paddingLeft: "1%",

    },
    input: {
        color: "#ffffff"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    link: {
        width: "15%",
    },
    navlink: {
        paddingLeft: "1%",
        paddingRight: "5%",
        //формула за динамично изчисляване размера на шрифта
        fontSize: "calc( 6px + (24 - 16) * (100vw - 400px) / (800 - 400) )",
    },
    paper: { minWidth: "500px", minHeight: "350px" },
    wrapper: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    wrapperright: {
        paddingRight: "28%",

    },
    textbox: {
        width: "200%",
        [theme.breakpoints.down(1415)]: {
            width: "100%"
        }
    },
    button: {
        marginTop: "25%",
        marginRight: "2%",
        fontFamily: "League Spartan",

    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        height: "140%"

    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    hyperlink:{
        color:"#0000ee",
        textDecoration:"underline",
        cursor: "pointer"
    }
}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Header = ({ button }) => {
    const classes = useStyles()
    const matches = useMediaQuery('(min-width:800px)');
    const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm({ reValidateMode: 'onSubmit' });
    const [message, setMessage] = React.useState(' ')
    const [regMessage, setRegMessage] = React.useState(' ')
    const [openLogin, setOpenLogin] = React.useState(false);
    
const navigate = useNavigate(); 
const handleProfileOpen = () => {
    navigate('/profile');
}
    const handleClickOpen = () => {
        setOpenLogin(true);
    };
    const logOut = () =>{
        localStorage.removeItem('user')
        window.location.reload(true)

    }
    const onSubmit = (data) => {
        axios('http://localhost:4000/login', { params: { username: data.username, password: data.password } })
            .then(response => {
                if (response.data.code === 200) {
                    localStorage.setItem('user', response.data.user)
                    window.location.reload(true)
                }
                else {
                    setMessage(response.data.message)
                }
            })
            .catch(err => console.log(err))
    }
    const onRegSubmit = (data) => {
        if (data.password === data.reppassword) {
            axios.post('http://localhost:4000/register',
                { username: data.username, password: data.password, email: data.email, address: data.address, number: data.number, firstname: data.firstname, lastname: data.lastname }
            )
                .then(response => {
                    if (response.data.code === 200) {
                        localStorage.setItem('user', response.data.user)
                        window.location.reload(true)
                    }
                    else {
                        setRegMessage(response.data.message)
                    }
                })
        }
        else {
            setRegMessage("Passwords don't match!")
        }
    }
    const handleClose = () => {
        setOpenLogin(false);
    };

    const [openReg, setOpenReg] = React.useState(false);

    const handleClickOpenReg = () => {
        setOpenReg(true);
    };

    const handleClickCloseReg = () => {
        setOpenReg(false);
    };

    return (

        <div className={classes.header}>
            <div className={classes.row}>
                {matches ? <Link to="/" className={classes.link} >
                    <img src={logo} alt="" className={classes.logo} />
                </Link> : button}
                {matches ?
                    <div className={classes.wrapper}>

                        <div className={classes.navlink}>
                            <NavLink title="Products" href="/products" />
                        </div>
                        <div className={classes.navlink}>
                            <NavLink title="Offers" href="/offers" />
                        </div>
                        <div className={classes.navlink}>
                            <NavLink title="About" href="/about" />
                        </div>
                        <div className={classes.navlink}>
                            <NavLink title="Contacts" href="/contacts" />
                        </div>
                    </div> : null}
                <div className={classes.wrapper}>
                    <div className={classes.wrapperright}>
                        <WhiteTextField className={classes.textbox} InputProps={{ className: classes.input, startAdornment: (<InputAdornment position='start'><WhiteSearch /></InputAdornment>) }} placeholder="Search..." variant='outlined' />
                    </div>
                </div>
                <div className={classes.wrapper}>
                    <div>
                        <Link to='/cart'>
                        <WhiteCart fontSize='large' />
                        </Link>
                    </div>
                </div>
                <div className={classes.wrapper}>
                    {
                    localStorage.getItem('user')?
                    (<div className={classes.buttons}>
                        <WhiteButton className={classes.button} onClick={handleProfileOpen}>Profile</WhiteButton>
                        <WhiteButton className={classes.button} onClick={logOut}>Logout</WhiteButton>
                    </div>):
                    (<div className={classes.buttons}>
                        <WhiteButton className={classes.button} onClick={handleClickOpen}>Login</WhiteButton>
                        <WhiteButton className={classes.button} onClick={handleClickOpenReg}>Register</WhiteButton>
                    </div>
                    )
                    }
                </div>

            </div>

            <Dialog
                classes={{ paper: classes.paper }}
                open={openLogin}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Sign in your account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <form onSubmit={handleSubmit(onSubmit)} name="login" id='1'>
                            <div className={classes.column}>
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="Username"
                                    {...register("username",
                                        {
                                            required: "Please fill in your username",
                                        }
                                    )
                                    }
                                    error={!!errors.username}
                                    helperText={errors?.username?.message}
                                />
                                &nbsp;

                                <LoginInput
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    {...register("password",
                                        {
                                            required: "Please fill in your password",
                                        }
                                    )
                                    }
                                    error={!!errors.password}
                                    helperText={errors?.password?.message} />
                                &nbsp;
                                <span className={classes.hyperlink} onClick={() => { handleClickOpenReg(); handleClose(); }}>No account? Sign up!</span>
                                <span className={classes.hyperlink}>Forgot password? </span>
                                &nbsp;
                                <div style={{ color: "red", fontWeight: "bold" }}>  {message} </div>
                                &nbsp;
                                <div>
                                    <GreenButton variant="outlined" type="submit">Login</GreenButton>
                                    <GreenButton variant="outlined" onClick={handleClose}>Back</GreenButton>
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
                classes={{ paper: classes.paper }}
                open={openReg}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickCloseReg}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Register your account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <form onSubmit={handleSubmit2(onRegSubmit)} name="reg" id='2'>
                            <div className={classes.column}>
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="Username"
                                    {...register2("username",
                                        {
                                            required: "Please fill in your username",
                                        }
                                    )
                                    }
                                    error={!!errors2.username}
                                    helperText={errors2?.username?.message}
                                />
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="Email"
                                    {...register2("email",
                                        {
                                            required: "Please fill in your email",
                                        }
                                    )
                                    }
                                    error={!!errors2.email}
                                    helperText={errors2?.email?.message} />
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    {...register2("password",
                                        {
                                            required: "Please fill in your password",
                                        }
                                    )
                                    }
                                    error={!!errors2.password}
                                    helperText={errors2?.password?.message} />
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="Repeat Password"
                                    type="password"
                                    {...register2("reppassword",
                                        {
                                            required: "Please repeat your password",
                                        }
                                    )
                                    }
                                    error={!!errors2.reppassword}
                                    helperText={errors2?.reppassword?.message} />
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="First name"
                                    type="text"
                                    {...register2("firstname",
                                        {
                                            required: "Please fill in your first name",
                                        }
                                    )
                                    }
                                    error={!!errors2.firstname}
                                    helperText={errors2?.firstname?.message} />
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="Last name"
                                    type="text"
                                    {...register2("lastname",
                                        {
                                            required: "Please fill in your last name",
                                        }
                                    )
                                    }
                                    error={!!errors2.lastname}
                                    helperText={errors2?.lastname?.message} />
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="Address"
                                    type="text"
                                    {...register2("address",
                                        {
                                            required: "Please fill in your address",
                                        }
                                    )
                                    }
                                    error={!!errors2.address}
                                    helperText={errors2?.address?.message} />
                                &nbsp;
                                <LoginInput
                                    variant="outlined"
                                    label="Phone number"
                                    type="text"
                                    {...register2("number",
                                        {
                                            required: "Please fill in your phone number",
                                        }
                                    )
                                    }
                                    error={!!errors2.number}
                                    helperText={errors2?.number?.message} />
                                &nbsp;
                                <div style={{ color: "red", fontWeight: "bold" }}>  {regMessage} </div>
                                <span className={classes.hyperlink} onClick={() => { handleClickOpen(); handleClickCloseReg(); }}>Already have an account? Sign in!</span>
                                <div style={{paddingTop:"3%"}}>
                                    <GreenButton variant="outlined" type="submit">Register</GreenButton>
                                    <GreenButton variant="outlined" onClick={handleClickCloseReg}>Back</GreenButton>
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default Header