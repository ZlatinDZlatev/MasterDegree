import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './SideBar';
import { ThemeContext } from "../Context/ThemeContext";
import  {  ThemeProvider  }  from  "../Context/ThemeContext";
import HamburgerButton from '../basic/HamburgerButton'
import useMediaQuery from '@mui/material/useMediaQuery';



const useStyles = makeStyles((theme) => ({
    container:{
        width: "100%",
        height: "100%",
        margin: "0px",
        padding: "0px",
        overflowX: "hidden"
        },
        row:{
            display:"flex", 
            flexDirection:"row",
            transform: "translateY(-2px)"

        },
       
}));

const HeaderFooterContainer = ({ children }) => {
    const classes=useStyles()
    const { toggle, toggleFunction } = React.useContext(ThemeContext);
    const matches = useMediaQuery('(min-width:800px)');
    return (
        <ThemeProvider>
        <>
        <div className={classes.container}>
            <Header  button={<HamburgerButton onClick={toggleFunction}/>}/>
            <div className={classes.row}>
            {toggle && !matches ? <Sidebar /> : null}
                {children}
            </div>
            <Footer/>
            </div>
        </>
        </ThemeProvider>
    );
}

export default HeaderFooterContainer