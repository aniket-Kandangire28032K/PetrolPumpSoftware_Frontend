import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const LubePurches = () => {
  const date = new Date().toISOString().split("T")[0]
  const URL = import.meta.env.VITE_VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [lubeData, setLubeData] = useState({
    date: date,
    companyName: "",
    productList: [
      {
        productName: "",
        productstock: "",
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
  const handleProductEdit = (name,index,value) =>{
    //  product Edit 
    setLubeData(
        prev => {
            const list = [...prev.productList]
            list[index]={
                ...list[index],
                [name]:value
            }
            return {
                ...prev,
                productList:list
            }
        }
    )
  }
  const handleProductAdd = () => {
    // Add Product to the list
    setLubeData((prev) => ({
      ...prev,
      productList: [
        ...(prev.productList || []),
        {
          productName: "",
          productstock: "",
          perProductQty: "",
          perProductRate: "",
          gstPer: 0,
          gstAmount: 0,
          productTotal: 0,
        },
      ],
    }));
  };
  const HandleProductDelete = (index)=>{
    // Delete Product from List
    setLubeData(
        prev => ({
            ...prev,
            productList:prev.productList.filter((_,productIndex)=> productIndex !== index)
        })
    )
  }

  const HandleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
        // const res = await axios.post(`${URL}/api/lube-perchase`)
       Swal.fire({
        toast:true,
        position:'top-right',

       }) 
    } catch (error) {
        console.log(error.response)
    }finally{
       setLoading(false)
       setLubeData({
          date: "",
    companyName: "",
    productList: [
      {
        productName: "",
        productstock: "",
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
       }) 
    }
  }
  return (
    <div className="lube-purches">
      <h1>Lube Purches</h1>
      <form onSubmit={HandleSubmit}>
        <div className="inputfield">
          <label htmlFor="">Date</label>
          <input type="date" value={lubeData.date} />
        </div>
        <div className="inputfield">
          <label htmlFor="">Company Name</label>
          <input type="text" value={lubeData.companyName}/>
        </div>
        <div className="inputfield">
          <label htmlFor="">Invoice No.</label>
          <input type="date" value={lubeData.invoiceNo}/>
        </div>
        <div className="inputfield">
          <label htmlFor="">Invoice Date</label>
          <input type="text" value={lubeData.invoiceNo}/>
        </div>
        <div className="product-list">
            <h3>Product List</h3>
          {lubeData.productList.map((prod, num) => (
            <div key={num} className="product-detials">
              <div className="inputfield" >
                <label htmlFor="">Product Name</label>
                <input type="text" value={prod.productName} onChange={e=>handleProductEdit('productName',num,e.target.value)}/>
              </div>
              <div className="inputfield">
                <label htmlFor="">Per Product qty</label>
                <input type="text" value={prod.perProductQty} onChange={e=>handleProductEdit('perProductQty',num,e.target.value)}/>
              </div>
              <div className="inputfield">
                <label htmlFor="">per Product Rate</label>
                <input type="text" value={prod.perProductRate} onChange={e=>handleProductEdit('perProductRate',num,e.target.value)}/>
              </div>
              <div className="inputfield">
                <label htmlFor="">GST (%)</label>
                <input type="text" value={prod.gstPer} onChange={e=>handleProductEdit('gstPer',num,e.target.value)}/>
              </div>
              <div className="inputfield">
                <label htmlFor="">GST Amount </label>
                <input type="text" value={prod.gstAmount} onChange={e=>handleProductEdit('gstAmount',num,e.target.value)}/>
              </div>
              <div className="inputfield">
                <label htmlFor="">Product Total</label>
                <input type="text" value={prod.productTotal} onChange={e=>handleProductEdit('productTotal',num,e.target.value)}/>
              </div>
              <button type="button" className="del-btn" onClick={()=> HandleProductDelete(num)}>Del</button>
            </div>
          ))}
          <div>

          <button type="button" className="add-btn" onClick={handleProductAdd}>
            Add Product
          </button>
          </div>
        </div>
        <div>
            <p><strong>Total GST: Rs.</strong></p>
            <p><strong>Total Amount: Rs.</strong></p>
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
    </div>
  );
};

export default LubePurches;
