import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

const TankerEntry = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    companyname: "",
    invoiceno: "",
    invoicedate: "",
    deliverydate: "",
    challanno: "",
    challandate: "",
    gstno: "",
    transportername: "",
    transportercontact: "",
    remark: "",
    items: [{ itemname: "", qty: "", rate: "", total: ""}],
    finaltotal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`${URL}/api/invoice`, formData);
      Swal("Data Added");
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
        dlycharge: "",
        remark: "",
        items: [
          {
            itemname: "",
            qty: "",
            rate: "",
            total: "",
            
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

    if (field === "qty" || field === "rate") {
      updatedItems[index].total =
        Number(updatedItems[index].qty || 0) *
        Number(updatedItems[index].rate || 0);
    }

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };
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
          <label htmlFor="">Delv Contact No:</label>
          <input
            type="text" value={formData.transportercontact}
            name="transportercontact"
            onChange={handleChange}
          />
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
                <th>qty</th>
                <th>rate</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
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
                      type="num"
                      value={item.qty}
                      min={0}
                      onChange={(e) => {
                        handleItemChange(index, "qty", e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="num"
                      value={item.rate}
                      min={0}
                      onChange={(e) => {
                        handleItemChange(index, "rate", e.target.value);
                      }}
                    />
                  </td>

                  <td>
                    <input
                      type="num"
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
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default TankerEntry;
