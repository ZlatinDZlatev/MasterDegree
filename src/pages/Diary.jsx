import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import '../css-modules/App.css'
import DateTimePicker from "react-datetime-picker"


const Diary = () => {
    const [diary, setDiary] = useState([])
    axios.defaults.withCredentials=true
    useEffect(() => {
        axios("http://localhost:4000/getDiary")
            .then(res => setDiary(res.data.results.rows))
    }, [])
    const [fromDate, setFromDate]=useState(null)
    const [toDate, setToDate]=useState(null)
    const handleRange = () =>{
        if(fromDate === null || toDate === null)
            alert("Моля попълнете начална и крайна дата.")
        else if(fromDate>toDate)
            alert("Началната дата е по-късна от крайната! Моля въведете данните коректно.")
        else{
            axios("http://localhost:4000/getDiaryFilter",{params:{fromDate:fromDate, toDate:toDate}})
            .then(res => setDiary(res.data.results.rows))
    
        }
            
    }

    
    return (
        <div>
            <table>
                <tr>
                    <th>Дата и час</th>
                    <th>Храна</th>
                    <th>Вид хранене</th>
                    <th>Количество</th>
                    <th>Въглехидрати</th>
                    <th>Протеини</th>
                    <th>Мазнини</th>
                    <th>Хлебни единици</th>
                </tr>
                {
                    diary !== [] ? diary.map((item, index) => {
                        let dateLocal = new Date(item.date)

                        return (
                            <tr>
                                <td>{dateLocal.toLocaleString()}</td>
                                <td>{item.food}</td>
                                <td>{item.nutrition}</td>
                                <td>{item.quantity}</td>
                                <td>{item.v}</td>
                                <td>{item.p}</td>
                                <td>{item.m}</td>
                                <td>{item.he}</td>
                            </tr>
                        )
                    }) : <div></div>
                }
            </table>
          <div> Покажи от дата <DateTimePicker value={fromDate} onChange={setFromDate} /> до дата <DateTimePicker value={toDate} onChange={setToDate} /></div>
          <div><input type="button" value="Покажи" onClick={handleRange} /></div>

        </div>
    )
}

export default Diary