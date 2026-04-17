import axios from "axios";
import { useState, useEffect } from "react";
import URL from "../assets/URL.js";

const useGetLubePurchase = () => {
  const [LubeData, setLubeData] = useState([]);
  const [msg, setMsg] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(`${URL}/api/lube-purchase`);
      setLubeData(res.data.invoices);
      // console.log(res.data)
      setMsg("Data fetched successfully");
      
    } catch (error) {
      console.error(error);
      setMsg("Failed to fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { LubeData, msg, getData };
};

export default useGetLubePurchase;