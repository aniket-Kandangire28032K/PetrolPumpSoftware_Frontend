import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import URL from '../assets/URL.js';


const TankerDipTest = () => {
    const [loading,setLoading]= useState(false)
    const [loading1,setLoading1]= useState(false)
    const [testList,setTestLIst] = useState([])
    const [testData,setTestData] = useState({
        date:"",
        arivalTime:"",
        vehicalNo:"",
        vehicalContact:"",
        product:"",
        departureStock:0,
        productDip:0,
        arivalStock:0,
        variation:0,
        waterDip:0
    });
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setTestData(prev=>({
            ...prev,
            [name]:value
        }))

    }
    const handleSubmit =async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const res = await axios.post(`${URL}/api/tanker-test`,testData);
            Swal.fire({
                      toast:true,
                      showConfirmButton:false,
                      icon:"success",
                      position:"top-end",
                      title:"Dip Test Saved",
                      background:"#00af00",
                      showCloseButton:true,
                      timer:2000,
                      timerProgressBar:true,
                      color:"white",
                    })
        } catch (error) {
            console.log(error)
            Swal.fire({
                      toast:true,
                      showConfirmButton:false,
                      icon:"error",
                      position:"top-end",
                      title:"Try agin later...",
                      background:"#af0000",
                      showCloseButton:true,
                      timer:2000,
                      timerProgressBar:true,
                      color:"white",
                      
                    })
        }finally{
            setLoading(false);
            clearData();
        }
    }
    const clearData = ( ) =>{
        // Reseter Function
        getData();
        setTestData({
        date:"",
        arivalTime:"",
        vehicalNo:"",
        vehicalContact:"",
        product:"",
        departureStock:0,
        productDip:0,
        arivalStock:0,
        variation:0,
        waterDip:0
     })   
    }
  const getData = async ()  => {
    setLoading1(true)
    try {
      const res = await axios.get(`${URL}/api/tanker-test`)
      console.log(res.data.BackendData)
      setTestLIst(res.data.BackendData);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading1(false)
    }
  }
  useEffect(()=>{
    getData();
  },[])
  
  const DeleteTest = async(id)=>{
    const res = await Swal.fire({
      icon:"warning",
      title:"Deleted",
      text:"Are you sure? This action cannot be undone.",
      showCancelButton:true,
    })
    try {
      console.log(`${URL}/api/tanker-test/${id}`)
      if(res.isConfirmed){
        const result = await axios.delete(`${URL}/api/tanker-test/${id}`)
      }
      Swal.fire('Deleted','Data deleted successfuly','success');
    } catch (error) {
        console.log(error)
    }finally{
      getData();
    }
  }

  return (
    <>
    <h2 style={{textAlign:'center'}}>Import Tank Dip Test</h2>
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Date</label>
          <input
            type="date" required value={testData.date}
            name="date" onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Arival Time</label>
          <input
            type="time" required value={testData.arivalTime}
            name="arivalTime" onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="">Vehical No.</label>
          <input
            type="text" required value={testData.vehicalNo}
            name="vehicalNo" onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Vehical Contact.</label>
          <input
            type="text" required value={testData.vehicalContact}
            name="vehicalContact" onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Product:</label>
          <input
            type="text" required value={testData.product}
            name="product" onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Departure Stock:</label>
          <input
            type="number" required value={testData.departureStock}
            name="departureStock" onChange={handleChange}
           
          />
        </div>
        <div>
          <label htmlFor="">Product Dip</label>
          <input
            type="number" onChange={handleChange}
            name="productDip" value={testData.productDip}
          />
        </div>
        <div>
          <label htmlFor="">Arrival Stock</label>
          <input
            type="number" name="arivalStock" 
            onChange={handleChange} value={testData.arivalStock}
          />
        </div>
        <div>
          <label htmlFor="">Variation</label>
          <input
            type="number" 
            name="variation" onChange={handleChange}
            step="any" value={testData.variation}
          />
        </div>
        <div>
          <label htmlFor="">Water Dip</label>
          <input
            type="number" onChange={handleChange}
            name="waterDip" value={testData.waterDip}
          />
        </div>
        <div style={{justifyContent:"center"}}> 
          { !loading ? <button type="submit">Submit</button> : <button disabled style={{backgroundColor:"#6f93fe"}} type="submit">Submit</button>}
          <button type="button" onClick={clearData}>
            Clear
          </button>
        </div>
    </form>
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Product</th>
            <th>Vehical No.</th>
            <th>Vehical Contact.</th>
            <th>Dept. Stock</th>
            <th>Product Dip</th>
            <th>Arived Stcok</th>
            <th>Variation</th>
            <th>Water Dip</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { 
            testList.length == 0 && <tr>
              <td colSpan={10}><strong>No Data Available</strong></td>
            </tr>
          }
          { 
            loading1 && <tr>
              <td colSpan={10}><h2>Data Loading...</h2></td>
            </tr>
          }
          { testList.length > 0 &&
            testList?.map((item)=> (
              <tr key={item._id}>
                <td>{item.date} </td>
                <td>{item.arivalTime}</td>
                <td>{item.product}</td>
                <td>{item.vehicalNo}</td>
                <td>{item.vehicalContact}</td>
                <td>{item.departureStock}</td>
                <td>{item.productDip}</td>
                <td>{item.arivalStock}</td>
                <td>{item.variation}</td>
                <td>{item.waterDip || 0}</td>
                <td><button>View</button> | <button className='del-btn' onClick={()=>DeleteTest(item._id)}>Del</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default TankerDipTest