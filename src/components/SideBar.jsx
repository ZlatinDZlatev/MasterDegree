import React, { useState } from 'react'
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    sidebarLink: {
        textDecoration:"none",
     
        
    },
    typography:{
        fontFamily: "League Spartan",
        fontWeight:"bold",
        color:"#23ad3e",
        paddingBottom:"10px",
        fontSize:"24px",
        border:"2px",
        borderColor:"#23ad3e",
        borderStyle:"outset",
        borderTop:"0px",
        textAlign:"center",
        '&:hover':{
            color:"white",
            backgroundColor:"#23ad3e"
        }
    },
    sidebar:{
        width: "150%",
        height: "15%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly"
    }
}))

function Sidebar() {
    const classes=useStyles()

    return (
        <div>
            <div className={classes.sidebar}>
                {SidebarData.map((item, index) => {
                    return (
                     <Link to={item.path} className={classes.sidebarLink}>
                        <Typography className={classes.typography}>{item.title}</Typography>
                    </Link> 
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;