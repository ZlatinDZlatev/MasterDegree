import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faInstagram,
    faYoutube,
    faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#A3A3A3",
        minHeight: "6rem",
        display: "flex",
        flexDirection: "column",
        marginTop:"3%"

    },
    icons: {

        display: "flex",
        justifyContent: "center",
    },
    center: {
        display: "flex",
        justifyContent: "space-evenly",
        width: "20%",
        marginTop: "1%"
    },
    youtube: {
        color: "#eb3223",
        '&:hover': {
            transform: "translateY(-2px)"
        }
    },
    facebook: {
        color: "#3b5998",
        '&:hover': {
            transform: "translateY(-2px)"
        }
    },
    twitter: {
        color: "#49a1eb",
        '&:hover': {
            transform: "translateY(-2px)"
        }
    },
    instagram: {
        color: "#8a3ab9",
        '&:hover': {
            transform: "translateY(-2px)"
        }
    },
    line: {
        height: "1px",
        backgroundColor: "black",
        width: "40%",
        alignSelf: "center"
    },
    botnav: {

        display: "flex",
        justifyContent: "space-evenly",
        width: "30%",
        marginTop: "1%"

    }
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.footer}>
            <div className={classes.icons}>
                <div className={classes.center}>
                    <a href="https://www.youtube.com/" target="_blank" className={classes.youtube}>
                        <FontAwesomeIcon icon={faYoutube} size="2x" />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" className={classes.facebook}>
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" className={classes.twitter}>
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" className={classes.instagram}>
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                </div>

            </div>
            <div className={classes.line}></div>
            <div className={classes.icons}>
                <div className={classes.botnav}>
                    <div>Terms of use</div>
                    <div>FAQ</div>
                    <div>Contact us</div>
                </div>
                
            </div>
            <div style={{alignSelf:"center"}}> © 2022 Technosim All Rights Reserved.</div>
        </div>
    )
}

export default Footer