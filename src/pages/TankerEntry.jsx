import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

const TankerEntry = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const today = new Date().toISOString().split("T")[0]
  const [formData, setFormData] = useState({
    date:today,
    companyname: "",
    invoiceno: "",
    invoicedate: "",
    deliverydate: "",
    challanno: "",
    challandate: "",
    gstno: "",
    transportername: "",
    transportnumber:"",
    transportercontact: "",
    remark: "",
    items: [{ itemname: "", qty: "", rate: "", total: ""}],
    finaltotal: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev=>{
      
     return {
      ...prev,
      [name]: value,
    }});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`${URL}/api/invoice`, formData);
      Swal.fire("","Invoice Added","success");
    } catch (error) {
      console.log(error);
    } 
    finally {
      setFormData({
        companyname: "",
        invoiceno: "",
        invoicedate: "",
        deliverydate: "",
        challanno: "",
        challandate: "",
        gstno: "",
        transportername: "",
        transportercontact: "",
        transporternumber: "",
        dlycharge: "",
        remark: "",
        finaltotal: "",
        items: [
          {
            itemname: "",
            qty: "",
            rate: "",
            total: "",
            vat:""
          },
        ],
      });
    }
  };
  const addItem = () => {
    
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          itemname: "",
          qty: "",
          rate: "",
          dlycharge: "",
          total: "",
          vat:""
        },
      ],
    });
  };
  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };
  useEffect(() => {
    let total = formData.items.reduce((sum, item) => sum + item.total, 0);
    setFormData((prev) => ({
      ...prev,
      finaltotal: Number(total),
    }));
  }, [formData.items]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];

    updatedItems[index][field] = value;

    if (field === "qty" || field === "rate" || field === "vat") {
    const qty = Number(updatedItems[index].qty || 0);
    const rate = Number(updatedItems[index].rate || 0);
    const vat = Number(updatedItems[index].vat || 0);
    const Vatmount = Number((vat / 100) * (qty * rate))  
    updatedItems[index].total = Number(Vatmount) + Number( qty * rate);
  }
    
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  useEffect(()=>{
    let total = formData.items.reduce((sum,item)=> sum+item.total,0)
    setFormData({
      ...formData,
      finaltotal:total
    })
  },[])
  return (
    <div className="tanker-entry">
      <h1>Invoice Form</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label>Company Name:</label>
          <input type="text" name="companyname"  value={formData.companyname} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="">Invoice No:</label>
          <input type="text" name="invoiceno" onChange={handleChange} value={formData.invoiceno}/>
        </div>
        <div>
          <label htmlFor="">Invoice Date:</label>
          <input type="date" name="invoicedate" onChange={handleChange} value={formData.invoicedate} />
        </div>
        <div>
          <label htmlFor="">Delivery Date:</label>
          <input type="date" name="deliverydate" onChange={handleChange} value={formData.deliverydate}/>
        </div>
        <div>
          <label htmlFor="">Challan No:</label>
          <input type="text" name="challanno" onChange={handleChange} value={formData.challanno}/>
        </div>
        <div>
          <label htmlFor="">Challan Date:</label>
          <input type="date" name="challandate" onChange={handleChange} value={formData.challandate}/>
        </div>
        <div>
          <label htmlFor="">GST No:</label>
          <input type="text" name="gstno" onChange={handleChange} value={formData.gstno}/>
        </div>
        <div>
          <label htmlFor="">Transporter Name</label>
          <input type="text" name="transportername" onChange={handleChange} value={formData.transportername} />
        </div>
        <div>
          <label htmlFor="">Transport Contact</label>
          <input type="number" maxLength={10} name="transportercontact" onChange={handleChange} value={formData.transportercontact} />
        </div>
        <div>
          <label htmlFor="">Vehicle No:</label>
          <input type="text" name="transportnumber" onChange={handleChange} value={formData.transportnumber} />
        </div>
        <div>
          <label>Delivery Charges</label>
          <input type="number"  min={0} value={formData.dlycharge} name="dlycharge"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Remark:</label>
          <input type="text" name="remark" onChange={handleChange} value={formData.remark}/>
        </div>
        <div className="items">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Item name</th>
                <th>qty(l)</th>
                <th>rate</th>
                <th>VAT(%)</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {formData?.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <button
                      type="button"
                      className="del-btn"
                      onClick={() => removeItem(index)}
                    >
                      <IoClose />
                    </button>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.itemname}
                      onChange={(e) => {
                        handleItemChange(index, "itemname", e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.qty}
                      min={0}
                      onChange={(e) => {
                        handleItemChange(index, "qty", e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.rate}
                      min={0}
                      onChange={(e) => {
                        handleItemChange(index, "rate", e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.vat}
                      min={0}
                      onChange={(e) => {
                        handleItemChange(index, "vat", e.target.value);
                      }}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={item.total}
                      min={0}
                      onChange={(e) => {
                        handleItemChange(index, "total", e.target.value);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <button className="add-btn" type="button" onClick={addItem}>
                    +add
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <h3>Total: ₹ {formData.finaltotal}</h3>
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default TankerEntry;
