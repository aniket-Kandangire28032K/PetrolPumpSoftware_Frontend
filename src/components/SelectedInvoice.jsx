import React from "react";
import "./component.css";
const SelectedInvoice = ({ invoice, setInvoice }) => {
  return (
    <div className="selected-invoice">
      <div className="invoice-info">
        <h1>Invoice Details</h1>
        <button className="close-btn" onClick={() => setInvoice(null)}>❌</button>
        <p><strong>Date: </strong>{invoice?.date}</p>
        <p><strong>Company Name: </strong>{invoice?.companyName}</p>
        <p><strong>Invoice No: </strong>{invoice?.invoiceNo}</p>
        <p><strong>Company Name: </strong>{invoice?.invoiceDate}</p>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Stock</th>
                    <th>Purchase Rate</th>
                    <th>GST in (%)</th>
                    <th>GST in(₹)</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    invoice?.productList.map((item,num)=>(
                        <tr key={num}>
                            <td>{item.productName}</td>
                            <td>{item.productStock}</td>
                            <td>{item.perProductRate}</td>
                            <td>{item.gstPer}</td>
                            <td>{item.gstAmount}</td>
                            <td>{item.productTotal}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <h2>Total Amount: Rs.{invoice?.totalPrice} </h2>
      </div>
    </div>
  );
};

export default SelectedInvoice;
