import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Lube = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [lubeHistory, setLubeHistory] = useState([]);
  const [lubeData, setLubeData] = useState({
    date: "",
    product: "",
    customerName: "",
    qty: 0,
    gst: 0,
    perAmount: 0,
    
    amount: 0,
    paymentMode: "",

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLubeData({
    ...lubeData,
    [name]:
      name === "qty" || name === "gst" || name === "perAmount"
        ? Number(value)
        : value,
  });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/lube`, lubeData);
      Swal.fire("", "Entry Success", "success");
    } catch (error) {
      console.log(error.reposense);
      Swal.fire("", "Internal Server Error", "error");
    } finally {
      setLoading(false);
      getLubeHistory();
    }
  };
  const resetFun = () => {
    setLubeData({
      date: "",
      product: "",
      customerName: "",
      qty: 0,
      gst: 0,
      perAmount: 0,
      amount: 0,
      paymentMode: "",
    });
  };
  const getLubeHistory = async () => {
    try {
      const res = await axios.get(`${URL}/api/lube`);
      console.log(res.data.lubes);
      setLubeHistory(res.data.lubes)
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getLubeHistory();
  }, []);
  useEffect(() => {
  const qty = Number(lubeData.qty) || 0;
  const perAmount = Number(lubeData.perAmount) || 0;
  const gst = Number(lubeData.gst) || 0;

  const baseAmount = qty * perAmount;
  const gstAmount = baseAmount * (gst / 100);
  const totalAmount = baseAmount + gstAmount;

  setLubeData((prev) => ({
    ...prev,
    amount: totalAmount,
  }));
}, [lubeData.qty, lubeData.perAmount, lubeData.gst]);

const printRecipt = (item) =>{
  const HTMLTemplet= `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lubricant Receipt</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
    }
    .receipt {
      width: 350px;
      margin: 20px auto;
      padding: 15px;
      background: #fff;
      border: 1px solid #ccc;
    }
    .center {
      text-align: center;
    }
    .line {
      border-top: 1px dashed #000;
      margin: 10px 0;
    }
    .row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin: 4px 0;
      text-transform:uppercase;
    }
    .bold {
      font-weight: bold;
    }
    .small {
      font-size: 12px;
    }
    @media print {
      body {
        background: none;
      }
      .receipt {
        border: none;
      }
    }
  </style>
</head>
<body>

<div class="receipt">
  <div class="center bold">ABC Fuel Station</div>
  <div class="center small">Aurangabad, Maharashtra</div>
  <div class="center small">GSTIN: 27ABCDE1234F1Z5</div>

  <div class="line"></div>
  <div class="row"><span>Date:</span><span>${item.date}</span></div>
  

  <div class="line"></div>

  <div class="row"><span>Customer:</span><span>Walk-in</span></div>

  <div class="line"></div>

  <div class="row bold"><span>${item.product}</span><span>Amount</span></div>
  

  <div class="line"></div>

  <div class="row"><span>GST</span><span>${item.gst}%</span></div>
  <div class="row bold"><span>Total</span><span>₹531</span></div>

  <div class="line"></div>

  <div class="row"><span>Payment Mode</span><span>${item.paymentMode}</span></div>

  <div class="line"></div>

  <div class="center small">Thank You! Visit Again</div>
</div>

</body>
</html>
  `
  const newTab = window.open("","_blank");
  newTab.document.write(HTMLTemplet);
  newTab.document/close();
}
  return (
    <div className="lube">
      <h2>Lube Sold</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label>Date</label>
          <input
            type="date"
            value={lubeData.date}
            name="date"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product</label>
          <input
            type="text"
            value={lubeData.product}
            name="product"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Customer Name</label>
          <input
            type="text"
            value={lubeData.customerName}
            name="customerName"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Qty</label>
          <input
            type="number"
            value={lubeData.qty}
            name="qty"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>GST%</label>
          <input
            type="number"
            value={lubeData.gst}
            name="gst"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Per / Liter</label>
          <input
            type="number"
            value={lubeData.perAmount === 0 ? "" : lubeData.perAmount}
            name="perAmount"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={lubeData.amount === 0 ? "" : lubeData.amount}
            name="amount"
            readOnly
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Payment Mode</label>
          <select
            name="paymentMode"
            value={lubeData.paymentMode}
            required
            onChange={handleChange}
          >
            <option value="">OPTIONS</option>
            <option value="cash">CASH</option>
            <option value="upi">UPI</option>
            <option value="card">CARD</option>
          </select>
        </div>
        <div>
          {loading ? (
            <button disabled style={{ backgroundColor: "#91b1d3" }}>
              Submit
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
          <button type="reset" onClick={resetFun}>
            Clear
          </button>
        </div>
      </form>
      <table border={1}>
        <thead>
            <tr>
              <th> date</th>
              <th>product</th>
              <th>customer Name</th>
              <th>qty(L)</th>
              <th>gst</th>
              <th>per / Amount</th>
              <th>amount</th>
              <th>payment Mode</th>
            </tr>
        </thead>
        <tbody>
          {
            lubeHistory.map((item)=>
            <tr key={item._id}>
              <td>{item.date}</td>
              <td>{item.product}</td>
              <td style={{textTransform:"capitalize"}}>{item.customerName}</td>
              <td>{item.qty}</td>
              <td>{item.gst}%</td>
              <td>{item.perAmount}</td>
              <td>{item.amount}</td>
              <td style={{textTransform:"uppercase"}}>{item.paymentMode}</td>
              {/* <button onClick={()=> printRecipt(item)}>Print</button> */}
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Lube;
