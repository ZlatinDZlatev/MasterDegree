import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styles from "./Login.module.scss";
import logo from "./logo.jpg";

const Register = () => {
  axios.defaults.withCredentials = true;

  const handleRegister = () => {
    if (email.length === 0 || pass.length === 0 || repPass.length === 0) {
      alert("Моля попълнете всички полета");
    } else if (pass === repPass) {
      axios
        .post("http://localhost:4000/register", { email: email, pass: pass })
        .then((res) => {});
    } else {
      alert("Паролите не съвпадат!");
    }
  };
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repPass, setRepPass] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleRepPass = (e) => {
    setRepPass(e.target.value);
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
          id="email"
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
          </label>{" "}
        </div>
        <input
          type="password"
          id="password"
          value={pass}
          onChange={handlePass}
          className={styles.input}
          required
        />
      </div>
      <div>
        <div>
          <label className={styles.label}>Повтори паролата:</label>
        </div>
        <input
          type="password"
          id="reppass"
          value={repPass}
          onChange={handleRepPass}
          className={`${styles.input} ${styles.fullWidth}`}
          required
        />
      </div>
      <div>
        <input
          type="submit"
          value="Регистрация"
          className={styles.submitButton}
          onClick={handleRegister}
        />
      </div>
      <Link to={{ pathname: `/login` }} className={styles.link}>
        Вече имате профил? Влезте в системата
      </Link>
    </div>
  );
};

export default Register;
