import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GreenButton from '../basic/GreenButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoginInput from '../basic/LoginInput';
import Slide from '@mui/material/Slide';


const useStyles = makeStyles((theme) => ({
    paper: { minWidth: "500px", minHeight: "350px" },
    span:{
        color:"blue",
        cursor:"pointer",
        '&:hover':{
            
        }
    }

}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const LoginDialog = (oLogin, oReg) =>{
    const classes=useStyles()
    const [openLogin, setOpenLogin] = useState(false);
const [openReg, setOpenReg] =useState(false);
const handleClose = () => {
    setOpenLogin(false);
};
    return(
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
                        <div>
                            &nbsp;
                            <LoginInput variant="outlined" label="Username" ></LoginInput>
                            &nbsp;
                            <LoginInput variant="outlined" label="Password" type="password"></LoginInput>
                            &nbsp;
                           <span className={classes.span} onClick={() => { setOpenReg(true); setOpenLogin(false);}}>No account? Sign up here!</span>
                            <a href={"register"}>Forgot password? </a>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GreenButton variant="outlined" onClick={handleClose}>Login</GreenButton>
                    <GreenButton variant="outlined" onClick={handleClose}>Back</GreenButton>
                </DialogActions>
            </Dialog>
    )
}

export default LoginDialog