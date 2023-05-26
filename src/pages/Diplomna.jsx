import React, { useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import styles from "./Home.module.scss";

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
  axios.defaults.withCredentials = true;
  const handleKcal = (e) => {
    setKcal(e.target.value);
    setV((e.target.value / kcalPer100) * vPer100);
    setP((e.target.value / kcalPer100) * pPer100);
    setM((e.target.value / kcalPer100) * mPer100);
    setHe(((e.target.value / kcalPer100) * vPer100) / 12);
    setGrams((e.target.value / kcalPer100) * 100);
    console.log(data1);
  };
  const handleV = (e) => {
    setV(e.target.value);
    setKcal((e.target.value / vPer100) * kcalPer100);
    setP((e.target.value / vPer100) * pPer100);
    setM((e.target.value / vPer100) * mPer100);
    setGrams((e.target.value / vPer100) * 100);
    setHe(e.target.value / 12);
  };
  const handleP = (e) => {
    setP(e.target.value);
    setV((e.target.value / pPer100) * vPer100);
    setKcal((e.target.value / pPer100) * kcalPer100);
    setM((e.target.value / pPer100) * mPer100);
    setGrams((e.target.value / pPer100) * 100);
    setHe(((e.target.value / pPer100) * vPer100) / 12);
  };
  const handleM = (e) => {
    setM(e.target.value);
    setV((e.target.value / mPer100) * vPer100);
    setP((e.target.value / mPer100) * pPer100);
    setKcal((e.target.value / mPer100) * kcalPer100);
    setGrams((e.target.value / mPer100) * 100);
    setHe(((e.target.value / mPer100) * vPer100) / 12);
  };
  const handleGrams = (e) => {
    setGrams(e.target.value);
    setM((e.target.value / 100) * mPer100);
    setV((e.target.value / 100) * vPer100);
    setP((e.target.value / 100) * pPer100);
    setKcal((e.target.value / 100) * kcalPer100);
    setHe(((e.target.value / 100) * vPer100) / 12);
  };
  const handleHe = (e) => {
    setHe(e.target.value);
    setKcal((e.target.value / hePer100) * kcalPer100);
    setP((e.target.value / hePer100) * pPer100);
    setM((e.target.value / hePer100) * mPer100);
    setGrams((e.target.value / hePer100) * 100);
    setV(e.target.value * 12);
  };
  const handleVEtiket = (e) => {
    setVEtiket(e.target.value);
    setNeobhPriem(((hePriem * 12) / e.target.value) * 100);
  };
  const handleHePriem = (e) => {
    setHePriem(e.target.value);
    setNeobhPriem(((e.target.value * 12) / vEtiket) * 100);
  };

  const handleSelect = (record) => {
    setSearchText(record.item.value);
    setKcalPer100(record.item.energy);
    setVPer100(record.item.v);
    setMPer100(record.item.m);
    setPPer100(record.item.p);
    setHePer100(record.item.v / 12);
    setGrams(100);
  };
  const handleBarcodeSearch = () => {
    axios("http://localhost:4000/barcodeSearch", {
      params: { barcode: barcode },
    }).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        setSearchText(res.data.results.rows[0].value);
        setKcalPer100(res.data.results.rows[0].energy);
        setVPer100(res.data.results.rows[0].v);
        setMPer100(res.data.results.rows[0].m);
        setPPer100(res.data.results.rows[0].p);
        setHePer100(res.data.results.rows[0].v / 12);
        setGrams(100);
      }
    });
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
    if (e.target.value === "gradina") {
      axios.get("http://localhost:4000/getProducts").then((res) => {
        console.log(res.data.results.rows);
        setData(res.data.results.rows);
        setData1(res.data.results.rows);
      });
    } else if (e.target.value === "uchilishte") {
      axios.get("http://localhost:4000/getProductsSchool").then((res) => {
        console.log(res.data.results.rows);
        setData(res.data.results.rows);
        setData1(res.data.results.rows);
      });
    }
  };

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:4000/addToDiary",
        {
          date: datetime,
          food: searchText,
          nutrition: nutrition,
          quantity: grams,
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
      .then((res) => console.log(res));
  };

  const handleBarcode = (e) => {
    setBarcode(e.target.value);
  };

  const handleLogout = () => {
    axios("http://localhost:4000/logout").then((res) => {
      localStorage.removeItem("user");
      window.location.href = "http://localhost:3000/login";
    });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/getProducts").then((res) => {
      console.log(res.data.results.rows);
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
    console.log(datetime);
  }, [datetime]);
  useEffect(() => {
    if (!glut && !lact) {
      setData1(data);
    } else if (glut && !lact) {
      var newData = [];
      data.map((item, index) => {
        if (!item.gluten.includes("Да")) {
          newData.push(item);
        }
      });

      setData1(newData);
    } else if (!glut && lact) {
      var newData = [];
      data.map((item, index) => {
        if (!item.beltyk.includes("Да")) {
          newData.push(item);
        }
      });
      setData1(newData);
    } else {
      var newData = [];
      data.map((item, index) => {
        if (!item.gluten.includes("Да") && !item.beltyk.includes("Да")) {
          newData.push(item);
        }
      });
      setData1(newData);
    }
  }, [glut, lact]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchdiv}>
        {/* <ReactSearchBox
          autoFocus
          clearOnSelect={false}
          placeholder={searchText === "" ? "Избери храна" : searchText}
          data={data1}
          onSelect={handleSelect}
          className={styles.search}        
        />
  */}
        <label>
          Choose a browser from this list:
          <input type="text" list="browsers" name="myBrowser" />
        </label>
        <datalist id="browsers">
          {data1.map((item, index) => {
            return <option value={item.value} key={index} />;
          })}
        </datalist>
        <input
          type="submit"
          value="Изход"
          className={styles.exit}
          onClick={handleLogout}
        />
        <div onChange={handleChoice} className={styles.choice}>
          <input
            type="radio"
            value="gradina"
            name="choice"
            className={styles.radio}
            defaultChecked
          />
          Градина
          <input
            type="radio"
            value="uchilishte"
            name="choice"
            className={styles.radio}
          />{" "}
          Училище
        </div>
        <div className={styles.filters}>
          Без глутен:{" "}
          <input
            type="checkbox"
            value={glut}
            className={styles.check}
            onChange={handleGlut}
          />
          Без белтък на кравето мляко:{" "}
          <input
            type="checkbox"
            value={lact}
            className={styles.check}
            onChange={handleLact}
          />
        </div>
      </div>
      <div className={styles.macrodiv}>
        <label className={styles.macro}> Грамаж:</label>
        <input
          type="number"
          className={styles.number}
          min={0}
          step={0.1}
          value={/*parseFloat(grams).toFixed(1)*/ grams}
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
          value={/*parseFloat(kcal).toFixed(1)*/ kcal}
          onChange={handleKcal}
          onBlur={setTo0}
        />
      </div>
      <label className={styles.macro}>Въглехидрати:</label>
      <input
        type="number"
        className={styles.number}
        min={0}
        step={0.1}
        value={/*parseFloat(v).toFixed(1)*/ v}
        onChange={handleV}
        onBlur={setTo0}
      />
      <label className={styles.macro}>Протеини: </label>
      <input
        type="number"
        className={styles.number}
        min={0}
        step={0.1}
        value={/*parseFloat(p).toFixed(1)*/ p}
        onChange={handleP}
        onBlur={setTo0}
      />
      <label className={styles.macro}>Мазнини:</label>
      <input
        type="number"
        className={styles.number}
        min={0}
        step={0.1}
        value={/*parseFloat(m).toFixed(1)*/ m}
        onChange={handleM}
        onBlur={setTo0}
      />
      <label className={styles.macro}>Хлебни единици:</label>
      <input
        type="number"
        className={styles.number}
        min={0}
        step={0.1}
        value={/*parseFloat(he).toFixed(1)*/ he}
        onChange={handleHe}
        onBlur={setTo0}
      />
      <div>
        {/*   Или въведи баркод: <input type="text" value={barcode} onChange={handleBarcode} />
                <input type="button" value="Търси по баркод" onClick={handleBarcodeSearch} />*/}
      </div>
      <label className={styles.diary}> Въвеждане в дневник </label>
      <div className={styles.nutritiondiv}>
        <label for="nutrition" className={styles.nutrition}>
          Вид хранене
        </label>

        <select
          id="nutrition"
          className={styles.nutrition}
          onChange={handleNutrition}
        >
          <option value="закуска">Закуска</option>
          <option value="обяд">Обяд</option>
          <option value="следобедна закуска">Следобедна закуска</option>
          <option value="вечеря">Вечеря</option>
        </select>
        <DateTimePicker
          className={styles.nutrition}
          value={datetime}
          onChange={setDateTime}
        />
      </div>
      <div className={styles.diarydiv}>
        <input
          type="button"
          className={styles.diary}
          value="Запази в дневника"
          onClick={handleSubmit}
        />
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
