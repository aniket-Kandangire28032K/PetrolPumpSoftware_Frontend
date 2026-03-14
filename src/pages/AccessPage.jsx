import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const AccessPage = () => {
  const Backendurl = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    role: "",
  });
  const getUsers = async () => {
    try {
      const res = await axios.get(`${Backendurl}/api/user`);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (_id) => {
    const result = await Swal.fire({
      title: "Delete",
      text: "Delete this User?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!result.isConfirmed) return;
    try {
      const res = await axios.delete(`${Backendurl}/api/user/${_id}`);
      Swal.fire("", res.data.message, "success");
    } catch (error) {
      console.log(error);
    } finally {
      getUsers();
    }
  };
  const resetFunction = () => {
    setDisplay("");
    setFormData({
      username: "",
      name: "",
      password: "",
      email: "",
      role: "",
    });
  };
  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${Backendurl}/api/user`,formData)
      console.log(res.data.message)
    } catch (error) {
      console.log(error.response)
    }finally{
      setDisplay("")
      getUsers();
      setFormData({
      username: "",
      name: "",
      password: "",
      email: "",
      role: "",
    });
    }
  }
  return (
    <div className="access">
      <h2>Users</h2>
      <button className="add-btn" onClick={() => setDisplay("form")}>
        Add User
      </button>
      <div className="user-list">
        {users.length > 0 &&
          users.map((e) => (
            <div key={e._id} className="user-card">
              <p>
                <strong>Username:</strong> {e.username}
              </p>
              <p>
                <strong>Name:</strong> {e.name}
              </p>
              <p>
                <strong>E-mail:</strong> {e.email}
              </p>
              <p>
                <strong>Role:</strong> {e.role || "N/A"}
              </p>
              <div className="card-btns">
                <button>update</button>
                <button onClick={() => deleteUser(e._id)}>Delete</button>
              </div>
            </div>
          ))}
        {display === "form" && (
          <div className="form-div">
            <form onSubmit={handleFormSubmit}>
              <h2>Add User</h2>
              <input type="text" placeholder="username" onChange={e => setFormData({...formData,username:e.target.value})}  required/>
              <input type="text" placeholder="Name" onChange={e => setFormData({...formData,name:e.target.value})} required/>
              <input type="exmail" placeholder="Email" onChange={e => setFormData({...formData,email:e.target.value})} />
              <input type="password" placeholder="Password" onChange={e => setFormData({...formData,password:e.target.value})} required/>
              <select name="" onChange={e => setFormData({...formData,role:e.target.value})} required>
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
              <div className="btn-grp">
                <button type="submit">Submit</button>
                <button type="button" onClick={resetFunction}>
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessPage;
