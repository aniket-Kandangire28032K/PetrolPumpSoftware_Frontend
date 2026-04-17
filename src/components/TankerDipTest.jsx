import React, { useState } from 'react'
import Swal from 'sweetalert2';

const TankerDipTest = () => {
    const [loading,setLoading]= useState(false)
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
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            console.log(testData)
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
            // clearData();

        }
    }
    const clearData = ( ) =>{
        // Reseter Function
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
  return (
    <>
    <h3 style={{textAlign:'center'}}>Import Tank Dip Test</h3>
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
        <div>
          { !loading ? <button type="submit">Submit</button> : <button disabled style={{backgroundColor:"#6f93fe"}} type="submit">Submit</button>}
          <button type="button" onClick={clearData}>
            Clear
          </button>
        </div>
    </form>
    </>
  )
}

export default TankerDipTest