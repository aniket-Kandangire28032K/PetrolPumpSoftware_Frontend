import { useState } from "react";

const TankReFill = () => {
  const [invoice, setInvoice] = useState({
    supplier: "",
    invoiceNo: "",
    gst: 18,
    items: [
      {
        tank: "",
        fuelType: "Petrol",
        quantity: "",
        rate: "",
        total: 0,
      },
    ],
  });

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;

    setInvoice({
      ...invoice,
      [name]: value,
    });
  };
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;

    const updatedItems = [...invoice.items];

    updatedItems[index][name] = value;

    if (name === "quantity" || name === "rate") {
      const qty = updatedItems[index].quantity || 0;
      const rate = updatedItems[index].rate || 0;

      const subtotal = qty * rate;
      const gstAmount = subtotal * (invoice.gst / 100);

      updatedItems[index].total = subtotal + gstAmount;
    }

    setInvoice({
      ...invoice,
      items: updatedItems,
    });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          tank: "",
          fuelType: "Petrol",
          quantity: "",
          rate: "",
          total: 0,
        },
      ],
    });
  };

  const getGrandTotal = () => {
    return invoice.items.reduce((sum, item) => sum + Number(item.total), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Invoice Data:", invoice);

    alert("Tank Refill Invoice Saved");

    setInvoice({
      supplier: "",
      invoiceNo: "",
      gst: 18,
      items: [
        {
          tank: "",
          fuelType: "Petrol",
          quantity: "",
          rate: "",
          total: 0,
        },
      ],
    });
  };

  const removeItem = (index) => {
    const updatedItems = invoice.items.filter((_, i) => i !== index);

    setInvoice({
      ...invoice,
      items: updatedItems,
    });
  };
  return (
    <div className="refill">
      <h2>Tank Refill Entry</h2>

      <form onSubmit={handleSubmit}>
        <label>Supplier</label>
        <input
          type="text"
          name="supplier"
          value={invoice.supplier}
          onChange={handleInvoiceChange}
        />

        <label>Invoice Number</label>
        <input
          type="text"
          name="invoiceNo"
          value={invoice.invoiceNo}
          onChange={handleInvoiceChange}
        />

        <label>GST %</label>
        <input
          type="number"
          name="gst"
          value={invoice.gst}
          onChange={handleInvoiceChange}
        />

        <h3>Fuel Items</h3>

        {invoice.items.map((item, index) => (
          <div key={index}>
            <label>Tank</label>
            <select
              name="tank"
              value={item.tank}
              onChange={(e) => handleItemChange(index, e)}
            >
              <option value="">Select Tank</option>
              <option value="Tank 1">Tank 1</option>
              <option value="Tank 2">Tank 2</option>
            </select>

            <label>Fuel Type</label>
            <select
              name="fuelType"
              value={item.fuelType}
              onChange={(e) => handleItemChange(index, e)}
            >
              <option>Petrol</option>
              <option>Diesel</option>
            </select>

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
            />

            <label>Rate</label>
            <input
              type="number"
              name="rate"
              value={item.rate}
              onChange={(e) => handleItemChange(index, e)}
            />

            <label>Total</label>
            <input type="number" value={item.total} readOnly />
            <button type="button" className="rmv-btn" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addItem}>
          + Add Fuel Item
        </button>

        <h3>Grand Total: ₹ {getGrandTotal()}</h3>

        <button type="submit">Save Invoice</button>
      </form>
    </div>
  );
};

export default TankReFill;
