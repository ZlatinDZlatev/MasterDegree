import { Container } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import HeaderFooterContainer from '../components/HeaderFooterContainer'
import { MailOutline, Receipt, RingVolume } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "false",
        minHeight: "36rem",
    },
    contacts:{
        display: "flex", 
        flexDirection:"column", 
        justifyContent: "space-evenly", 
        alignItems: "center", 
        height:"100%",
        fontSize:"26px",
        fontFamily:"Lucida Handwriting"
    }
}))



const Contacts = () => {
    const classes = useStyles()
    return (
        <div>
            <HeaderFooterContainer title="Contacts">
                <Container maxWidth="false" className={classes.container}>
                    <div className={classes.contacts}>
                        <div >
                            <RingVolume />
                            Phone number: +359 888 123 456
                            <div >Monday-Friday: 10:00-19:00</div>
                            <div >Saturday: 10:00-16:00</div>
                        </div>
                        <div >
                            <MailOutline />
                            E-Mail: techsim@gmail.com
                        </div>
                        <div>
                            <Receipt />
                            Address for correspondence:
                        </div>
                        <div >
                            Simeon Atanasov
                            <div>"Tsanko Dyustabanov" str. 30</div>
                            <div>Varna, 9010</div>
                            <div> Bulgaria</div>
                        </div>
                    </div>
                </Container>
            </HeaderFooterContainer>
        </div>
    )
}

export default Contacts