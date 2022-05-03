import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    link1:{
        color: "white",
        fontFamily:"League Spartan",
        textDecoration:"none",
        "&:hover": {
        color: "white"
    },
    "&:visited": {
        color: "white"
    }
    }
}))
const NavLink=({ title, href })=>{

    const classes= useStyles()

    return(
        <Link to={href} className={ classes.link1 } >
            {title}
        </Link>
       
    )
}

export default NavLink