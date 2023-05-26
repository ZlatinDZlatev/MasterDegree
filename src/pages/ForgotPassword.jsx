import React from 'react'
import axios from 'axios'
import styles from './Login.module.scss'

const ForgotPassword = () => {

    const [email, setEmail] = React.useState("")
    axios.defaults.withCredentials=true
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = () => {
        if(email.length !== 0 ){
        axios.post("http://localhost:4000/forgot",{email: email})
        .then(res=>console.log(res))
        }
        else{
            alert("Моля въведете имейл")
        }
    }


    return(
        <div className={styles.container}>
        <div>Забравена парола</div>
        <div>
            <div>
           <label htmlFor='email' className={styles.label}> Въведете имейл, на който да се изпрати линк за смяна на паролата: </label>
           </div>
            <input type="email" id="email" value={email} onChange={handleEmail} className={styles.input} />
        </div>
        <div>
            <input type="submit" value="Изпрати" onClick={handleSubmit} className={styles.submitButton} />
        </div>
        </div>
    )
}

export default ForgotPassword