import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import logo from "./logo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  axios.defaults.withCredentials = true;

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleLogin = async (e) => {
    if (email.length !== 0 && pass.length !== 0) {
      e.preventDefault();
      axios("http://localhost:4000/login", {
        params: { email: email, pass: pass },
      }).then((res) => {
        if (res.data.code === 200) {
          window.location.href = "http://localhost:3000/";
        } else {
          alert("Грешен имейл или парола");
        }
      });
    } else {
      alert("Моля, попълнете всички полета");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logodiv}>
        <img src={logo} className={styles.logo} />
      </div>
      <div>
        <div>
          <label className={styles.label} htmlFor="email">
            Имейл:
          </label>
        </div>
        <input
          type="email"
          value={email}
          onChange={handleEmail}
          className={styles.input}
          required
        />
      </div>
      <div>
        <div>
          <label className={styles.label} htmlFor="password">
            Парола:
          </label>
        </div>
        <input
          type="password"
          value={pass}
          onChange={handlePass}
          className={styles.input}
          required
        />
      </div>
      <div>
        <input
          type="submit"
          value="Вход"
          onClick={handleLogin}
          className={styles.submitButton}
        />
      </div>
      <Link to={{ pathname: `/register` }} className={styles.link}>
        Нямате профил? Регистрирайте се сега
      </Link>
      <div>
        <Link to={{ pathname: `/forgot` }} className={styles.link}>
          Забравена парола
        </Link>
      </div>
    </div>
  );
};

export default Login;
