import React from "react";
import styles from './Home.module.scss'
import axios from "axios";

const LogoutButton = () =>{

    const handleLogout = () => {
        axios("http://localhost:4000/logout").then((res) => {
          window.location.href = "http://localhost:3000/login";
        });
      };

    return(
        <input
          type="submit"
          value="Изход"
          className={styles.exit}
          onClick={handleLogout}
        />
    )
}

export default LogoutButton