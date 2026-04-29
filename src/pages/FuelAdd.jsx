import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const FuelAdd = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    name:"",
    liters:"",
    rate: "",
    tank:""
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
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/api/fuel`, postData);
      Swal.fire("Sucess", res.data.message, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Internal Server Error", "error");
    } finally {
      setLoading(false);
      setPostData({
        name: "",
        liters: "",
        rate: "",
        tank:""
      });
    }
  };
  return (
    <div className="add-fuel">
      <h1>Enter New Fuel</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <select name="name" value={postData.name} onChange={(e) => handleChange(e)} required>
            <option>Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="CNG">CNG</option>
          </select>
        </div>
        <div>
          <label>Liters:</label>
          <input
            type="number"
            min={0}
            name="liters"
            value={postData.liters}
            onChange={(e) => handleChange(e)}
            required
            step="any"
          />
        </div>
        <div>
          <label>Rate:</label>
          <input
            type="number"
            min={0}
            name="rate"
            value={postData.rate}
            onChange={(e) => handleChange(e)}
            required
            step="any"
          />
        </div>
        <div>
          <label>Tank:</label>
          <select name="tank"  value={postData.tank} onChange={(e) => handleChange(e)} required>
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
            onClick={() =>
              setPostData({ name: "", liters: 0, suppliername: "", rate: 0 })
            }
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuelAdd;
