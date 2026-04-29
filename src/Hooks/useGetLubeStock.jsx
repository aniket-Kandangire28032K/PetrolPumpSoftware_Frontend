import axios from 'axios'
import React, { useEffect, useState } from 'react'
import URL from '../assets/URL.js';


const useGetLubeStock = () => {
    const [lubeStock,setLubeStock] = useState([]);
    const [StockError,SetStockError] = useState('')
    const [loading,setLoading] = useState(false)
    const getLubeStock = async () => {
        try {
            const res = await axios.get(`${URL}/api/lube-stock`)
            setLubeStock(res.data.backendData)
            console.log(res.data.backendData)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getLubeStock();
    },[])
  return { lubeStock,getLubeStock}
}

export default useGetLubeStock