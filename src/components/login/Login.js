import React, {useState} from "react";
import './Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ()=>{

  const navigate = useNavigate()

  const [user,setUser] = useState({
    email:"",
    password:"",
    type:'0'
  })

  const handleChange = (e)=>{
    const {name,value}=e.target
    setUser({
      ...user,
      [name]:value

    })

  }

  const login =async()=>{
    let result = await axios.post('http://localhost:5000/login',user)
      if(result.data.success){
        if(user.type=="0"){   
          navigate('/')
        }else{
          navigate('/student_form')
        }
      }
   
  }

  return (
    <div className="login">     
      <h1>Login</h1>
      <label>Type:</label>
      <select name="type" id="selecttag" onClick={handleChange}>
        <option value='0' selected>Staff</option>
        <option value='1'>Student</option>
      </select>
      <input type="text" name="email" value={user.email} onChange={handleChange} required placeholder="Enter email"></input>
      <input type='password' name="password" value={user.password} onChange={handleChange} required placeholder="Enter Password"></input>
      <div className="button" onClick={login}>Login</div>
      {/* <div>or</div>
      <div className="button">Register</div> */}
    </div>
  )
}

export default Login