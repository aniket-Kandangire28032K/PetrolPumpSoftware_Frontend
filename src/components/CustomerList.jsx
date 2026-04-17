import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import URL from "../assets/URL.js";

const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);

  const getCustomers = async () => {
    try {
      const res = await axios.get(`${URL}/api/customer`);
      setCustomerList(res.data.customers);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);

  const deleteCustomer = async (_id,name) => {
    const result =await Swal.fire({
        title:'Are you sure',
        icon:'warning',
        showCancelButton:true,
    })

    if(!result.isConfirmed) return;
    try {
        axios.delete(`http://localhost:3000/api/customer/${_id}`)
        Swal.fire({
            title:`${name}'s data Deleted`,
            icon:'success'
        }).then(()=> getCustomers());
    } catch (error) {
        console.log(error)
        Swal.fire({
            title:'Error...',
            text:'Faild to delete customer',
            icon:'error'
        })
    } finally{
        getCustomers();
    }
  }
  return (
    <div className="customer-list">
      <h3>Customer List</h3>
      <br />
      <table border={1}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customerList.length > 0 &&
            customerList.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.contact}</td>
                <td>{e.address}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => deleteCustomer(e._id,e.name)}>Del</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
