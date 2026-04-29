import { useState } from "react";
import "./component.css";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../assets/URL.js";

const AddCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    credits: 0,
    creditslimit: 0,
    vehicleNumber: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name == "name") {
      let newValue = value.replace(/\d/g, "");
      setFormdata((prev) => ({
        ...prev,
        [name]: newValue,
      }));
      return;
    }
    if (name == "contact") {
      let newValue = value.replace(/\D/g, "");
      setFormdata((prev) => ({
        ...prev,
        [name]: newValue,
      }));
      return;
    }
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/customer`, formData);
      Swal.fire({
        text: "Customer Added",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Internal Server Error",
        icon: "error",
      });
    } finally {
      setLoading(false);
      clearform();
    }
  };
  const clearform = ()=>{
      setFormdata({
        name: "",
        email: "",
        contact: "",
        address: "",
        credits: 0,
        creditslimit: 0,
        vehicleNumber: "",
      });
  }
  return (
    <div className="customer">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Enter Customer Details</h2>
        <label htmlFor="">Customer Name</label>
        <input
          style={{textTransform:"capitalize"}}
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
          required
        />

        <label htmlFor="">Customer Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
        />

        <label htmlFor="">Customer Contact</label>
        <input
          type="tel"
          value={formData.contact}
          maxLength={10}
          onChange={handleChange}
          name="contact"
          required
        />

        <label htmlFor="">Customer Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={handleChange}
          name="address"
        />

        <label htmlFor="">Vehicle Number</label>
        <input
          type="text"
          style={{textTransform:'uppercase'}}
          value={formData.vehicleNumber}
          name="vehicleNumber"
          onChange={handleChange}
          required
        />

        <label htmlFor="">Credits</label>
        <input
          type="number"
          min={0}
          value={formData.credits}
          onChange={handleChange}
          name="credits"
          required
        />

        <label htmlFor="">Credits Limit</label>
        <input
          type="number"
          min={0}
          value={formData.creditslimit}
          onChange={handleChange}
          name="creditslimit"
          required
        />
        <div>
        <button type="submit" disabled={loading ? true : false} style={loading ? {opacity:"0.51"} : {opacity:'1'} }>Sumbit</button>
        <button type="button" onClick={clearform} >Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
