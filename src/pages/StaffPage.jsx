import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const StaffPage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [display, setDisplay] = useState("");
  const [staff, setStaff] = useState([]);
  const [staffDetails,setStaffDetails] = useState({})
   

  const getStaff = async () => {
    try {
      const res = await axios.get(`${URL}/api/staff`);
      setStaff(res.data.staff);
    } catch (error) {
      console.log(error);
      Swal.fire("", "Internal server Error", "error");
    }
  };
  useEffect(() => {
    getStaff();
  }, []);

  const editStaff = async (item) => {
    setDisplay("edit");
    try {
      setStaffDetails(item)
    } catch (error) {
      console.log(error);
    }
  };
  const addStaff = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${URL}/api/staff`,staffDetails)
        if(res.data.success == true){
            Swal.fire("success",res.data.message,"success")
        }
    } catch (error) {
        console.log("Internal Server Error"+ error) 
        Swal.fire("","Internal Server Error","error")  
    }finally{
        getStaff();
        setStaffDetails({})
        setDisplay("")
    }
  }
  const updateStaffDetails = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.patch(`${URL}/api/staff`,staffDetails) 
       console.log(res.data)
       if(res.data.success == true){
            Swal.fire("success",res.data.message,"success")
        }
    } catch (error) {
        console.log(error)
        Swal.fire("","Internal Server Error","error")  
    }finally{
        getStaff();
        setStaffDetails({})
        setDisplay("")
    }
    
  }
  return (
    <div className="staff page">
      <h2>Our Staff</h2>
      <button
        type="button"
        className="add-btn"
        onClick={() => setDisplay("addstaff")}
      >
        +Add Staff
      </button>
      {display === "addstaff" && (
        <div className="addstaff">
          <form onSubmit={addStaff}>
            <button type="button" onClick={() => setDisplay("")}>
              <IoClose />
            </button>
            <h3>Add Staff</h3>
            <label>Name:</label>
            <input type="text" name="name" onChange={e=> { setStaffDetails({ ...staffDetails,name:e.target.value})} }/>
            <label>Contact:</label>
            <input type="text" name="contact" maxLength={10} onChange={e=> { setStaffDetails({ ...staffDetails,contact:e.target.value})} }/>
            <label>Date of Birth:</label>
            <input type="date" name="dob" onChange={e=> { setStaffDetails({ ...staffDetails,dob:e.target.value})} } />
            <label>Gender:</label>
            <select name="gender" onChange={e=> { setStaffDetails({ ...staffDetails,gender:e.target.value})} } >
              <option value="">--Options--</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
              <option value="other">OTHER</option>
            </select>
            <label>Date of Joining:</label>
            <input type="date" name="dateofjoin" onChange={e=> { setStaffDetails({ ...staffDetails,dateofjoin:e.target.value})} }/>
            <label>Address:</label>
            <input type="text" name="address" onChange={e=> { setStaffDetails({ ...staffDetails,address:e.target.value})} }/>
            <label>Role:</label>
            <select name="role" onChange={e=> { setStaffDetails({ ...staffDetails,role:e.target.value})} }>
              <option value="">--Options--</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              {/* <option value="cashier">Cashier</option> */}
              <option value="other">Other</option>
            </select>
            <label>Status:</label>
            <select name="status" onChange={e=> { setStaffDetails({ ...staffDetails,status:e.target.value})} }>
              <option value="">--Options--</option>
              <option value="active">Active</option>
              <option value="Leave">Leave</option>
              <option value="Resigned">Resigned</option>
            </select>
            <button type="submit">Submit </button>
          </form>
        </div>
      )}
      <table border={1}>
        {/* Staff Table */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Staff name</th>
            <th>contact</th>
            <th>address</th>
            <th>role</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {staff && staff.length > 0 ? staff.map((item, num) => (
            <tr key={item._id}>
              <td>{num + 1}</td>
              <td>{item.name}</td>
              <td>{item.contact || "N/A"}</td>
              <td>{item.address || "N/A"}</td>
              <td>{item.role || "N/A"}</td>
              <td>
                {item.status || "N/A"}{" "}
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => editStaff(item)}
                >
                  <RiEdit2Fill />
                </button>
              </td>
            </tr>
          )): <tr>
            <td colSpan={6}>No Data</td>
          </tr> }
        </tbody>
      </table>

      {display === "edit" && (
        // Edit Component
        <div className="edit addstaff">
          <form onSubmit={updateStaffDetails}>
            <button type="button" onClick={() => setDisplay("")}>
              <IoClose />
            </button>
            <h3>Update Staff Details</h3>
            <label>Name:</label>
            <input type="text" name="name" value={staffDetails.name} onChange={e=> { setStaffDetails({ ...staffDetails,name:e.target.value})} }/>
            <label>Contact:</label>
            <input type="text" name="contact" value={staffDetails.contact} onChange={e=> { setStaffDetails({ ...staffDetails,contact:e.target.value})} }/>
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={staffDetails.dob} onChange={e=> { setStaffDetails({ ...staffDetails,dob:e.target.value})} }/>
            <label>Gender:</label>
            <select name="gender" value={staffDetails.gender} onChange={e=> { setStaffDetails({ ...staffDetails,gender:e.target.value})} }>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
              <option value="other">OTHER</option>
            </select>
            <label>Date of Joining:</label>
            <input type="date" name="dateofjoin" value={staffDetails.dateofjoin} onChange={e=> { setStaffDetails({ ...staffDetails,dateofjoin:e.target.value})} }/>
            <label>Address:</label>
            <input type="text" name="address" value={staffDetails.address} onChange={e=> { setStaffDetails({ ...staffDetails,address:e.target.value})} }/>
            <label>Role:</label>
            <select name="role" value={staffDetails.role} onChange={e=> { setStaffDetails({ ...staffDetails,role:e.target.value})} }>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              {/* <option value="cashier">Cashier</option> */}
              <option value="other">Other</option>
            </select>
            <label>Status:</label>
            <select name="status" value={staffDetails.status} onChange={e=> { setStaffDetails({ ...staffDetails,status:e.target.value})} }>
              <option value="active">Active</option>
              <option value="Leave">Leave</option>
              <option value="Resigned">Resigned</option>
            </select>
            <button type="submit">Submit </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StaffPage;
