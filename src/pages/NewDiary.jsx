import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Diary.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PieChart from "./PieChart";
import LogoutButton from "./LogoutButton";

const NewDiary = () => {
  const [diary, setDiary] = useState([]);
  const [breakfastCalories, setBreakfastCalories] = useState(0.0);
  const [lunchCalories, setLunchCalories] = useState(0.0);
  const [snackCalories, setSnackCalories] = useState(0.0);
  const [dinnerCalories, setDinnerCalories] = useState(0.0);
  const [breakfastProteins, setBreakfastProteins] = useState(0.0);
  const [lunchProteins, setLunchProteins] = useState(0.0);
  const [snackProteins, setSnackProteins] = useState(0.0);
  const [dinnerProteins, setDinnerProteins] = useState(0.0);
  const [breakfastCarbs, setBreakfastCarbs] = useState(0.0);
  const [lunchCarbs, setLunchCarbs] = useState(0.0);
  const [snackCarbs, setSnackCarbs] = useState(0.0);
  const [dinnerCarbs, setDinnerCarbs] = useState(0.0);
  const [breakfastFats, setBreakfastFats] = useState(0.0);
  const [lunchFats, setLunchFats] = useState(0.0);
  const [snackFats, setSnackFats] = useState(0.0);
  const [dinnerFats, setDinnerFats] = useState(0.0);
  const [showDiagrams, setShowDiagrams] = useState(false);
  let totalCarbs = breakfastCarbs + lunchCarbs + dinnerCarbs + snackCarbs;
  let totalCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snackCalories;
  let totalProteins =
    breakfastProteins + lunchProteins + dinnerProteins + snackProteins;
  let totalFats = breakfastFats + lunchFats + dinnerFats + snackFats;

  axios.defaults.withCredentials = true;

  const [date, setDate] = useState(null);
  const calculateMealCalories = (mealType) => {
    return diary
      .filter((item) => item.nutrition === mealType)
      .reduce((totalEnergy, item) => totalEnergy + item.energy, 0);
  };

  const calculateMealProteins = (mealType) => {
    return diary
      .filter((item) => item.nutrition === mealType)
      .reduce((totalEnergy, item) => totalEnergy + item.p, 0);
  };

  const calculateMealCarbs = (mealType) => {
    return diary
      .filter((item) => item.nutrition === mealType)
      .reduce((totalEnergy, item) => totalEnergy + item.v, 0);
  };

  const calculateMealFats = (mealType) => {
    return diary
      .filter((item) => item.nutrition === mealType)
      .reduce((totalEnergy, item) => totalEnergy + item.m, 0);
  };
  const handleSubmit = () => {
    if (date === null) alert("Моля попълнете дата.");
    else {
      axios("http://localhost:4000/getDiaryByDate", {
        params: { date: date },
      }).then((res) => setDiary(res.data.results.rows));
      setShowDiagrams(true);
    }
  };

  const handleClear = () => {
    setDate(null);
    setShowDiagrams(false);
    setDiary([])
    setBreakfastCalories(0)
    setBreakfastCarbs(0)
    setBreakfastFats(0)
    setBreakfastProteins(0)
    setDinnerCalories(0)
    setDinnerCarbs(0)
    setDinnerFats(0)
    setDinnerProteins(0)
    setLunchCalories(0)
    setLunchCarbs(0)
    setLunchFats(0)
    setLunchProteins(0)
    setSnackCalories(0)
    setSnackCarbs(0)
    setSnackFats(0)
    setSnackProteins(0)
  };
  useEffect(() => {
    setBreakfastCalories(calculateMealCalories("Закуска"));
    setLunchCalories(calculateMealCalories("обяд"));
    setSnackCalories(calculateMealCalories("следобедна закуска"));
    setDinnerCalories(calculateMealCalories("вечеря"));
    setBreakfastProteins(calculateMealProteins("Закуска"));
    setLunchProteins(calculateMealProteins("обяд"));
    setSnackProteins(calculateMealProteins("следобедна закуска"));
    setDinnerProteins(calculateMealProteins("вечеря"));
    setBreakfastCarbs(calculateMealCarbs("Закуска"));
    setLunchCarbs(calculateMealCarbs("обяд"));
    setSnackCarbs(calculateMealCarbs("следобедна закуска"));
    setDinnerCarbs(calculateMealCarbs("вечеря"));
    setBreakfastFats(calculateMealFats("Закуска"));
    setLunchFats(calculateMealFats("обяд"));
    setSnackFats(calculateMealFats("следобедна закуска"));
    setDinnerFats(calculateMealFats("вечеря"));
  }, [diary]);
  return (
    <div>
      <div className={styles.nav}>
        <Link to={{ pathname: `/` }} className={styles.navlink}>
          Начална страница
        </Link>
        <Link to={{ pathname: `/recipes` }} className={styles.navlink}>
          Рецепти
        </Link>
        <Link to={{ pathname: `/diary` }} className={styles.navlink}>
          Обратно към дневника
        </Link>
        <LogoutButton />
      </div>
      <table>
        <tr>
          <th>Дата и час</th>
          <th>Храна</th>
          <th>Вид хранене</th>
          <th>Количество</th>
          <th>Калории</th>
          <th>Въглехидрати</th>
          <th>Протеини</th>
          <th>Мазнини</th>
          <th>Хлебни единици</th>
        </tr>
        {diary !== [] ? (
          diary.map((item, index) => {
            let dateLocal = new Date(item.date);

            return (
              <tr>
                <td>{dateLocal.toLocaleString()}</td>
                <td>{item.food}</td>
                <td>{item.nutrition}</td>
                <td>{parseFloat(item.quantity).toFixed(1)}</td>
                <td>{parseFloat(item.energy).toFixed(1)}</td>
                <td>{parseFloat(item.v).toFixed(1)}</td>
                <td>{parseFloat(item.p).toFixed(1)}</td>
                <td>{parseFloat(item.m).toFixed(1)}</td>
                <td>{parseFloat(item.he).toFixed(1)}</td>
              </tr>
            );
          })
        ) : (
          <div></div>
        )}
      </table>
      <div className={styles.datetime}>
        {" "}
        Избери дата{" "}
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <input
          type="button"
          value="Покажи"
          className={styles.submit}
          onClick={handleSubmit}
        />
        <input
          type="button"
          value="Изчисти"
          className={styles.submit}
          onClick={handleClear}
        />
      </div>
      {showDiagrams ? (
        <div>
          <PieChart
            chartData={[
              ["Label", "Value"],
              ["Закуска", breakfastCalories],
              ["Обяд", lunchCalories],
              ["Следобедна закуска", snackCalories],
              ["Вечеря", dinnerCalories],
            ]}
            title="Процентно разпределение на калориите по хранения"
          />
          <PieChart
            chartData={[
              ["Label", "Value"],
              ["Белтъчини", Number(totalProteins * 4)],
              ["Въглехидрати", Number(totalCarbs * 4)],
              ["Мазнини", Number(totalFats * 9)],
            ]}
            title="Процентно разпределение на калориите, приети от макронутриентите"
          />
        </div>
      ) : (
        <div></div>
      )}
      <div
        className={styles.daystats}
      >
        <div>
          <label>
            <h3>Закуска</h3>
          </label>
          <div>Калории:</div>
          <input type="number" value={breakfastCalories.toFixed(1)} disabled />
          <div>Белтъчини:</div>
          <input type="number" value={breakfastProteins.toFixed(1)} disabled />
          <div>Въглехидрати:</div>
          <input type="number" value={breakfastCarbs.toFixed(1)} disabled />
          <div>Мазнини:</div>
          <input type="number" value={breakfastFats.toFixed(1)} disabled />
        </div>
        <div>
          <label>
            <h3>Обяд </h3>
          </label>
          <div>Калории:</div>
          <input type="number" value={lunchCalories.toFixed(1)} disabled />
          <div>Белтъчини:</div>
          <input type="number" value={lunchProteins.toFixed(1)} disabled />
          <div>Въглехидрати:</div>
          <input type="number" value={lunchCarbs.toFixed(1)} disabled />
          <div>Мазнини:</div>
          <input type="number" value={lunchFats.toFixed(1)} disabled />
        </div>
        <div>
          <label>
            <h3>Следобедна закуска</h3>
          </label>
          <div>Калории:</div>
          <input type="number" value={snackCalories.toFixed(1)} disabled />
          <div>Белтъчини:</div>
          <input type="number" value={snackProteins.toFixed(1)} disabled />
          <div>Въглехидрати:</div>
          <input type="number" value={snackCarbs.toFixed(1)} disabled />
          <div>Мазнини:</div>
          <input type="number" value={snackFats.toFixed(1)} disabled />
        </div>
        <div>
          <label>
            <h3>Вечеря</h3>
          </label>
          <div>Калории:</div>
          <input type="number" value={dinnerCalories.toFixed(1)} disabled />
          <div>Белтъчини:</div>
          <input type="number" value={dinnerProteins.toFixed(1)} disabled />
          <div>Въглехидрати:</div>
          <input type="number" value={dinnerCarbs.toFixed(1)} disabled />
          <div>Мазнини:</div>
          <input type="number" value={dinnerFats.toFixed(1)} disabled />
        </div>
        <div>
          <label>
            <h3>Общо за деня </h3>
          </label>
          <div>Калории:</div>
          <input type="number" value={totalCalories.toFixed(1)} disabled />
          <div>Белтъчини:</div>
          <input type="number" value={totalProteins.toFixed(1)} disabled />
          <div>Въглехидрати:</div>
          <input type="number" value={totalCarbs.toFixed(1)} disabled />
          <div>Мазнини:</div>
          <input type="number" value={totalFats.toFixed(1)} disabled />
        </div>
      </div>
      
    </div>
  );
};

export default NewDiary;
