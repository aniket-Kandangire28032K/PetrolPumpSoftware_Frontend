import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ManageInvoices = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const [invoiceData,setInvoiceData] = useState([]);
  const getInvoice = async ()=>{
    try {
      const res =await axios.get(`${URL}/api/invoice`)
      setInvoiceData(res.data.invoice)
      console.log(res.data.invoice)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(()=>{
    getInvoice();
  },[])
  const printInvoice = (item)=>{
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

    const newTab = window.open("","_blank")
    newTab.document.write(invoice);
    newTab.document.close();
  }
  return (
    <div className='manage-invoice'>
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
          {
            invoiceData.map((invoice,num)=>(
              <tr key={invoice._id}>
                <td>{num+1}</td>
                <td>{invoice.date || "NA"}</td>
                <td>{invoice.companyname || "NA"}</td>
                <td>{invoice.invoiceno || "NA"}</td>
                <td>{invoice.challanno || "NA"}</td>
                <td>{invoice.deliverydate || "NA"}</td>
                <td>{invoice.remark || "NA"}</td>
                <td>
                  <table border={1} id='sub-table'>
                    <tbody>
                      <tr>
                        <td>Product</td>
                        <td>Qty</td>
                        <td>Rate</td>
                        <td>VAT</td>
                        <td>Total</td>
                      </tr>
                      {invoice.items.map((item,index)=> (
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
                <td>{invoice.finaltotal}<button onClick={()=>printInvoice(invoice)} type='button'>Print</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ManageInvoices