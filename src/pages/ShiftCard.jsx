import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const ShiftCard = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [staff, setStaff] = useState([]);
  const [shiftDetails, setShiftDetails] = useState({
    date:"",
    name:"",
    cashier:"",
    shift:"",
    nozels: [{}],
    total:0
  });
  const [fuel,setFuel] = useState([]);
  const getStaff = async () => {
    try {
      const res = await axios.get(`${URL}/api/staff`);
      setStaff(res.data.staff.filter((item) => item.status == "active"));
    } catch (error) {
      console.log(error);
    }
  };

  const addShift = (e) => {
    e.preventDefault();
    setShiftDetails({
      ...shiftDetails,
      nozels: [
        ...shiftDetails.nozels,
        {
          nozel:"",
          fuel: "",
          opening: "",
          closing: "",
          sale: "",
          rate: "",
          salerate: "",
        },
      ],
    });
  };
  const deleteNozel = (index) => {
    setShiftDetails((prev) => ({
      ...prev,
      nozels: prev.nozels.filter((_, i) => i !== index),
    }));
  };
  const handleNozelChange = (index, field, value) => {
    const updatedNozels = [...shiftDetails.nozels];
    updatedNozels[index][field] = value;
    // auto calculate sale
    if (field === "opening" || field === "closing") {
      updatedNozels[index].sale =
        (updatedNozels[index].closing || 0) -
        (updatedNozels[index].opening || 0);
    }
    if(field === "rate"){
      updatedNozels[index].salerate = Number(updatedNozels[index].sale) * Number(updatedNozels[index].rate)
    }
    setShiftDetails({
      ...shiftDetails,
      nozels: updatedNozels,
    });
  };
  useEffect(()=>{
    let totalSum= 0
    totalSum=shiftDetails.nozels.reduce((sum,item)=> sum + Number(item.salerate || 0),0)
    setShiftDetails(prev =>({
      ...prev,
      total:Number(totalSum)
    }))
  },[shiftDetails.nozels])

  const getFuel = async()=>{
    // get fuel Details
    try {
    const res = await axios.get(`${URL}/api/fuel`);
    setFuel(res.data.fuelData)
  } catch (error) {
    console.log(error)
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/shift`,shiftDetails)
      Swal.fire("","Data Saced","success")
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(() => {
    getStaff();
    getFuel();
  }, []);
  // useEffect(()=>{
  //   console.log(shiftDetails.nozels)
  // },[shiftDetails.nozels])
  return (
    <div className="shift">
      <form onSubmit={handleSubmit}>
        <h3>Shift Card Entry</h3>
        <div>
          <label htmlFor="">Date</label>
          <input type="date" value={shiftDetails.date} onChange={e=> setShiftDetails({
            ...shiftDetails,
            date:e.target.value
          })}/>
        </div>
        <div>
          <label>Employee Name</label>
          <select name="name" id="" value={shiftDetails.name} onChange={e=> setShiftDetails({
            ...shiftDetails,
            name:e.target.value
          })} >
            <option value="">--Name--</option>
            {staff
              .filter((e) => e.role === "employee")
              .map((per) => (
                <option key={per._id} value={per.name}>
                  {per.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Cashier</label>
          <select name="" id="" value={shiftDetails.cashier} onChange={e=> setShiftDetails({
            ...shiftDetails,
            cashier:e.target.value
          })}>
            <option value="">--Options--</option>
            {staff
              .filter((e) => e.role === "admin")
              .map((per) => (
                <option key={per._id} value={per.name}>
                  {per.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Shift</label>
          <select name="" id="" value={shiftDetails.shift} onChange={e=> setShiftDetails({
            ...shiftDetails,
            shift:e.target.value
          })}>
            <option value="">--Shifts--</option>
            <option value="1st Shift">1st Shift</option>
            <option value="2nd Shift">2nd Shift</option>
            <option value="3rd Shift">3rd Shift</option>
          </select>
        </div>
        <div className="details">
          <table border={1}>
            <thead>
              <tr>
                <th>del</th>
                <th>Nozel</th>
                <th>fuel</th>
                <th>opening</th>
                <th>closing</th>
                <th>sale</th>
                <th>rate</th>
                <th>sale rs</th>
              </tr>
            </thead>
            <tbody>
              {shiftDetails?.nozels?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <button type="button" onClick={() => deleteNozel(index)}>
                      X
                    </button>
                  </td>
                  <td>
                    <input type="text" onChange={(e) => handleNozelChange(index, "fuel", e.target.value)} />
                  </td>
                  <td>
                    <select  value={item.fuel}  onChange={(e) =>
                        handleNozelChange(index, "fuel", e.target.value)
                      }>
                      <option value="">Fuel</option>
                      {
                        fuel.map(e=>(
                          <option key={e._id} value={e.name}>{e.name}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td>
                    <input type="number" value={item.opening}
                      onChange={(e) =>
                        handleNozelChange(index, "opening", e.target.value)
                      }/>
                  </td>
                  <td>
                    <input type="number" value={item.closing}
                      onChange={(e) =>
                        handleNozelChange(index, "closing", e.target.value)
                      }/>
                  </td>
                  <td>
                    <input type="number" value={item.sale} disabled
                      onChange={(e) =>
                        handleNozelChange(index, "sale", e.target.value)
                      }/>
                  </td>
                  <td>
                    <input type="number" value={item.rate}
                      onChange={(e) =>
                        handleNozelChange(index, "rate", e.target.value)
                      }/>
                  </td>
                  <td>
                    <input type="number" value={item.salerate} disabled
                      onChange={(e) =>
                        handleNozelChange(index, "salerate", e.target.value)
                      }/>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <button type="button" onClick={addShift}>
                    +Add
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p>Total Cash:{shiftDetails.total }</p>      
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ShiftCard;
