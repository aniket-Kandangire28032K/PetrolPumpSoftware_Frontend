import React, { useEffect, useState } from 'react'
import axios from 'axios'
const useGetLube = () => {
    const URL= import.meta.env.VITE_BACKEND_URL;
    const [lubeData,setLubeData] = useState([])
    const [lubeMessage,setLubeMessage] = useState("")
    const [lubeError,setLubeError] = useState(false)
    const getLubeData = async () => {
        try {
           const res = await axios.get(`${URL}/api/lube`)
           setLubeData(res.data.lubes)
           setLubeMessage("Lube Data Found")
        } catch (error) {
           console.log(error.response) 
           setLubeError(true)
           setLubeMessage("Lube Data Not Found")
        }
    }
    useEffect(()=>{
        getLubeData();
    },[])
  return { lubeData,lubeMessage,lubeError,getLubeData}
}

export default useGetLube