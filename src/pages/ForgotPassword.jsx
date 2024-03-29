import React from 'react'
import axios from 'axios'
import styles from './Login.module.scss'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

    const [email, setEmail] = React.useState("")
    axios.defaults.withCredentials=true
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = () => {
        if(email.length !== 0 ){
        axios.post("http://localhost:4000/forgot",{email: email})
        .then(alert("Изпратен е имейл за възстановяване на паролата."))
        }
        else{
            alert("Моля въведете имейл")
        }
    }


    return(
        <div className={styles.container}>
        <h3>Забравена парола</h3>
        <div style={{marginTop: "4%", display: "flex", flexDirection: "column"}}>
           <label htmlFor='email' className={styles.label}> Въведете имейл, на който да се изпрати линк за смяна на паролата: </label>
            <input type="email" id="email" value={email} onChange={handleEmail} className={styles.input} />
        </div>
        <div>
            <Link  to={{ pathname: `/login` }}><button className={styles.backButton}>Назад</button></Link>
            <input type="submit" value="Изпрати" onClick={handleSubmit} className={styles.submitButton} />
        </div>
        </div>
    )
}

export default ForgotPassword