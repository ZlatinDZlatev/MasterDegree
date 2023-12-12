import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Link } from "react-router-dom";
import styles from "./Diary.module.scss";
import DateTimePicker from "react-datetime-picker";
import LogoutButton from "./LogoutButton";

const Diary = () => {
  const [diary, setDiary] = useState([]);
  const [data, setData] = useState([])
  const tableRef = useRef(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: 'NutritionTable',
      sheet: (fromDate && toDate)?`${fromDate} - ${toDate}`:'Цялостна информация'
  })
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios("http://localhost:4000/getDiary").then((res) =>
      setDiary(res.data.results.rows)
    );
  }, []);
  
  const handleRange = () => {
    if (fromDate === null || toDate === null)
      alert("Моля попълнете начална и крайна дата.");
    else if (fromDate > toDate)
      alert(
        "Началната дата е по-късна от крайната! Моля въведете данните коректно."
      );
    else {
      axios("http://localhost:4000/getDiaryFilter", {
        params: { fromDate: fromDate, toDate: toDate },
      }).then((res) => setDiary(res.data.results.rows));
    }
  };

  return (
    <div>
      <div className={styles.nav}>
        <Link to={{ pathname: `/` }} className={styles.navlink}>
          Начална страница
        </Link>
        <Link to={{ pathname: `/recipes` }} className={styles.navlink}>
          Рецепти
        </Link>
        <Link to={{ pathname: `/newDiary` }} className={styles.navlink}>
        Справки по дни
      </Link>
      <LogoutButton />
      </div>
      <div>
      <table ref={tableRef}>
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
      </div>
      <div className={styles.datetime}>
        {" "}
        Покажи от дата{" "}
        <DateTimePicker value={fromDate} onChange={setFromDate} /> до дата{" "}
        <DateTimePicker value={toDate} onChange={setToDate} />
        <input
          type="button"
          value="Покажи"
          className={styles.submit}
          onClick={handleRange}
        />
        {
          diary?
       ( <input
          type="button"
          value="Свали в Excel"
          className={styles.submit}
          onClick={onDownload}
        />): <div></div>
} 
      </div>
    </div>
  );
};

export default Diary;
