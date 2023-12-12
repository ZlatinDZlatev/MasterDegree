import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Recipes.module.scss";
import LogoutButton from "./LogoutButton";

const BrowseRecipes = () => {
  const [recipes, setRecipes] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [recepta, setRecepta] = useState({});

  const fetchMyRecipes = () => {
    axios("http://localhost:4000/fetch-my-recipes").then((res) =>
      setRecipes(res.data.results.rows)
    );
  };

  const fetchAllRecipes = () => {
    axios("http://localhost:4000/fetch-all-recipes").then((res) =>
      setRecipes(res.data.results.rows)
    );
  };

  return (
    <div>
          <div className={styles.nav}>
        <Link to={{ pathname: `/` }} className={styles.navlink}>
          Начална страница
        </Link>
        <Link to={{ pathname: `/diary` }} className={styles.navlink}>
          Дневник
        </Link>
        <Link to={{ pathname: `/recipes` }} className={styles.navlink}>
          Рецепти
        </Link>
        <LogoutButton />
      </div>
      <div className={styles.upnav}>
        <input
          type="submit"
          value="Моите рецепти"
          onClick={fetchMyRecipes}
          className={styles.tabs}
        />
        <input
          type="submit"
          value="Всички рецепти"
          onClick={fetchAllRecipes}
          className={styles.tabs}
        />
      </div>
      <div className={styles.container}>
        {recipes !== null ? (
          <table>
            {recipes.map((item, index) => {
              return (
                <tr>
                  <td>{item.value}</td>
                  <td>
                    {" "}
                    <button
                      className={styles.open}
                      onClick={() => {
                        setIsVisible(true);
                        setRecepta(item);
                      }}
                    >
                      Отвори
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
          <div></div>
        )}
        {isVisible && (
          <div className={styles.popup}>
            <h4>{recepta.title}</h4>
            <div>
              <label className={styles.popuplabel}>Необходими продукти: </label>
              {recepta.recipe.map((item, index) => {
                return (
                  <div>
                    {item.name}: {item.quantity} г
                  </div>
                );
              })}
            </div>
            <div>{recepta.description}</div>
            <div className={styles.macro}>
              <label className={styles.popuplabel}>Количество: </label>
              {recepta.quantity} г
              <label className={styles.popuplabel}>Въглехидрати:</label>
              {recepta.v}
              <label className={styles.popuplabel}>Протеини:</label>
              {recepta.p}
              <label className={styles.popuplabel}>Мазнини:</label>
              {recepta.m}
              <label className={styles.popuplabel}>Хлебни единици:</label>
              {recepta.he}
              <label className={styles.popuplabel}>Калории:</label>
              {recepta.energy}
            </div>
            <button
              className={styles.close}
              onClick={() => {
                setIsVisible(false);
              }}
            >
              X
            </button>
          </div>
        )}
      </div>
  
    </div>
  );
};

export default BrowseRecipes;
