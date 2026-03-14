import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Supplier = () => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [postData, setPostData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    status: "active",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendurl}/api/supplier`, postData);
      Swal.fire("Confirm", "Supplier Added to DataBase", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setPostData({
        companyname:"",
        name: "",
        email: "",
        contact: "",
        address: "",
        status: "",
      });
    }
  };
  return (
    <div className="supplier">
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={postData.companyname}
          />
        </div>
        <div>
          <label>Supplier Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={postData.name}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={postData.email}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="contact"
            onChange={handleChange}
            value={postData.contact}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={postData.address}
          />
        </div>
        <div>
          <label>Status</label>
          <select name="status" onChange={handleChange} value={postData.status}>
            <option value="">--Status--</option>
            <option value="active">ACTIVE</option>
            <option value="inactive">INACTIVE</option>
          </select>
        </div>
        <div className="btn-grp">
          <button type="submit">Add</button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default Supplier;
