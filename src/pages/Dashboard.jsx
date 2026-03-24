import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { IoClose, IoPersonSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const Backendurl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState("");
  const [fuel,setFuel] = useState({})
  const navigate = useNavigate();
  
  const getProducts = async () => {
    try {
      const res = await axios.get(`${Backendurl}/api/fuel`);
      setProducts(res.data.fuelData);
    } catch (error) {
      console.log(error);
      Swal.fire("internal server error");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const Data = {
    labels: products.map((fuel) => fuel.name.toUpperCase()),
    datasets: [
      {
        // label: "Liters",
        data: products.map((fuel) => fuel.liters),
        backgroundColor: [
          "#22C55E",
          "#F97316",
          "#4F46E5",
          "#EF4444",
          "#06B6D4",
        ],
      },
    ],
    borderWidth: 1,
  };

  const Pieoptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const updatePrice = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${Backendurl}/api/fuel`,fuel)
      console.log(res.data.message)
      Swal.fire("",res.data.message,"success")
    } catch (error) {
      console.log(error)
    }finally{
      getProducts();
      setDisplay("")
    }
  }
  return (
    <div className="home">
      <div className="status">
        <div onClick={() => navigate("/fuel-manage")}>
          <BsFillFuelPumpFill size={80} color="white" />
          <div>
            <h1>{products.length}</h1>
            <p>Type of Fuels</p>
          </div>
        </div>
        <div onClick={() => navigate("/supplier-manage")}>
          <MdLocalShipping size={80} color="white" />
          <div>
            <h1>3</h1>
            <p>Total Suppliers</p>
          </div>
        </div>
        <div onClick={() => navigate("/manage-invoice")}>
          <FaFileInvoice size={70} color="white" />
          <div>
            <h1>5</h1>
            <p>Total Invoices</p>
          </div>
        </div>
        <div onClick={() => navigate("/customer")}>
          <IoPersonSharp size={70} color="white" />
          <div>
            <h1>5</h1>
            <p>Total Customers</p>
          </div>
        </div>
      </div>
      
      <div className="rates">
        <h3>Fuel Rates</h3>
        <table border={1}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Rate</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, num) => (
              <tr key={num}>
                <td>{num + 1}</td>
                <td>{item.name}</td>
                <td>{item.rate}</td>
                <td>{String(item.lastupdatedate).split("-").reverse().join("-") || " "}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="edit"
          onClick={() => setDisplay("rates")}
          type="button"
        >
          Edit
        </button>
        {display === "rates" && (
          <form className="rates-edit" onSubmit={updatePrice}>
            <h3>Edit Prices</h3>
            <table border={1}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Rate</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, num) => (
                  <tr key={item._id}>
                    <td>{num + 1}</td>
                    <td>{item.name}</td>
                    <td><input type="number" step="any" min={0} value={fuel[item.name] ?? item.rate} onChange={(e)=>{
                      setFuel(prev =>
                      ({
                        ...prev,
                        [item.name]:Number(e.target.value)}
                      )
                      )
                    }} /></td>
                    <td>{item.lastupdatedate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button type="submit">Submit</button>
            <button type="button" onClick={() => setDisplay("")}>
              Close
            </button>
          </form>
        )}
        
      </div>
      <div className="chart-area">
        <Pie data={Data} options={Pieoptions} />
      </div>
    </div>
  );
};

export default Dashboard;
