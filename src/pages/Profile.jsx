import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import HeaderFooterContainer from '../components/HeaderFooterContainer'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "false",
        minHeight: "36rem",
        display: "flex",
        flexDirection: "column",
    },
    info: {
        fontFamily: "League Spartan",
        fontSize: "30px",
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    image: {
        border: "1px solid",
        marginRight: "5%",
        marginLeft: "25%"
    },
}));




const Profile = () => {
    const [user, setUser] = useState({})
    const id = localStorage.getItem("user")
    React.useEffect(()=>{
         
        axios("http://localhost:4000/get-user", {params:{id: id }})
       .then(response => {
        setUser(response.data.results.rows[0])
        console.log(response.data.results.rows[0])
    })
    
    },[])
    const classes = useStyles()
    return (
        <div>
            <HeaderFooterContainer>
                <Container className={classes.container}>
                    <div style={{fontFamily:"League Spartan", fontSize:"44px", marginTop:"2%", marginBottom:"4%", alignSelf:"center"}}>User Information</div>
                    <div className={classes.row}>
                    <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} height="60%" width="20%" className={classes.image} />
                    <div className={classes.info}>
                    <div>Username: {user.username} </div>
                    &nbsp;
                    <div>Name: {user.first_name} {user.last_name}</div>
                    &nbsp;
                    <div>Email: {user.email} </div>
                    &nbsp;
                    <div>Address: {user.address} </div>
                    &nbsp;
                    <div>Phone number: {user.number} </div>
                    </div>
                    </div>
                </Container>
            </HeaderFooterContainer>
        </div>
    )
}

export default Profile