import axios from "axios";
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import PrintBtn from "../components/PrintBtn.jsx";
import TankerDipTest from "../components/TankerDipTest.jsx";
const DipTest = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [loading,setLoading] = useState(false)
  const [display,setDisplay] = useState('tanker');
  const [searchMonth,setSearchMonth] = useState("");
  const [dipTestHistory,setDipTestHistory] = useState([]);
  const [filteredHistory,setFilteredHistory] = useState([])
  const [dipData, setDipdata] = useState({
    date: "",
    product: "",
    tank: "",
    openingStock: 0,
    receiptStock: 0,
    totalStock: 0,
    actualSale: 0,
    closingStock: 0,
    productDip: 0,
    actualDioStock: 0,
    variation: 0,
    waterDip: 0,
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  setDipdata((prev) => {
    const updated = {
      ...prev,
      [name]: value,
    };

    // Convert safely to numbers
    const opening = Number(updated.openingStock || 0);
    const receipt = Number(updated.receiptStock || 0);
    const sale = Number(updated.actualSale || 0);
    const actualDip = Number(updated.actualDioStock || 0);

    // 1. Total Stock
    updated.totalStock = opening + receipt;

    // 2. Closing Stock
    updated.closingStock = updated.totalStock - sale;

    // 3. Variation
    updated.variation = actualDip - updated.closingStock;

    return updated;
  });
};
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res =await axios.post(`${URL}/api/diptest`,dipData)
      console.log(res.data)
      Swal.fire("Sucess","DIP Test Data Added","success")
    } catch (error) {
      console.log(error.response)
      Swal.fire("Error","Internal Server Error","error")
    }finally{
      setLoading(false)
      getDipTestData();
      setDipdata({
        date: "",
    product: "",
    tank: "",
    openingStock: 0,
    receiptStock: 0,
    totalStock: 0,
    actualSale: 0,
    closingStock: 0,
    productDip: 0,
    actualDioStock: 0,
    variation: 0,
    waterDip: 0,
      })
    }
  };
  
  const filterDiptest = (e) =>{
    setSearchMonth(e.target.value)
    let filterMonth = e.target.value;
    let filter = dipTestHistory.filter((item)=> (String(item.date).includes(filterMonth)))
    setFilteredHistory(filter)
    console.log(filteredHistory)
  }
  const getDipTestData = async () => {
    try {
      const res = await axios.get(`${URL}/api/diptest`)
      setDipTestHistory(res.data.Diptextdata)
    } catch (error) {
      console.log(error.response)
    }
  }

  const resetFilter = () =>{
    setSearchMonth("")
    setFilteredHistory([])
  }
  useEffect(()=>{
    getDipTestData();
  },[])

  const onClear = () => {
    // Reset Button Function
    setDipdata({
      date: "",
      product: "",
      tank: "",
      openingStock: 0,
      receiptStock: 0,
      totalStock: 0,
      actualSale: 0,
      closingStock: 0,
      productDip: 0,
      actualDioStock: 0,
      variation: 0,
      waterDip: 0,
    });
  };
  const toggleDisplay = ()=>{
    if(display === 'daily'){
      setDisplay('tanker')
    }else{
      setDisplay('daily')
    }
  }
  return (
    <div className="diptest">
      
       <button type="button" className="toggle" onClick={toggleDisplay} >Tests</button> 
      {display == 'daily' && <form onSubmit={handleSubmit}>
          <h2>Daily Dip Test</h2>
        <div>
          <label htmlFor="">Date</label>
          <input
            type="date" required
            name="date"
            value={dipData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Product:</label>
          <input
            type="text" required
            name="product"
            value={dipData.product}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Tank</label>
          <input
            type="text" required
            name="tank"
            value={dipData.tank}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Opening Stock:</label>
          <input
            type="number" required
            name="openingStock"
            value={dipData.openingStock === 0 ? "" : dipData.openingStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Receipt Stock</label>
          <input
            type="number"
            name="receiptStock"
            value={dipData.receiptStock === 0 ? "" : dipData.receiptStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Total </label>
          
          <input
            type="number" readOnly
            name="totalStock" required
            value={dipData.totalStock === 0 ? "" : dipData.totalStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Actual Sales</label>
          <input
            type="number" 
            name="actualSale"
            value={dipData.actualSale === 0 ? "" : dipData.actualSale}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Closing Stock</label> {/*(total-actual sales)*/}
          <input
            type="number" required
            name="closingStock" readOnly
            value={dipData.closingStock === 0 ? "" : dipData.closingStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Product Dip</label>
          <input
            type="number"
            name="productDip"
            value={dipData.productDip === 0 ? "" : dipData.productDip}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Actual Dio Stock</label>
          <input
            type="number"
            name="actualDioStock"
            value={dipData.actualDioStock === 0 ? "" : dipData.actualDioStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Variation</label>
          <input
            type="number"
            name="variation"
            step="any"
            value={dipData.variation === 0 ? "" : dipData.variation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Water Dip</label>
          <input
            type="number"
            name="waterDip"
            value={dipData.waterDip === 0 ? "" : dipData.waterDip}
            onChange={handleChange}
          />
        </div>
        <div>
          { !loading ? <button type="submit">Submit</button> : <button disabled style={{backgroundColor:"#6f93fe"}} type="submit">Submit</button>}
          <button type="button" onClick={onClear}>
            Clear
          </button>
        </div>
      </form>}
      { display == 'daily' && <div className="searchbox">
      <input type="month" className="search-month" value={searchMonth} onChange={filterDiptest} />
      <button type="button" onClick={resetFilter}>Clear</button>
      </div>}

      {display == 'daily' && <table border={1}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Tank</th>
            <th>Opening stock</th>
            <th>receipt stock</th>
            <th>total stock</th>
            <th>Actual sale</th>
            <th>Closing stock</th>
            <th>Product Dip</th>
            <th>Actual Dio Stock</th>
            <th>Variation</th>
            <th>Water Dip</th>
          </tr>
        </thead>
        <tbody>
          { searchMonth === "" &&
            dipTestHistory.map((item)=>(
              <tr key={item._id}>
                <td>{item.date.split("-").reverse().join('/')}</td>
                <td>{item.product}</td>
                <td>{item.tank}</td>
                <td>{item.openingStock}</td>
                <td>{item.receiptStock}</td>
                <td>{item.totalStock}</td>
                <td>{item.actualSale}</td>
                <td>{item.closingStock}</td>
                <td>{item.productDip}</td>
                <td>{item.actualDioStock}</td>
                <td>{item.variation}</td>
                <td>{item.waterDip}</td>
              </tr>
               
            ))
          }
          { filteredHistory.length > 0 &&
            filteredHistory.map((hty)=>(
              <tr key={hty._id}>
                <td>{hty.date.split("-").reverse().join('/')}</td>
                <td>{hty.product}</td>
                <td>{hty.tank}</td>
                <td>{hty.openingStock}</td>
                <td>{hty.receiptStock}</td>
                <td>{hty.totalStock}</td>
                <td>{hty.actualSale}</td>
                <td>{hty.closingStock}</td>
                <td>{hty.productDip}</td>
                <td>{hty.actualDioStock}</td>
                <td>{hty.variation}</td>
                <td>{hty.waterDip}</td>
              </tr> 
            )) 
          }
          {
            filteredHistory.length === 0 && searchMonth !== "" &&
            <tr>
              <td colSpan={12}>No Data For this Month</td>
            </tr>
          }
        </tbody>
      </table> }
      {
        display == 'tanker'  && <TankerDipTest/>
      }
      <PrintBtn/>

    </div>
  );
};

export default DipTest;
