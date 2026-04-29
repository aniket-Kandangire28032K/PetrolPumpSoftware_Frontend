import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ManageFuel = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [fuelData, setFuelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [display, setDisplay] = useState("");
  const [fuelDetails, setFuelDetails] = useState({});
  
  const getFuelData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/api/fuel`);
      setFuelData(res.data.fuelData);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFuelData();
  }, []);

  const DeleteFuel = async (_id, name) => {
    const result = await Swal.fire({
      title: "Delete Fuel",
      text: "Are You Sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Data",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await axios.delete(`${URL}/api/fuel/${_id}`);
      console.log(res);
      Swal.fire("", `${name} Delete Sucessful`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("", "Internal Server Error", "error");
    } finally {
      getFuelData();
    }
  };
  const editOpen = (item) => {
    setDisplay("update");
    setFuelDetails(item);
  };
  const updateFuel = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.put(`${URL}/api/fuel/${fuelDetails._id}`,fuelDetails)
      console.log(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      setLoading(false)
    }finally{
      setDisplay("")
      setFuelDetails({})
      getFuelData()

    }
  }
  return (
    <div className="manage-fuel">
      <h1>Manage Fuel</h1>
      <NavLink to="/fuel">Add Fuel</NavLink>
      <table border={1}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Qty(L)</th>
            <th>Rate(₹)</th>
            
            <th>Tank</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", fontSize: "2rem" }}>
                <strong>Loading....</strong>
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  color: "crimson",
                  fontSize: "2rem",
                }}
              >
                Internal Server Error
              </td>
            </tr>
          )}
          {!loading &&
            fuelData.length > 0 &&
            fuelData.map((item, num) => (
              <tr key={item._id || num + 1}>
                <td>{num + 1}</td>
                <td>{item.name}</td>
                <td>{item.liters}</td>
                <td>{item.rate}</td>
                <td>{item.tank || "Tank Not Set"}</td>
                <td>
                  <button type="button" onClick={() => editOpen(item)}>
                    Edit
                  </button> |
                  <button onClick={() => DeleteFuel(item._id, item.name)}>
                    Del
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {display === "update" && (
        <div className="fuelupdateform">
          <form onSubmit={updateFuel}>
            <h2>Update Fuel</h2>
            <div>
              <label>Product Name:</label>
              <input
                type="text"
                disabled
                name="name"
                value={fuelDetails.name}
                onChange={(e) => setFuelDetails({...fuelDetails,name:e.target.value})}
                required
              />
            </div>
            <div>
              <label>Liters:</label>
              <input
                type="number"
                min={0}
                name="liters"
                value={fuelDetails.liters}
                onChange={(e) => setFuelDetails({...fuelDetails,liters:Number(e.target.value)})}
                required
                step="any"
              />
            </div>
            <div>
              <label>Supplier Name:</label>
              <input
                type="text"
                name="suppliername"
                value={fuelDetails.suppliername}
                onChange={(e) => setFuelDetails({...fuelDetails,suppliername:e.target.value})}
                required
              />
            </div>
            <div>
              <label>Rate:</label>
              <input
                type="number"
                min={0}
                name="rate"
                value={fuelDetails.rate}
                onChange={(e) => setFuelDetails({...fuelDetails,rate:Number(e.target.value)})}
                required
                step="any"
              />
            </div>
            <div>
              <label>Tank:</label>
              <select
                name="tank"
                value={fuelDetails.tank}
                onChange={(e) => setFuelDetails({...fuelDetails,tank:e.target.value})}
                required
              >
                <option value="">--Select-Tank--</option>
                <option value="tank 1">Tank 1</option>
                <option value="tank 2">Tank 2</option>
                <option value="tank 3">Tank 3</option>
                <option value="tank 4">Tank 4</option>
              </select>
            </div>
            <div className="btn-grp">
              {loading ? (
                <button type="submit" disabled>
                  Submit
                </button>
              ) : (
                <button type="submit">Submit</button>
              )}

              <button
                type="reset"
                onClick={() =>{
                  setFuelDetails({})
                  setDisplay("")  
                }
                }
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageFuel;
