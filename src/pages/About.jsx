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
        width:"80%",
        fontSize:"26px",
        fontFamily:"Lucida Console",
        margin: "auto"    
}
}))



const About = () => {
    const classes = useStyles()
    return (
        <div>
            <HeaderFooterContainer title="Contacts">
                <Container maxWidth="false" className={classes.container}>
                    <div className={classes.contacts}>
                        <div style={{fontWeight:"bold"}}>
                        About Techsim   
                        </div>
                        <div style={{fontSize:"18px"}}>
                            Techsim is a relaive new company in the computer branch. Except online shop we are about to build also a non-virtual shop in the near future. 
                        </div>
                        &nbsp;
                        <div style={{fontWeight:"bold"}}>
                            What do we offer?
                        </div>
                        <div style={{fontSize:"18px"}}>
                            In our online shop there is a huge variety of computer configuration parts and laptops. 
                            To be more attractive we also have special offers and discounts. We want to offer you the best prices and we are working on it constantly.
                        </div>
                        &nbsp;
                        <div style={{fontWeight:"bold"}}>
                            Who are we?
                        </div>
                        <img src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1-705x705.png" height={200} width={200} />
                        <div style={{fontSize:"18px"}}>
                            I am Simeon Atanasov. I am 19 years old. I am studying at Vocational high school in electrical engineering in Varna.
                            I am part of Techsim since 2021. I decided to be part of this team, because I have interests in the technical area and I want to grow up as a programmer.
                        </div>                         
                    </div>
                </Container>
            </HeaderFooterContainer>
        </div>
    )
}

export default About