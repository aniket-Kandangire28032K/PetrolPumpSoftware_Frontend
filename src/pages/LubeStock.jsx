import React from "react";
import { useNavigate } from "react-router-dom";
import useGetLubeStock from "../Hooks/useGetLubeStock.jsx";

const LubeStock = () => {
  const navigate = useNavigate();
  const { lubeStock } = useGetLubeStock();
  console.log(lubeStock);
  return (
    <div className="lube-stock">
      <h1>Lube Stock</h1>
      <button className="navbtn" onClick={() => navigate("/lube")}>
        Import Form
      </button>
      <table border={1}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Net Volume</th>
            <th>Qty (Packeage)</th>
            <th>Rate (₹)</th>
            <th>Total stock Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lubeStock?.length === 0 && (
            <tr>
              <td colSpan={5}>
                <h3>No Data</h3>
              </td>
            </tr>
          )}
          {lubeStock?.length > 0 &&
            lubeStock.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.netVolume}</td>
                <td>{item.productStock}</td>
                <td>{item.productRate}</td>
                <td>{item.totalAmount}</td>
                <td>
                    <button>View</button> | 
                    <button>Delete</button> 
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LubeStock;
