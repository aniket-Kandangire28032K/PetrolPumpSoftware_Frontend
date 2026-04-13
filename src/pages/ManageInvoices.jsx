import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageInvoices = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceEdit, setInvoiceEdit] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({
    challandate: "",
    challanno: "",
    companyname: "",
    deliverydate: "",
    dlycharge: 0,
    finaltotal: 0,
    gstno: "",
    invoicedate: "",
    invoiceno: "",
    items: [],
    remark: "",
    transportname: "",
    transportnumber: "",
  });
  const getInvoice = async () => {
    try {
      const res = await axios.get(`${URL}/api/invoice`);
      setInvoiceData(res.data.invoice);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getInvoice();
  }, []);
  const printInvoice = (item) => {
    const invoice = `<html>
    <title>Invoice</title>
    <style>
    p{
    padding-left:2rem;
    font-weight:500;
    }
    @media print{
      .print-btn{
      display:none;
      }
    }
    </style>
    <body>
      <p>Date${item.date}</p>
      <p>Company Name:${item.companyname}</p>
      <p>Invoice No:${item.invoiceno}</p>
      <button class="print-btn" onclick="window.print()">Print</button>
    </body>
    </html>`;

    const newTab = window.open("", "_blank");
    newTab.document.write(invoice);
    newTab.document.close();
  };
  const openEditOption = (item) => {
    setInvoiceEdit(true);
    setInvoiceDetails(item);
    console.log(item);
  };
  const closeEditOption = () => {
    setInvoiceEdit(false);
    setInvoiceDetails({});
  };
  const addItem = () => {
    setInvoiceDetails((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemname: "",
          qty: 0,
          rate: 0,
          vat: 0,
          total: 0,
        },
      ],
    }));
  };
  const deleteProduct = (index) => {
    setInvoiceDetails((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (!invoiceData) return;
    setInvoiceDetails((prev) => ({
      ...prev,
      finaltotal: (prev.items || []).reduce(
        (sum, item) => (sum += item.total),
        0,
      ),
    }));
  }, [invoiceDetails.items]);

  const productChange = (index, field, value) => {
    let a = invoiceDetails.items[index];
    setInvoiceDetails((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };
  const UpdateInvoice = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${URL}/api/invoice`, invoiceDetails);
      console.log(invoiceDetails._id);
      Swal.fire("success", "Update successful", "success");
    } catch (error) {
      console.log(error.response);
    } finally {
      getInvoice();
      setInvoiceEdit(false);
      setInvoiceDetails({
        challandate: "",
        challanno: "",
        companyname: "",
        deliverydate: "",
        dlycharge: 0,
        finaltotal: 0,
        gstno: "",
        invoicedate: "",
        invoiceno: "",
        items: [],
        remark: "",
        transportname: "",
        transportnumber: "",
      });
    }
  };
  const deleteInvoice = async (id) => {
    const result = await Swal.fire({
      title: "Delete Invoice",
      text: "Are You Sure?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      console.log(id);
      await axios.delete(`${URL}/api/invoice/${id}`);
      Swal.fire("success", "Invoice Deleted", "success");
    } catch (error) {
      console.log(error.response);
    } finally {
      getInvoice();
    }
  };
  return (
    <div className="manage-invoice ">
      <h2>Manage Invoices</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>no.</th>
            <th>Date</th>
            <th>Company Name</th>
            <th>Invoice No.</th>
            <th>Challan No.</th>
            <th>Delivery Date</th>
            <th>Remark</th>
            <th>Products</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.map((invoice, num) => (
            <tr key={invoice._id}>
              <td>{num + 1}</td>
              <td>{invoice.date || "NA"}</td>
              <td>{invoice.companyname || "NA"}</td>
              <td>{invoice.invoiceno || "NA"}</td>
              <td>{invoice.challanno || "NA"}</td>
              <td>{invoice.deliverydate || "NA"}</td>
              <td>{invoice.remark || "NA"}</td>
              <td>
                <table border={1} id="sub-table">
                  <tbody>
                    <tr>
                      <td>Product</td>
                      <td>Qty</td>
                      <td>Rate</td>
                      <td>VAT</td>
                      <td>Total</td>
                    </tr>
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.itemname}</td>
                        <td>{item.qty}</td>
                        <td>{item.rate}</td>
                        <td>{item.vat}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>
                {invoice.finaltotal}{" "}
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => openEditOption(invoice)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="del-btn"
                  onClick={() => deleteInvoice(invoice._id)}
                >
                  Del
                </button>
              </td>
              {/* <td>{invoice.finaltotal}<button onClick={()=>printInvoice(invoice)} type='button'>Print</button></td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {invoiceEdit && (
        <div className="invoice-edit">
          <form onSubmit={UpdateInvoice}>
            <h3>Edit Invoice</h3>
            <h4>Date: {invoiceDetails.date.split("-").reverse().join("-")}</h4>
            <div>
              <label>Company Name</label>
              <input
                type="text"
                value={invoiceDetails.companyname}
                name="companyname"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Invoice No:</label>
              <input
                type="text"
                value={invoiceDetails.invoiceno}
                name="invoiceno"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Invoice Date:</label>
              <input
                type="date"
                value={invoiceDetails.invoicedate}
                name="invoicedate"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Challan No:</label>
              <input
                type="text"
                value={invoiceDetails.challanno}
                name="challanno"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Challan Date:</label>
              <input
                type="date"
                value={invoiceDetails.challandate}
                name="challandate"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>GST No:</label>
              <input
                type="text"
                value={invoiceDetails.gstno}
                name="gstno"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Transporter Name</label>
              <input
                type="text"
                value={invoiceDetails.transportname}
                name="transportname"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Vehicle No:</label>
              <input
                type="text"
                style={{ textTransform: "uppercase" }}
                value={invoiceDetails?.transportnumber}
                name="transportnumber"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Delivery Date:</label>
              <input
                type="date"
                value={invoiceDetails?.deliverydate}
                name="deliverydate"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Delivery Charges:</label>
              <input
                type="number"
                value={invoiceDetails?.dlycharge}
                name="dlycharge"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Remark:</label>
              <input
                type="text"
                value={invoiceDetails?.remark}
                name="remark"
                onChange={handleChange}
              />
            </div>
            <div className="products">
              {invoiceDetails.items &&
                invoiceDetails.items.map((invoiceTable, num) => (
                  <div key={num}>
                    <div>
                      <label htmlFor="">Product Name</label>
                      <select
                        name="itemname"
                        value={invoiceTable.itemname}
                        onChange={(e) =>
                          productChange(num, "itemname", e.target.value)
                        }
                      >
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="CNG">CNG</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor=""> Qty(L)</label>
                      <input
                        type="text"
                        value={invoiceTable.qty}
                        onChange={(e) =>
                          productChange(num, "qty", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="">Rate per/L</label>
                      <input
                        type="text"
                        value={invoiceTable.rate}
                        onChange={(e) =>
                          productChange(num, "rate", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="">VAT</label>
                      <input
                        type="text"
                        value={invoiceTable.vat}
                        onChange={(e) =>
                          productChange(num, "vat", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="">Total</label>
                      <input
                        type="text"
                        value={invoiceTable.total}
                        onChange={(e) =>
                          productChange(num, "total", e.target.value)
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="del-btn"
                      onClick={() => deleteProduct(num)}
                    >
                      Del
                    </button>
                  </div>
                ))}
              <button className="add-btn" type="button" onClick={addItem}>
                Add+
              </button>
            </div>
            <h3>Final Total:{invoiceDetails.finaltotal}</h3>
            <div>
              <button type="submit">Submit</button>
              <button type="button" onClick={closeEditOption}>
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageInvoices;
