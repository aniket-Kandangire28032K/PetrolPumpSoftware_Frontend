import { useEffect, useState } from 'react';
import { useGet } from '../Hooks/useGet';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
const ManagaeSuppliers = () => {
  
  const [dataList,setDataList] = useState([]);
  const [edit,setEdit] = useState(false)
  const BackendUrl = `${import.meta.env.VITE_BACKEND_URL}/api/supplier`
  // VITE_BACKEND_URL=http://localhost:3000
  const {data,loading,error,fetchData} =useGet( BackendUrl )
  const [supplierData,setSupplierData] =useState({});

  useEffect(()=>{
    if(data?.list){
      setDataList(data?.list);
    }
  },[data])
  if(loading) return <p style={{textAlign:"center"}}>Loading...</p>;
  if(error) return <p>Internal Server Error...</p>
  // console.log(data.list)

  const deleteCustomer = (_id) => {
    try {
      Swal.fire({
        title:"Are You Sure?",
        text:"You Won't be able to revert this! ",
        icon:"warning",
        showCancelButton:true,
        confirmButtonText:'Delete',
      }).then((result)=>{
        if(result.isConfirmed){
          deleteItem(_id)
          Swal.fire(" ","Customer Data Deleted","success")
        }
      })
    } catch (error) {
      console.log('Internal Server Error')
    }
  }

  const deleteItem = async (_id) => {
    try {
      await axios.delete(`${BackendUrl}/${_id}`)
      fetchData();
    } catch (error) {
      console.log(error)
    }
  }

  const EditSupplier = async (item) => {
    setEdit(true) 
    setSupplierData(item)
  }

  const updateSupplier = async (e) => {
    e.preventDefault();
    const result =await Swal.fire({
      title:'Update',
      text:'Update Supplier Data',
      icon:'info',
      showCancelButton:true
    })
    if(!result.isConfirmed) return;
    try {
      await axios.put(`${BackendUrl}/${supplierData._id}`,supplierData)
      Swal.fire("Confirm","Data is Updated","success")
    } catch (error) {
      console.log(error)
    }finally{
      setEdit(false)
      fetchData();
    }


  }
  return (
    <div className='manage-supplier'>
      <h1>Manage Suppliers</h1>
      {/* <NavLink to='/supplier'>Add Supplier</NavLink> */}
      <table border={1}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Status</th>
            <th></th>
          </tr>          
        </thead>
        <tbody>
        {
          dataList && dataList.map((item,num)=>(
            <tr key={item?._id}>
              <td>{num+1}</td>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.contact}</td>
              <td>{item?.address}</td>
              <td>{item?.status || "Null"}</td>
              <td className='actions'><button onClick={()=>EditSupplier(item)} >Edit</button> | <button onClick={()=>deleteCustomer(item._id)}>Del</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>
        {
          edit && <form className='editForm' onSubmit={e=> updateSupplier(e)}>
            <h2>Edit Supplier Data</h2>
            <div>
            <label htmlFor="">Supplier Name:</label>
            <input type="text" value={supplierData.name} onChange={e => setSupplierData({...supplierData, name:e.target.value })}/>
            </div>
            <div>
              <label htmlFor="">Supplier Email:</label>
            <input type="text" value={supplierData.email} onChange={e => setSupplierData({...supplierData, email:e.target.value })}/>
            </div>
            <div>
            <label htmlFor="">Supplier contact</label>
            <input type="text" value={supplierData.contact} onChange={e => setSupplierData({...supplierData, contact:e.target.value })} maxLength={10}/>

            </div>
            <div>
              <label htmlFor="">Supplier Address</label>
            <input type="text" value={supplierData.address} onChange={e => setSupplierData({...supplierData, address:e.target.value })}/>

            </div>
            <div>
              <label htmlFor="">Supplier Status</label>
            <select value={supplierData.status} onChange={e => setSupplierData({...supplierData, status:e.target.value })}>
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            </div>
            <div className='buttons'>
              <button type="submit">Update</button>
              <button type='button' onClick={()=> setEdit(false)}>close</button>
            </div>
          </form>
        }
    </div>
  )
}

export default ManagaeSuppliers