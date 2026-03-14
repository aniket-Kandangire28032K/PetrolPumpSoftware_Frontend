import { useState } from "react";
import "./component.css";
import axios from "axios";
import Swal from "sweetalert2";
const AddCustomer = () => {
  const [formData,setFormdata] = useState({
    name:'',
    email:'',
    contact:'',
    address:''
  })

  const handleChange = (e) =>{
      const {value,name}=e.target;
      setFormdata(prev =>({
        ...prev,
        [name]:value
      }))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/customer',formData);
      Swal.fire({
        text:'Customer Added',
        icon:"success"
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        text:'Internal Server Error',
        icon:'error'
      })
    }
  }
  return (
    <div className="customer">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="">Customer Name</label>
        <input type="text" value={formData.name} onChange={e => handleChange(e)} name="name"  required/>

        <label htmlFor="">Customer Email</label>
        <input type="email" value={formData.email} onChange={e => handleChange(e)} name="email"/>

        <label htmlFor="">Customer Contact</label>
        <input type="text" value={formData.contact} onChange={e => handleChange(e)} name="contact" required/>

        <label htmlFor="">Customer Address</label>
        <input type="text" value={formData.address} onChange={e => handleChange(e)} name="address" required/>

        <button type="submit">Sumbit</button>
      </form>
    </div>
  );
};

export default AddCustomer;
