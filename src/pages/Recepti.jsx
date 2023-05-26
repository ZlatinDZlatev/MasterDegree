import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'
import ReactSearchBox from "react-search-box"

const data =
    [
        {
            key: "oriz",
            value: "Ориз*",
            kcal: 360,
            m: 8,
            v: 60,
            p: 11
        },
        {
            key: "kartofi",
            value: "Картофи^",
            kcal: 170,
            m: 12,
            v: 55,
            p: 7
        },
        {
            key: "riba",
            value: "Риба*^",
            kcal: 170,
            m: 10,
            v: 6,
            p: 17
        },
        {
            key: "sharan",
            value: "Шаран",
            kcal: 170,
            m: 10,
            v: 6,
            p: 17
        }

    ]

const Recepti = () =>{
    const [quantity,setQuantity] = useState(0)
    const [vProduct,setVProduct] = useState(0.0)
    const [mProduct,setMProduct] = useState(0.0)
    const [pProduct,setPProduct] = useState(0.0)
    const [kcalProduct,setKcalProduct] = useState(0.0)
    const [recepta,setRecepta] = useState([])
    const [kcalRecepta, setKcalRecepta]=useState(0.0)
    const [mRecepta, setMRecepta]=useState(0.0)
    const [vRecepta, setVRecepta]=useState(0.0)
    const [pRecepta, setPRecepta]=useState(0.0)
    const [quantityRecepta, setQuantityRecepta]=useState(0)
    const [searchText, setSearchText] = useState("")
    axios.defaults.withCredentials=true


    const handleQuantity = (e) =>{
        setQuantity(e.target.value)
    }

    const handleSelect = (record) =>{
        setSearchText(record.item.value)
        setKcalProduct(record.item.kcal)
        setVProduct(record.item.v)
        setMProduct(record.item.m)
        setPProduct(record.item.p)
    }

    const handleAdd = () =>{
        let newProd ={name:searchText, v:vProduct, m:mProduct, p:pProduct, kcal:kcalProduct, quantity:quantity}
        setRecepta([...recepta,newProd])
     console.log(recepta)
    }

   useEffect(()=>{
        recepta.map((item,index)=>{
            setMRecepta(mRecepta+parseFloat(item.m*item.quantity/100))
            console.log(mRecepta)
            setVRecepta(vRecepta+parseFloat(item.v*item.quantity/100))
            setPRecepta(pRecepta+parseFloat(item.p*item.quantity/100))
            setKcalRecepta(kcalRecepta+parseFloat(item.kcal*item.quantity/100))
            console.log(kcalRecepta)
            setQuantityRecepta(quantityRecepta+parseFloat(item.quantity))
            console.log(quantityRecepta)
        })
    },[recepta])

    return(
        <div>
              <ReactSearchBox
                    autoFocus
                    clearOnSelect={false}
                    placeholder={searchText === "" ? "Избери храна" : searchText}
                    data={data}
                    onSelect={handleSelect}
                    
                />
                <div>
                    Количество: <input type="number" min={0} step={1} value={quantity} onChange={handleQuantity} /> г
                </div>
                <div>
                    <input type="button" value="Добави" onClick={handleAdd} />
                </div>
                <div>
                    Въглехидрати/100г: <input type="number" disabled value={quantityRecepta===0?0:vRecepta/(quantityRecepta/100)}  />
                    Протеини/100г: <input type="number" disabled value={quantityRecepta===0?0:pRecepta/(quantityRecepta/100)}  />
                    Мазнини/100г: <input type="number" disabled  value={quantityRecepta===0?0:mRecepta/(quantityRecepta/100)}  />
                    Kcal/100г: <input type="number" disabled  value={quantityRecepta===0?0:kcalRecepta/(quantityRecepta/100)}  />
                </div>
                <div>
                    {
                        recepta!==[]?recepta.map((item, index)=>{
                            return(
                                <div>
                                    {item.name}: {item.quantity}г
                                </div>
                            )
                        }):
                        <div></div>
                    }
                </div>
        </div>
    )
}

export default Recepti