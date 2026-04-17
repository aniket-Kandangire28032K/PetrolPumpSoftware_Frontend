import axios from "axios";
import { useEffect, useState } from "react";
import useGetLubePurchase from "../Hooks/useGetLuberperchase.jsx";
import URL from "../assets/URL.js";
import Swal from "sweetalert2";
import SelectedInvoice from "../components/SelectedInvoice.jsx";
const LubePurches = () => {
  // Custome Hook
  const { LubeData,getData} = useGetLubePurchase();

  // const date = new Date().toISOString().split("T")[0];
  const [display, setDisplay] = useState("form");
  const [loading, setLoading] = useState(false);
  const [lubeData, setLubeData] = useState({
    date: "",
    companyName: "",
    invoiceNo: "",
    invoiceDate: "",
    gstNo: "",
    productList: [
      {
        productName: "",
        productStock: "",
        perProductQty: "",
        perProductRate: "",
        gstPer: 0,
        gstAmount: 0,
        productTotal: 0,
      },
    ],
    totalPrice: 0,
  });
  const [invoice,setInvoice] = useState()
  const handleProductEdit = (name, index, value) => {
    setLubeData((prev) => {
      const list = [...prev.productList];

      // update the field first
      list[index] = {
        ...list[index],
        [name]: value,
      };

      // extract updated values
      const stock = Number(list[index].productStock) || 0;
      const rate = Number(list[index].perProductRate) || 0;
      const gstPer = Number(list[index].gstPer) || 0;

      // correct calculation (should be multiplication, not addition)
      const totalAmount = stock * rate;

      const gstAmount = (gstPer * totalAmount) / 100;
      const productTotal = Number(totalAmount) + Number(gstAmount);

      // update calculated fields
      list[index].gstAmount = Number(gstAmount);
      list[index].productTotal = Number(productTotal);

      return {
        ...prev,
        productList: list,
      };
    });
  };
  const handleProductAdd = () => {
    // Add Product to the list
    setLubeData((prev) => ({
      ...prev,
      productList: [
        ...(prev.productList || []),
        {
          productName: "",
          productStock: "",
          perProductQty: "",
          perProductRate: "",
          gstPer: 0,
          gstAmount: 0,
          productTotal: 0,
        },
      ],
    }));
  };
  const HandleProductDelete = (index) => {
    // Delete Product from List
    setLubeData((prev) => ({
      ...prev,
      productList: prev.productList.filter(
        (_, productIndex) => productIndex !== index,
      ),
    }));
  };

  const HandleSubmit = async (e) => {
    // *  Submit Function 
    e.preventDefault();
    setLoading(true);
    console.log(lubeData)
    try {
      const res = await axios.post(`${URL}/api/lube-purchase`,lubeData)
      console.log(res.data)
      Swal.fire({
        toast: true,
        position: "top-end",
        text: "Invoice Saved",
        background: "#00af00",
        color: "#fff",
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: true,
      });
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        toast: true,
        position: "top-end",
        text: "Internal Server Error",
        background: "#af0000",
        color: "#fff",
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: true,
      })
    } finally {
      setLoading(false);
      setLubeData({
        date: "",
        companyName: "",
        productList: [
          {
            productName: "",
            productStock: "",
            perProductQty: "",
            perProductRate: "",
            gstPer: 0,
            gstAmount: 0,
            productTotal: 0,
          },
        ],
        invoiceNo: "",
        invoiceDate: "",
        gstNo: "",
        totalPrice: 0,
      });
      getData();
    }
  };

  const DeleteInvoice = async(id) =>{
    if(!id) return;
    try {
      const goForDelete = await Swal.fire({
        title:'Are you sure?',
        text:"Do you really want to delete this Invoice ? This prosess cannot be undone ",
        icon:"error",
        confirmButtonColor:"#d30b0b",
        confirmButtonText:"Delete",
        showCancelButton:true
      })
      
      if(goForDelete.isConfirmed ){
        // console.log(`${URL}/api/lube-purchase${id}`)
        const del = await axios.delete(`${URL}/api/lube-purchase/${id}`)
        Swal.fire({
          toast:true,
          showConfirmButton:false,
          position:"top-end",
          title:"Invoice Deleted.",
          background:"#00af00",
          showCloseButton:true,
          timer:2000,
          timerProgressBar:true,
          color:"white",
        })
      }

    } catch (error) {
      console.log(error)
       Swal.fire({
          toast:true,
          showConfirmButton:false,
          icon:"error",
          position:"top-end",
          title:"Try agin later...",
          background:"#af0000",
          showCloseButton:true,
          timer:2000,
          timerProgressBar:true,
          color:"white",
          
        })
    }finally{
      getData();
    }
  }
  useEffect(()=>{
    if(!LubeData){
      getData();
    }
  },[LubeData])
  useEffect(()=>{
    let total = lubeData.productList.reduce((sum,item)=> sum+Number(item.productTotal) || 0 , 0);
    setLubeData( prev =>{
      return{
        ...prev,
        totalPrice:total,
      }
    })

  },[lubeData.productList])
  
  const toggleDisplay = () =>{
    // toggle View
    if(display === 'form'){
      setDisplay("list")
    }else{
      setDisplay("form")
    }
  }
  return (
    <div className="lube-purches">
      <h1>Lube Purches</h1>
      <div className="btns">
        <button type="button" onClick={toggleDisplay}>
          { display === 'form' ?  "Lube History" : "Lube Form" }
        </button>
        
      </div>
      {display === "form" && (
        <form onSubmit={HandleSubmit}>
          <div className="inputfield">
            <label htmlFor="">Date</label>
            <input
              type="date"
              value={lubeData.date}
              onChange={(e) =>
                setLubeData((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </div>
          <div className="inputfield">
            <label htmlFor="">Company Name</label>
            <input
              type="text"
              value={lubeData.companyName}
              onChange={(e) =>
                setLubeData((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
            />
          </div>
          <div className="inputfield">
            <label htmlFor="">Invoice No.</label>
            <input
              type="text"
              value={lubeData.invoiceNo}
              onChange={(e) =>
                setLubeData((prev) => ({ ...prev, invoiceNo: e.target.value }))
              }
            />
          </div>
          <div className="inputfield">
            <label htmlFor="">Invoice Date</label>
            <input
              type="date"
              value={lubeData.invoiceDate}
              onChange={(e) =>
                setLubeData((prev) => ({
                  ...prev,
                  invoiceDate: e.target.value,
                }))
              }
            />
          </div>
          <div className="inputfield">
            <label htmlFor="">GST No.</label>
            <input
              type="text"
              value={lubeData.gstNo}
              onChange={(e) =>
                setLubeData((prev) => ({
                  ...prev,
                  gstNo: e.target.value,
                }))
              }
            />
          </div>
          <div className="product-list">
            <h3>Product List</h3>
            {lubeData.productList.map((prod, num) => (
              <div key={num} className="product-detials">
                <div className="inputfield">
                  <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                    value={prod.productName}
                    onChange={(e) =>
                      handleProductEdit("productName", num, e.target.value)
                    }
                  />
                </div>
                <div className="inputfield">
                  <label htmlFor="">Per Product qty</label>
                  <input
                    type="number"
                    value={prod.perProductQty}
                    onChange={(e) =>
                      handleProductEdit("perProductQty", num, Number(e.target.value))
                    }
                  />
                </div>
                <div className="inputfield">
                  <label htmlFor="">Product Stock</label>
                  <input
                    type="number"
                    value={prod.productStock}
                    onChange={(e) =>
                      handleProductEdit("productStock", num, Number(e.target.value))
                    }
                  />
                </div>
                <div className="inputfield">
                  <label htmlFor="">per Product Rate</label>
                  <input
                    type="number"
                    value={prod.perProductRate}
                    onChange={(e) =>
                      handleProductEdit("perProductRate", num, Number(e.target.value))
                    }
                  />
                </div>
                <div className="inputfield">
                  <label htmlFor="">GST (%)</label>
                  <input
                    type="number"
                    value={prod.gstPer}
                    onChange={(e) =>
                      handleProductEdit("gstPer", num, Number(e.target.value))
                    }
                  />
                </div>
                <div className="inputfield">
                  <label htmlFor="">GST Amount(₹) </label>
                  <input
                    type="number"
                    disabled
                    value={prod.gstAmount}
                    onChange={(e) =>
                      handleProductEdit("gstAmount", num, e.target.value)
                    }
                  />
                </div>
                <div className="inputfield">
                  <label htmlFor="">Product Total</label>
                  <input
                    type="number"
                    value={prod.productTotal}
                    disabled
                    onChange={(e) =>
                      handleProductEdit("productTotal", num, e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  className="del-btn"
                  onClick={() => HandleProductDelete(num)}
                >
                  Del
                </button>
              </div>
            ))}
            <div>
              <button
                type="button"
                className="add-btn"
                onClick={handleProductAdd}
              >
                Add Product
              </button>
            </div>
          </div>
          <div>
            <p>
              <strong>Total Amount: Rs.{lubeData.totalPrice}</strong>
            </p>
          </div>
          <div className="btn-grp">
            <button
              type="submit"
              disabled={loading}
              style={loading ? { opacity: 0.3 } : { opacity: 1 }}
            >
              Submit
            </button>
            <button type="button">Reset</button>
          </div>
        </form>
      )}
      {display === "list" && (
        <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Company Name</th>
              <th>Invoice No.</th>
              <th>Invoice Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
              {LubeData.length === 0 && <td colSpan={5} style={{ textAlign: "center",padding:"0.5rem",fontWeight:"500",fontSize:'2rem' }}>
                No Data
              </td>}
              {
                LubeData.map((item)=>(
                  <tr key={item._id}>
                    <td>{item.date.split("-").reverse().join('/')}</td>
                    <td>{item.companyName}</td>
                    <td>{item.invoiceNo}</td>
                    <td>{item.invoiceDate.split("-").reverse().join('/')}</td>
                    <td>{item.totalPrice} <button type="button" disabled={loading} onClick={()=> setInvoice(item)}>View</button> | <button type="button" disabled={loading} onClick={()=> DeleteInvoice(item._id)} >Delete</button></td>
                  </tr>
                ))
              }
            
          </tbody>
        </table>
        {invoice && <SelectedInvoice invoice={invoice} setInvoice={setInvoice}/>}
        </div>
      )}

    </div>
  );
};

export default LubePurches;
