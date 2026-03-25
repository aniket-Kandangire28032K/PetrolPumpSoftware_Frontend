import axios from "axios";
import { useEffect, useState } from "react";

const TankStock = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [newTank, setNewTank] = useState({
    tankname: "",
    tankproduct: "Petrol",
    tankcapacity: "",
    tankcurrentstock: "",
    tankStatus: "",
  });
  const [tanks, setTanks] = useState([]);

  const getTankDetails = async () => {
    try {
      const res = await axios.get(`${URL}/api/tankdetails`);
      setTanks(res.data.tanks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTankDetails();
  }, []);

  const handleChange = (e) => {
    setNewTank({
      ...newTank,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/tankdetails`, newTank);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setNewTank({
        tankname: "",
        tankproduct: "Petrol",
        tankcapacity: "",
        tankcurrentstock: "",
        tankStatus: "",
      });
      getTankDetails();
    }
  };

  const getStockStatus = (current, capacity) => {
    const percentage = (current / capacity) * 100;

    if (percentage < 20) return "Low";
    if (percentage < 50) return "Medium";
    return "Normal";
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case "Low":
        return { backgroundColor: "red", color: "white" };
      case "Medium":
        return { backgroundColor: "yellow", color: "black" };
      case "Normal":
        return { backgroundColor: "green", color: "white" };
      default:
        return {};
    }
  };
  return (
    <div className="tank-stock">
      <h2>Tank Stock Management</h2>
      <form onSubmit={handleSubmit}>
        <h3>Add Tank</h3>
        <input
          type="text"
          name="tankname"
          placeholder="Tank Name"
          value={newTank.tankname}
          onChange={handleChange}
          required
        />
        <select
          name="tankproduct"
          value={newTank.tankproduct}
          onChange={handleChange}
        >
          <option>Petrol</option>
          <option>Diesel</option>
          <option>PowerPetrol</option>
        </select>

        <input
          type="number"
          name="tankcapacity"
          placeholder="Capacity (Litres)"
          value={newTank.tankcapacity}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="tankcurrentstock"
          placeholder="Current Stock"
          value={newTank.tankcurrentstock}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Tank</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th></th>
            <th>Tank Name</th>
            <th>Fuel Type</th>
            <th>Capacity (L)</th>
            <th>Current Stock (L)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tanks?.map((tank, num) => {
            const status = getStockStatus(
              tank.tankcurrentstock,
              tank.tankcapacity,
            );

            return (
              <tr key={tank._id}>
                <td>{num + 1}</td>
                <td>{tank.tankname}</td>
                <td>{tank.tankproduct}</td>
                <td>{tank.tankcapacity}</td>
                <td>{tank.tankcurrentstock}</td>
                <td style={getStatusStyle(status)}>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TankStock;
