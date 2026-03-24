import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice.js";
import Swal from "sweetalert2";
import axios from "axios";

const LoginPage = ({onLogin}) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [user,setUser] = useState({
    identifier:"",
    password:"",
  })
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const expiryTime = new Date().getTime() + 60 * 60 * 1000;
    try {
      const res = await axios.post(`${URL}/api/user/login`,user)
      console.log(res.data.user)
      dispatch(login({name:res.data.user.name,role:res.data.user.role}))
      localStorage.setItem("auth",JSON.stringify({
        value:true,
        expiry:expiryTime
      }));
      onLogin();
      navigate("/",{replace:true})
    } catch (error) {
      console.log(error)
      console.log(error.response.data.message)
      Swal.fire("",error.response.data.message,"error")      
    }
  }
  return (
    <div className="login-page">
      <div className="login-img">
        
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Login</h1>
        <div>
        <input type="text" placeholder="Username" onChange={(e)=> setUser({...user,identifier:e.target.value})}/>
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password" 
            onChange={(e)=> setUser({...user,password:e.target.value})}
          />
          <button
            className="show-btn"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >{ showPassword ? <FaRegEye/> : <FaRegEyeSlash/> } </button>
        </div>
        <button className="login-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
