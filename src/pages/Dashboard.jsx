// react icons
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { IoClose, IoPersonSharp } from "react-icons/io5";
import { FaAnglesDown } from "react-icons/fa6";
// Hooks + Custome Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetShift from "../Hooks/useGetShift";
import useCustomerList from "../Hooks/CustomerList.jsx";

//  Other imports
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../assets/URL.js";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { useGet } from "../Hooks/useGet.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const Backendurl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState("");
  const [fuel, setFuel] = useState({});
  const [shiftDataTop, setShiftDataTop] = useState([]);
  const navigate = useNavigate();
  const { customerList, success, getCustomers } = useCustomerList();
  const { shiftData, getShiftData } = useGetShift();
  const {data:Invoice} = useGet( `${URL}/api/invoice` )
  const {data:DipTest} = useGet( `${URL}/api/diptest` )

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
    getShiftData();
    if (shiftData) {
      setShiftDataTop(shiftData);
    }
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
      const res = await axios.patch(`${Backendurl}/api/fuel`, fuel);
      console.log(res.data.message);
      Swal.fire("", res.data.message, "success");
    } catch (error) {
      console.log(error);
    } finally {
      getProducts();
      setDisplay("");
    }
  };
  return (
    <div className="home">

      <div className="grid">
        <div className="status">
          <div>
            <BsFillFuelPumpFill size={80} color="white" />
            <div>
              <h1>{products.length}</h1>
              <p>Type of Fuels</p>
            </div>
          </div>
          <div>
            <IoPersonSharp size={70} color="white" />
            <div>
              <h1>{String(customerList?.length) ?? "NA"}</h1>
              <p>Customers on credit</p>
            </div>
          </div>
        </div>
         {products.length > 0 && (
          <div className="chart-area">
            <h3>Fuels</h3>
            <Pie data={Data} options={Pieoptions} />
          </div>
        )}

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
                  <td>
                    {String(item.lastupdatedate)
                      .split("-")
                      .reverse()
                      .join("-") || " "}
                  </td>
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
                      <td>
                        <input
                          type="number"
                          step="any"
                          min={0}
                          value={fuel[item.name] ?? item.rate}
                          onChange={(e) => {
                            setFuel((prev) => ({
                              ...prev,
                              [item.name]: Number(e.target.value),
                            }));
                          }}
                        />
                      </td>
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

       

        <div className="shift-Data">
          <h3>Shift Data</h3>
          <div className="table-wrapper">
            {shiftData && (
              <table border={1}>
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Cashier</th>
                    <th>Shift</th>
                    <th>Remaining / Total </th>
                  </tr>
                  {shiftData.slice(0, 10).map((item) => (
                    <tr key={item._id}>
                      <td>{item.date}</td>
                      <td>{item.name}</td>
                      <td>{item.cashier}</td>
                      <td>{item.shift}</td>
                      <td>
                        {item.remainingAmount} / {item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button className="nav-btn" onClick={() => navigate("/shift")}>
             View More
              <FaAnglesDown />
            </button>
          </div>
        </div>

        <div className="invoice-section">
          <h3>Invoices</h3>
          <table border={1}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Company</th>
                <th>Invoice</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
          {
            Invoice?.invoice.slice(0,6).map( invo => 
              <tr key={invo._id}>
                <td>{invo.date}</td>
                <td>{invo.companyname}</td>
                <td>{invo.invoiceno}</td>
                <td>{invo.finaltotal}</td>
              </tr>
            )
          }
          </tbody>
          <tfoot>
            <tr>
              <td style={{textAlign:'end'}} colSpan={4}><button className="more-btn" onClick={()=> navigate('/manage-invoice')}>View More<FaAnglesDown/></button></td>
            </tr>
          </tfoot>
          </table>
        </div>

        <div className="dip-tests">
          <h3>Dip Test Data</h3>
          <table border={1}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Tank</th>
                <th>Opening</th>
                <th>Closing</th>
                <th>variation</th>
              </tr>
            </thead>
            <tbody>
              { DipTest?.Diptextdata.length > 0 &&
                DipTest?.Diptextdata.slice(0,5).map( test => 
                  <tr key={test._id}>
                    <td>{test.date}</td>
                    <td>{test.product}</td>
                    <td>{test.tank}</td>
                    <td>{test.openingStock}</td>
                    <td>{test.closingStock}</td>
                    <td>{test.variation}</td>
                  </tr>
                )
              }  
              <tr>
                <td colSpan={5}></td>
                <td>
              <button className="more-btn" onClick={()=> navigate('/diptest')}>View More <FaAnglesDown/> </button>

                </td>
              </tr>
            </tbody>
            
          </table>

        </div>


      </div>
    </div>
  );
};

export default Dashboard;
