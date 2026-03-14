import axios from "axios";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";

const TopNavbar = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [details,setDetails] = useState([])
  const hideNavbar = () => {
    const btn = document.querySelector("nav");
    const main = document.querySelector("main");
    btn.classList.toggle("hide");
    main.classList.toggle("main");
  };
  const getRates = async()=>{
    try {
      const res = await axios.get(`${URL}/api/fuel`)
      setDetails(res.data.fuelData)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(()=>{
    getRates();
  },[])
  return (
    <div className="top-bar">
      <button onClick={hideNavbar}>
        <IoMenu size={30} />
      </button>
      <p>{
        details.map(item => (
          <span key={item._id}>
            {item.name} - {item.liters}l - Rate:₹ {item.rate}
          </span>
        ))
      }
      </p>
    </div>
  );
};

export default TopNavbar;
