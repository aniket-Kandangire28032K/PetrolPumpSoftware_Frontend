import { useState } from "react";
import "./component.css";
import axios from "axios";
import Swal from "sweetalert2";
const AddCustomer = () => {
  const [formData,setFormdata] = useState({
    name:'',
    email:'',
    contact:'',
    address:'',
    credits:0,
    creditslimit:0,
    vehicleNumber:""
  })

  const handleChange = (e) =>{
      const {value,name}=e.target;
      if(name == "name") {
        let newValue = value.replace(/\d/g, '')
        setFormdata(prev=>({
          ...prev,
          [name]:newValue
        }))
        return;
      }
      if(name == "contact") {
        let newValue = value.replace(/\D/g, '')
        setFormdata(prev=>({
          ...prev,
          [name]:newValue
        }))
        return;
      }
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
      <h2>Enter Customer Details</h2>
        <label htmlFor="">Customer Name</label>
        <input type="text" value={formData.name} onChange={handleChange} name="name"  required/>

        <label htmlFor="">Customer Email</label>
        <input type="email" value={formData.email} onChange={handleChange} name="email"/>

        <label htmlFor="">Customer Contact</label>
        <input type="tel" value={formData.contact} maxLength={10} onChange={handleChange} name="contact" required/>

        <label htmlFor="">Customer Address</label>
        <input type="text" value={formData.address} onChange={handleChange} name="address" />
        
        <label htmlFor="">Vehicle Number</label>
        <input type="text" value={formData.vehicleNumber}  name="vehicleNumber" onChange={handleChange}  required/>

        <label htmlFor="">Credits</label>
        <input type="number" min={0} value={formData.credits} onChange={handleChange} name="credits" required/>
        
        <label htmlFor="">Credits Limit</label>
        <input type="number" min={0} value={formData.creditslimit} onChange={handleChange} name="creditslimit" required/>
        <button type="submit">Sumbit</button>
      </form>
    </div>
  );
};

export default AddCustomer;
