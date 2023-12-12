import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactSearchBox from "react-search-box";
import styles from "./RecipesMain.module.scss";
import LogoutButton from "./LogoutButton";
import background from "./VC_FoodNutrition_1200x674.jpg";

const Recepti = () => {
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [vProduct, setVProduct] = useState(0.0);
  const [mProduct, setMProduct] = useState(0.0);
  const [pProduct, setPProduct] = useState(0.0);
  const [kcalProduct, setKcalProduct] = useState(0.0);
  const [recepta, setRecepta] = useState([]);
  const [kcalRecepta, setKcalRecepta] = useState(0.0);
  const [mRecepta, setMRecepta] = useState(0.0);
  const [vRecepta, setVRecepta] = useState(0.0);
  const [pRecepta, setPRecepta] = useState(0.0);
  const [quantityRecepta, setQuantityRecepta] = useState(100);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [beltykRecepta, setBeltykRecepta] = useState("Не");
  const [glutenRecepta, setGlutenRecepta] = useState("Не");
  const [beltykProduct, setBeltykProduct] = useState(false);
  const [glutenProduct, setGlutenProduct] = useState(false);
  axios.defaults.withCredentials = true;

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleSelect = (event) => {
    const selectedFoodName = event.target.value;
    setSearchText(selectedFoodName);
    const food = data.find((item) => item.value === selectedFoodName);
    if (food) {
      setKcalProduct(food.energy);
      setVProduct(food.v);
      setMProduct(food.m);
      setPProduct(food.p);
      setQuantity(100);
      setBeltykProduct(food.beltyk);
      setGlutenProduct(food.gluten);
    } else {
      setKcalProduct(0);
      setVProduct(0);
      setMProduct(0);
      setPProduct(0);
      setQuantity(0);
      setBeltykProduct("Не");
      setGlutenProduct("Не");
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAdd = () => {
    let newProd = {
      name: searchText,
      v: vProduct,
      m: mProduct,
      p: pProduct,
      kcal: kcalProduct,
      quantity: quantity,
      gluten: glutenProduct,
      beltyk: beltykProduct,
    };
    setRecepta([...recepta, newProd]);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleClear = () => {
    setSearchText("");
    setKcalProduct(0);
    setVProduct(0);
    setMProduct(0);
    setPProduct(0);
    setQuantity(0);
    setBeltykProduct("Не");
    setGlutenProduct("Не");
  };

  const handleSubmit = () => {
    if (
      description &&
      recepta && title
    ) {
      axios
        .post("http://localhost:4000/addRecipe", {
          description: description,
          mRecepta: mRecepta,
          vRecepta: vRecepta,
          pRecepta: pRecepta,
          kcalRecepta: kcalRecepta,
          recepta: recepta,
          quantity: quantityRecepta,
          title: title,
          gluten: glutenRecepta,
          beltyk: beltykRecepta,
        })
        .then((res) => alert(res.data));
    } else {
      alert("Моля, добавете продукти и напишете описание на рецептата");
    }
  };
  useEffect(() => {
    axios.get("http://localhost:4000/getProducts").then((res) => {
      setData(res.data.results.rows);
    });
  }, []);
  useEffect(() => {
    if (recepta.length !== 0) {
      let newQuantity = 0;
      let newM = 0;
      let newP = 0;
      let newV = 0;
      let newKcal = 0;
      recepta.map((item, index) => {
        newQuantity += Number(item.quantity);
        newM += Number((item.m * item.quantity) / 100);
        newP += Number((item.p * item.quantity) / 100);
        newV += Number((item.v * item.quantity) / 100);
        newKcal += Number((item.kcal * item.quantity) / 100);
        if (item.gluten === "Да") setGlutenRecepta("Да");
        if (item.beltyk === "Да") setBeltykRecepta("Да");
      });
      setQuantityRecepta(newQuantity);
      setMRecepta(newM);
      setPRecepta(newP);
      setVRecepta(newV);
      setKcalRecepta(newKcal);
    } else {
      setQuantityRecepta(0);
      setKcalRecepta(0);
      setMRecepta(0);
      setVRecepta(0);
      setPRecepta(0);
      setBeltykRecepta("Не");
      setGlutenRecepta("Не");
    }
  }, [recepta]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //backgroundImage: `url(${background})`,
        backgroundColor: `#e4e4e4`,
        backgroundSize: "cover",
        //padding: "20px",
        minHeight: "100vh",
        backgroundRepeat: "repeat",
      }}
    >
      <div className={styles.nav}>
          <Link to={{ pathname: `/` }} className={styles.navlink}>
            Начална страница
          </Link>
          <Link to={{ pathname: `/diary` }} className={styles.navlink}>
            Към дневника
          </Link>
          <Link to={{ pathname: `/browse-recipes` }} className={styles.navlink}>
            Разглеждане на рецепти
          </Link>
          <Link to={{ pathname: `/newDiary` }} className={styles.navlink}>
            Справки по дни
          </Link>
          <LogoutButton />
        </div>
        <div className={styles.innersearch}>
          <h4>Изберете храна от списъка:</h4>
          <input
            type="text"
            value={searchText}
            onChange={handleSelect}
            list="foods"
            name="foods"
          />
          <input type="button" onClick={handleClear} value="X" />
          <datalist id="foods">
            {data.map((item, index) => {
              return <option value={item.value} key={index} />;
            })}
          </datalist>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.macrodiv}>
            <label className={styles.macro}> Количество: </label>
            <input
              type="number"
              className={styles.number}
              min={0}
              step={1}
              value={quantity}
              onChange={handleQuantity}
            />{" "}
            г
          </div>

          <div className={styles.add}>
            <input
              type="button"
              value="Добави продукт"
              className={styles.diary}
              onClick={handleAdd}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Въглехидрати/100г: </label>
            <input
              type="number"
              disabled
              className={styles.number}
              value={
                quantityRecepta === 0 ? 0 : vRecepta / (quantityRecepta / 100)
              }
            />
          </div>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Протеини/100г: </label>
            <input
              type="number"
              disabled
              className={styles.number}
              value={
                quantityRecepta === 0 ? 0 : pRecepta / (quantityRecepta / 100)
              }
            />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Мазнини/100г: </label>
            <input
              type="number"
              disabled
              className={styles.number}
              value={
                quantityRecepta === 0 ? 0 : mRecepta / (quantityRecepta / 100)
              }
            />
          </div>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Kcal/100г: </label>
            <input
              type="number"
              disabled
              className={styles.number}
              value={
                quantityRecepta === 0
                  ? 0
                  : kcalRecepta / (quantityRecepta / 100)
              }
            />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Заглавие:</label>
            <input
              type="text"
              value={title}
              className={styles.number}
              onChange={handleTitle}
            />
          </div>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Описание:</label>{" "}
            <textarea
            rows={8}
              value={description}
              className={styles.textarea}
              onChange={handleDescription}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          Съдържание:
          {recepta.length !== 0 ? (
            recepta.map((item, index) => {
              return (
                <div key={index} className={styles.macrodiv}>
                  {item.name}: {item.quantity}г
                  <button
                    className={styles.diary}
                    onClick={() => {
                      const newRecepta = [...recepta];
                      newRecepta.splice(index, 1);
                      setRecepta(newRecepta);
                    }}
                  >
                    Изтрий
                  </button>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <input
        type="submit"
        value="Добави рецепта"
        className={styles.diary}
        onClick={handleSubmit}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          paddingTop: "3.75%",
        }}
      >
      </div>
    </div>
  );
};

export default Recepti;
