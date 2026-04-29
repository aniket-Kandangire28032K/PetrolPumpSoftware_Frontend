import axios from 'axios';
import React, { useEffect, useState } from 'react'
import URL from '../assets/URL.js';
const useCustomerList = () => {
   const [customerList,setCustomerList] = useState([]);
   const [success,setSuccess] = useState();

   const getCustomers = async () => {
    try {
      const res = await axios.get(`${URL}/api/customer`)
      setCustomerList(res.data.customers); 
    //   console.log(res.data.customers) 
      setSuccess(true)  
    } catch (error) {
        setSuccess(false)  
        
    }
   }
useEffect(()=>{
    getCustomers();
},[])
    return {customerList,success,getCustomers};
}

export default useCustomerList