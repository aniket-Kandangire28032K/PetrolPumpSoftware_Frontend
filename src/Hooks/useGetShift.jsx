import axios from "axios";
import { useState, useEffect } from "react";

const useGetShift = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [shiftData, setShiftData] = useState([]);
  const [shiftDataError, setShiftDataError] = useState("");
  const [shiftDataLoading, setShiftDataLoading] = useState(false);

  const getShiftData = async () => {
    setShiftDataLoading(true)
    try {
      const res = await axios.get(`${URL}/api/shift`);
      setShiftData(res.data.shiftData);
      // console.log(res.data.shiftData)
      setShiftDataError("");
    } catch (error) {
      console.log(error);
      setShiftDataError(error.response);
      
    } finally {
      setShiftDataLoading(false);
    }
  };
  useEffect(() => {
    getShiftData();
  }, []);

  return { shiftData, shiftDataError, shiftDataLoading, getShiftData };
};

export default useGetShift;