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

const Register = () =>{
    <Dialog
                classes={{ paper: classes.paper }}
                open = {openReg}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickCloseReg}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Register your account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div>
                            &nbsp;
                            <LoginInput variant="outlined" label="Username" ></LoginInput>
                            &nbsp;
                            <LoginInput variant="outlined" label="Email"  ></LoginInput>
                            &nbsp;
                            <LoginInput variant="outlined" label="Password" type="password"></LoginInput>
                            &nbsp;
                            <LoginInput variant="outlined" label="Repeat Password" type="password" ></LoginInput>
                            &nbsp;
                            <span onClick={() => { handleClickOpen(); handleClickCloseReg();}}>Already have an account? Sign in!</span>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GreenButton variant="outlined"onClick={handleClickCloseReg}>Register</GreenButton>
                    <GreenButton variant="outlined" onClick={handleClickCloseReg}>Back</GreenButton>
                </DialogActions>
            </Dialog>
}