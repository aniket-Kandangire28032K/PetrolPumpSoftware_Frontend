import React, { useState } from 'react'

const ManageInvoices = () => {
  const [invoiceData,setInvoiceData] = useState([]);
  return (
    <div>
      <h2>Manage Invoices</h2>
      <table border={1}>
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Company Name</th>
            <th>Invoice No.</th>
            <th>Challan No.</th>
            <th>Delivery Date</th>
            <th>Remark</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default ManageInvoices