import { useEffect, useState } from "react";
import { useGet } from "../Hooks/useGet.jsx";
import useGetShift from "../Hooks/useGetShift.jsx";
import useGetLube from "../Hooks/useGetLube.jsx";
import axios from "axios";
import PrintBtn from "../components/PrintBtn.jsx";
const CAReportPage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const filterDate = `${date.getFullYear()}-${month}`;
  const { shiftData, getShiftData } = useGetShift();
  const {lubeData,lubeError} = useGetLube()
  const [expenses, setExpenses] = useState([]);
  const [lube_Data, setLube_Data] = useState([]);
  const [totalValues, setTotalValues] = useState({
    totalSales: 0,
    totalExpenses: 0,
    totalCredits: 0,
    totalLubes:0
  });
  // const [sales, setSales] = useState([]);
  let filterData = [];

  const getExpenses = async () => {
    try {
      const res = await axios.get(`${URL}/api/expenses`);
      let filterExpenses= res.data.expenses.filter((item) => (String(item.date).includes(filterDate)))
      const expens = filterExpenses.reduce((acc,item)=>{
        if(!acc[item.category]){
          acc[item.category] = 0
        }
         acc[item.category] += item.amount
        return acc
      },{})
      const totalexpenses = Object.values(expens).reduce((sum,val)=> sum + val,0)
      setExpenses(expens);
      setTotalValues(prev=>({...prev,totalExpenses:totalexpenses}))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!shiftData) return;
    filterData = shiftData.filter((e) => e.date.includes(filterDate));
    const SaleTotal = filterData.reduce((sum, s) => sum += s.total, 0);
    console.log(SaleTotal)
    setTotalValues(prev => ({ ...prev, totalSales: SaleTotal }));

  }, [shiftData]);
  
  useEffect(()=>{
    if(!lubeData) return;
    let lubes = lubeData.filter(item => item.date.includes(filterDate));
    setLube_Data(lubes);
    let total_Lube =  lubes.reduce( (sum,item)=> sum+= item.amount ,0)
    setTotalValues(prev=>({
      ...prev,
      totalLubes:total_Lube
    }))

  },[lubeData])
  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <div className="ca-report">
      <h2>CA Financial Report</h2>

      {/* Sales Summary */}
      <h3>Sales Summary</h3>
      <table border="1"width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Fuel</th>
            <th>Qty (L)</th>
            <th>Rate (₹/L)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {shiftData?.map((e) =>
            e.nozels.map((data, num) => (
              <tr key={num}>
                <td>{e.date}</td>
                <td style={{ textTransform: "capitalize" }}>{data.fuel}</td>
                <td>{data.sale}</td>
                <td>{data.rate}</td>
                <td>{data.salerate}</td>
              </tr>
            )),
          )}
          <tr>
            <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold",paddingRight:"0.5rem" }}>
              Total Sales:
            </td>
            <td style={{ fontWeight: "bold" }}>{totalValues.totalSales}</td>
          </tr>
        </tbody>
      </table>
      <br />

      {/* Expenses Summary */}
      
      <h3 style={{marginBottom:"0.2rem"}}>Lube Summary</h3>    
      <table border={1} width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            {/* <th>Customer</th> */}
            <th>Qty</th>
            <th>gst(%)</th>
            <th>Per-unit (₹)</th>
            <th>Payment Mode</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          { lube_Data && lube_Data.map(lube => 
          <tr key={lube._id}>
            <td>{lube.date}</td>
            <td>{lube.product}</td>
            <td>{lube.qty}</td>
            <td>{lube.gst}</td>
            <td>{lube.perAmount}</td>
            <td style={{textTransform:"uppercase"}}>{lube.paymentMode}</td>
            <td>{lube.amount}</td>
          </tr>)
          }
          { lubeError &&  <tr>
              <td colSpan={7}>No Data For This Month</td>
            </tr>}
        </tbody>
        <tfoot>
          <tr >
            <td colSpan={6} style={{ textAlign: "right", fontWeight: "bold",paddingRight:"0.5rem" }}>Total Lube Sales:</td>
            <td style={{textAlign:"center",fontWeight:"bold"}}>{totalValues.totalLubes || 0}</td>
            
          </tr>
        </tfoot>
      </table>
      <br />
      <h3>Expenses Summary</h3>
      <table border="1" cellPadding="10" width="50%">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(expenses).map(([category,amount]) =>(
              <tr key={category}>
                <td style={{ textTransform: "capitalize" }}>{category}</td>
                <td>{amount}</td>
              </tr>
            ))
          }
          <tr>
            <td style={{ textAlign: "right", fontWeight: "bold",paddingRight:"0.5rem" }}>
              Total Expenses:
            </td>
            <td style={{ fontWeight: "bold" }}>{totalValues.totalExpenses}</td>
          </tr>
        </tbody>
      </table>
          <PrintBtn/>
    </div>
  );
};

export default CAReportPage;
