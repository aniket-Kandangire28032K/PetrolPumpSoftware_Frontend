import { useState } from "react";

const CustomerCredit = () => {
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    creditLimit: "",
    outstanding: ""
  });

  const [customersList, setCustomersList] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Add or update customer
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      ...customer,
      id: Date.now()
    };

    setCustomersList([...customersList, newCustomer]);

    setCustomer({ name: "", mobile: "", creditLimit: "", outstanding: "" });
  };

  // Remove customer
  const handleRemove = (id) => {
    setCustomersList(customersList.filter(c => c.id !== id));
  };

  // Edit customer
  const handleEdit = (id) => {
    const custToEdit = customersList.find(c => c.id === id);
    setCustomer({ ...custToEdit });
    handleRemove(id); // remove temporarily for editing
  };

  // Total Outstanding
  const getTotalOutstanding = () => {
    return customersList.reduce((sum, c) => sum + Number(c.outstanding || 0), 0);
  };

  return (
    <div className="credit">
      <h2>Credit Customer Management</h2>

      {/* Customer Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label>Customer Name</label>
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          required
        />

        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={customer.mobile}
          onChange={handleChange}
          required
        />

        <label>Credit Limit (₹)</label>
        <input
          type="number"
          name="creditLimit"
          value={customer.creditLimit}
          onChange={handleChange}
        />

        <label>Outstanding Amount (₹)</label>
        <input
          type="number"
          name="outstanding"
          value={customer.outstanding}
          onChange={handleChange}
        />

        <button type="submit">Add Customer</button>
      </form>

      {/* Customer Table */}
      <h3>Credit Customers List</h3>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Credit Limit (₹)</th>
            <th>Outstanding (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customersList.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No credit customers added</td>
            </tr>
          ) : (
            customersList.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.mobile}</td>
                <td>{c.creditLimit}</td>
                <td>{c.outstanding}</td>
                <td>
                  <button onClick={() => handleEdit(c.id)} style={{ marginRight: "5px" }}>Edit</button>
                  <button onClick={() => handleRemove(c.id)} style={{ background: "red", color: "white" }}>Remove</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h3>Total Outstanding Amount: ₹ {getTotalOutstanding()}</h3>
    </div>
  );
};

export default CustomerCredit;