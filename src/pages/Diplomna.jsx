import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import background from "./VC_FoodNutrition_1200x674.jpg";
import LogoutButton from "./LogoutButton";
import BarcodeReader from "./BarcodeReader";

const Diplomna = () => {
  const [kcal, setKcal] = useState(0.0);
  const [v, setV] = useState(0.0);
  const [p, setP] = useState(0.0);
  const [m, setM] = useState(0.0);
  const [he, setHe] = useState(0.0);
  const [grams, setGrams] = useState(0.0);
  const [kcalPer100, setKcalPer100] = useState(0.0);
  const [vPer100, setVPer100] = useState(0.0);
  const [pPer100, setPPer100] = useState(0.0);
  const [mPer100, setMPer100] = useState(0.0);
  const [hePer100, setHePer100] = useState(0.0);
  const [searchText, setSearchText] = useState("");
  const [glut, setGlut] = useState(false);
  const [lact, setLact] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [vEtiket, setVEtiket] = useState(0);
  const [hePriem, setHePriem] = useState(0);
  const [neobhPriem, setNeobhPriem] = useState(0);
  const [datetime, setDateTime] = useState(null);
  const [nutrition, setNutrition] = useState("Закуска");
  const [barcode, setBarcode] = useState("");
  const [stopStream, setStopStream] = useState(false)
  const [openReader, setOpenReader] = useState(false)
  axios.defaults.withCredentials = true;
  const fixIntV = (v) => {
    setV(Number(v).toFixed(1));
  };
  const fixIntP = (v) => {
    setP(Number(v).toFixed(1));
  };
  const fixIntM = (v) => {
    setM(Number(v).toFixed(1));
  };
  const fixIntKcal = (v) => {
    setKcal(Number(v).toFixed(1));
  };
  const fixIntHe = (v) => {
    setHe(Number(v).toFixed(1));
  };
  const fixIntGrams = (v) => {
    setGrams(Number(v).toFixed(1));
  };
  const handleKcal = (e) => {
    fixIntKcal(e.target.value);
    fixIntV((e.target.value / kcalPer100) * vPer100);
    fixIntP((e.target.value / kcalPer100) * pPer100);
    fixIntM((e.target.value / kcalPer100) * mPer100);
    fixIntHe(((e.target.value / kcalPer100) * vPer100) / 12);
    fixIntGrams((e.target.value / kcalPer100) * 100);
  };
  const handleV = (e) => {
    fixIntV(e.target.value);
    fixIntKcal((e.target.value / vPer100) * kcalPer100);
    fixIntP((e.target.value / vPer100) * pPer100);
    fixIntM((e.target.value / vPer100) * mPer100);
    fixIntGrams((e.target.value / vPer100) * 100);
    fixIntHe(e.target.value / 12);
  };
  const handleP = (e) => {
    fixIntP(e.target.value);
    fixIntV((e.target.value / pPer100) * vPer100);
    fixIntKcal((e.target.value / pPer100) * kcalPer100);
    fixIntM((e.target.value / pPer100) * mPer100);
    fixIntGrams((e.target.value / pPer100) * 100);
    fixIntHe(((e.target.value / pPer100) * vPer100) / 12);
  };
  const handleM = (e) => {
    fixIntM(e.target.value);
    fixIntV((e.target.value / mPer100) * vPer100);
    fixIntP((e.target.value / mPer100) * pPer100);
    fixIntKcal((e.target.value / mPer100) * kcalPer100);
    fixIntGrams((e.target.value / mPer100) * 100);
    fixIntHe(((e.target.value / mPer100) * vPer100) / 12);
  };
  const handleGrams = (e) => {
    fixIntGrams(e.target.value);
    fixIntM((e.target.value / 100) * mPer100);
    fixIntV((e.target.value / 100) * vPer100);
    fixIntP((e.target.value / 100) * pPer100);
    fixIntKcal((e.target.value / 100) * kcalPer100);
    fixIntHe(((e.target.value / 100) * vPer100) / 12);
  };
  const handleHe = (e) => {
    fixIntHe(e.target.value);
    fixIntKcal((e.target.value / hePer100) * kcalPer100);
    fixIntP((e.target.value / hePer100) * pPer100);
    fixIntM((e.target.value / hePer100) * mPer100);
    fixIntGrams((e.target.value / hePer100) * 100);
    fixIntV(e.target.value * 12);
  };
  const handleVEtiket = (e) => {
    setVEtiket(e.target.value);
    setNeobhPriem(((hePriem * 12) / e.target.value) * 100);
  };
  const handleHePriem = (e) => {
    setHePriem(e.target.value);
    setNeobhPriem(((e.target.value * 12) / vEtiket) * 100);
  };

  const handleSelect = (event) => {
    const selectedFoodName = event.target.value;
    setSearchText(selectedFoodName);
    const food = data1.find((item) => item.value === selectedFoodName);
    if (food) {
      if (food.quantity) {
        setKcalPer100(food.energy / (food.quantity / 100));
        setVPer100(food.v / (food.quantity / 100));
        setMPer100(food.m / (food.quantity / 100));
        setPPer100(food.p / (food.quantity / 100));
        setHePer100(food.v / 12 / (food.quantity / 100));
        setGrams(100);
      } else {
        setKcalPer100(food.energy);
        setVPer100(food.v);
        setMPer100(food.m);
        setPPer100(food.p);
        setHePer100(food.v / 12);
        setGrams(100);
      }
    } else {
      setKcalPer100(0);
      setVPer100(0);
      setMPer100(0);
      setPPer100(0);
      setHePer100(0);
      setGrams(0);
    }
  };

  const handleClear = () => {
    setSearchText("");
    setKcalPer100(0);
    setVPer100(0);
    setMPer100(0);
    setPPer100(0);
    setHePer100(0);
    setGrams(0);
  };

  const handleBarcodeSearch = () => {
    if (barcode) {
      axios("http://localhost:4000/barcodeSearch", {
        params: { barcode: barcode },
      }).then((res) => {
        if (res.data.results.length > 0) {
          setSearchText(res.data.results.rows[0].value);
          setVPer100(res.data.results.rows[0].v);
          setMPer100(res.data.results.rows[0].m);
          setPPer100(res.data.results.rows[0].p);
          setHePer100(res.data.results.rows[0].v / 12);
          setGrams(100);
          setKcalPer100(res.data.results.rows[0].energy);
        } else {
          alert("Не е намерен продукт с такъв баркод!");
        }
      });
    } else {
      alert("Моля, въведете баркод.");
    }
  };
  const handleGlut = () => {
    if (glut) setGlut(false);
    else setGlut(true);
  };
  const handleLact = () => {
    if (lact) setLact(false);
    else setLact(true);
  };
  const handleNutrition = (e) => {
    setNutrition(e.target.value);
  };
  const setTo0 = (e) => {
    if (e.target.value === "") e.target.value = 0;
  };
  const handleChoice = (e) => {
    if (e.target.value === "qsla") {
      axios.get("http://localhost:4000/getProductsQsla").then((res) => {
        setData(res.data.results.rows);
        setData1(res.data.results.rows);
      });
    } else if (e.target.value === "gradina") {
      axios.get("http://localhost:4000/getProductsGradina").then((res) => {
        setData(res.data.results.rows);
        setData1(res.data.results.rows);
      });
    } else if (e.target.value === "uchilishte") {
      axios.get("http://localhost:4000/getProductsSchool").then((res) => {
        setData(res.data.results.rows);
        setData1(res.data.results.rows);
      });
    } else if (e.target.value === "products") {
      axios.get("http://localhost:4000/getProducts").then((res) => {
        setData(res.data.results.rows);
        setData1(res.data.results.rows);
      });
    } else {
      axios.get("http://localhost:4000/fetch-all-recipes").then((res) => {
        setData(res.data.results.rows);
        setData1(res.data.results.rows);
      });
    }
  };

  const handleSubmit = () => {
    if (
      datetime &&
      searchText &&
      nutrition &&
      grams &&
      kcal &&
      v &&
      p &&
      m &&
      he
    ) {
      axios
        .post(
          "http://localhost:4000/addToDiary",
          {
            date: datetime,
            food: searchText,
            nutrition: nutrition,
            quantity: grams,
            kcal: kcal,
            v: v,
            p: p,
            m: m,
            he: he,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => alert("Информацията е добавена успешно в дневника."));
    } else {
      alert("Моля, попълнете всички данни");
    }
  };

  const handleBarcode = (e) => {
    setBarcode(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/getProductsQsla").then((res) => {
      setData(res.data.results.rows);
      setData1(res.data.results.rows);
    });
  }, []);
  useEffect(() => {
    setKcal(kcalPer100);
    setV(vPer100);
    setM(mPer100);
    setP(pPer100);
    setHe(hePer100);
  }, [kcalPer100]);

  useEffect(() => {
    if (!glut && !lact) {
      setData1(data);
    } else if (glut && !lact) {
      var newData = [];
      data.map((item, index) => {
        if (!item.gluten.includes("Да") && !item.gluten.includes("да")) {
          newData.push(item);
        }
      });

      setData1(newData);
    } else if (!glut && lact) {
      var newData = [];
      data.map((item, index) => {
        if (!item.beltyk.includes("Да") && !item.beltyk.includes("да")) {
          newData.push(item);
        }
      });
      setData1(newData);
    } else {
      var newData = [];
      data.map((item, index) => {
        if (
          !item.gluten.includes("Да") &&
          !item.gluten.includes("да") &&
          !item.beltyk.includes("Да") &&
          !item.beltyk.includes("да")
        ) {
          newData.push(item);
        }
      });
      setData1(newData);
    }
  }, [glut, lact, data]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // backgroundImage: `url(${background})`,
        backgroundColor: `#e4e4e4`,
        backgroundSize: "cover",
        // padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div className={styles.nav}>
        <Link to={{ pathname: `/diary` }} className={styles.navlink}>
          Към дневника
        </Link>
        <Link to={{ pathname: `/recipes` }} className={styles.navlink}>
          Създаване на рецепта
        </Link>
        <Link to={{ pathname: `/browse-recipes` }} className={styles.navlink}>
          Разглеждане на рецепти
        </Link>
        <LogoutButton />
      </div>
      <div className={styles.checkradio}>
        <div onChange={handleChoice} className={styles.choice}>
          <div>
            <h4>Изберете рецептурник</h4>
          </div>
          <div>
            <input
              type="radio"
              value="qsla"
              name="choice"
              className={styles.radio}
              defaultChecked
            />
            <label>Ясла</label>
          </div>
          <div>
            <input
              type="radio"
              value="gradina"
              name="choice"
              className={styles.radio}
            />

            <label>Градина</label>
          </div>
          <div>
            <input
              type="radio"
              value="uchilishte"
              name="choice"
              className={styles.radio}
            />{" "}
            <label>Училище</label>
          </div>
          <div>
            <input
              type="radio"
              value="recepti"
              name="choice"
              className={styles.radio}
            />{" "}
            <label>Собствени рецепти</label>
          </div>
          <div>
            <input
              type="radio"
              value="products"
              name="choice"
              className={styles.radio}
            />
            <label>Продукти</label>
          </div>
        </div>
        <div className={styles.filters}>
          <div>
            <h4>Алергени</h4>
          </div>
          <div>
            <label>Без глутен: </label>
            <input
              type="checkbox"
              value={glut}
              className={styles.check}
              onChange={handleGlut}
            />
          </div>
          <div>
            <label>Без белтък на кравето мляко: </label>
            <input
              type="checkbox"
              value={lact}
              className={styles.check}
              onChange={handleLact}
            />
          </div>
        </div>
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
          {data1.map((item, index) => {
            return <option value={item.value} key={index} />;
          })}
        </datalist>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.macrodiv}>
            <label className={styles.macro}> Грамаж:</label>
            <input
              type="number"
              className={styles.number}
              min={0}
              step={0.1}
              value={grams}
              onChange={handleGrams}
              onBlur={setTo0}
            />
          </div>
          <div className={styles.macrodiv}>
            <label className={styles.macro}> Калории: </label>
            <input
              type="number"
              className={styles.number}
              min={0}
              step={0.1}
              value={kcal}
              onChange={handleKcal}
              onBlur={setTo0}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Въглехидрати:</label>
            <input
              type="number"
              className={styles.number}
              min={0}
              step={0.1}
              value={v}
              onChange={handleV}
              onBlur={setTo0}
            />
          </div>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Протеини:</label>
            <input
              type="number"
              className={styles.number}
              min={0}
              step={0.1}
              value={p}
              onChange={handleP}
              onBlur={setTo0}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Мазнини:</label>
            <input
              type="number"
              className={styles.number}
              min={0}
              step={0.1}
              value={m}
              onKeyUp={(event) => {
                if (event.key === "Backspace") {
                  setM(Number(m).toFixed(0));
                }
              }}
              onChange={handleM}
              onBlur={setTo0}
            />
          </div>
          <div className={styles.macrodiv}>
            <label className={styles.macro}>Хлебни единици:</label>
            <input
              type="number"
              className={styles.number}
              min={0}
              step={0.1}
              value={he}
              onChange={handleHe}
              onBlur={setTo0}
            />
          </div>
        </div>
      </div>
      <div></div>
      <div className={styles.barcode}>
        <div className={styles.diarydiv}>
          <label>
            {" "}
            <h4> Въвеждане в дневник</h4>{" "}
          </label>
          <div className={styles.nutritiondiv}>
            <div>
              <label for="nutrition" className={styles.nutrition}>
                Вид хранене
              </label>

              <select
                id="nutrition"
                className={styles.nutrition}
                onChange={handleNutrition}
              >
                <option value="Закуска">Закуска</option>
                <option value="обяд">Обяд</option>
                <option value="следобедна закуска">Следобедна закуска</option>
                <option value="вечеря">Вечеря</option>
              </select>
            </div>
            <div>
              <DateTimePicker
                className={styles.datetime}
                value={datetime}
                onChange={setDateTime}
              />
            </div>
          </div>
          <input
            type="button"
            className={styles.diary}
            value="Запази в дневника"
            onClick={handleSubmit}
          />
        </div>
        <div className={styles.diarydiv}>
          <div>
            <label>
              <h4>Търсене по баркод: </h4>
            </label>
          </div>
          <div>
            <input type="text" value={barcode} onChange={handleBarcode} />
          </div>
          {openReader?
          <div>
          <BarcodeReader handleUpdate={(err, result) => {
          if (result) {
          setBarcode(result.text)
          return true;
          }
          else{
            console.log(false)
          return false;
          }

        } } stopStream={stopStream} setStopStream={setStopStream}/>
        <input
            type="button"
            value="Затвори камера"
            className={styles.diary}
            onClick={() => {setOpenReader(false)}}
          />
        </div>: <div></div>
      }
          <input
            type="button"
            value="Търси по баркод"
            className={styles.diary}
            onClick={handleBarcodeSearch}
          />
          {
            openReader===false?
          <input
            type="button"
            value="Сканирай баркод с камера"
            className={styles.diary}
            onClick={() => {setOpenReader(true)}}
          />:<div></div>
}
        </div>
      </div>
      <div className={styles.calc}>
        Въглехидрати на 100 г по етикет:{" "}
        <input
          type="number"
          className={styles.number}
          min={0}
          step={0.1}
          value={/*parseFloat(p).toFixed(1)*/ vEtiket}
          onChange={handleVEtiket}
          onBlur={setTo0}
        />
        Хлебни единици:{" "}
        <input
          type="number"
          className={styles.number}
          min={0}
          step={0.1}
          value={/*parseFloat(m).toFixed(1)*/ hePriem}
          onChange={handleHePriem}
          onBlur={setTo0}
        />
        Необходим прием:
        <input
          type="number"
          className={styles.number}
          min={0}
          step={0.1}
          value={/*parseFloat(he).toFixed(1)*/ neobhPriem}
          disabled
          onBlur={setTo0}
        />
      </div>
    </div>
  );
};

export default Diplomna;
