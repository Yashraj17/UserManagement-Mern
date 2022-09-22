import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const handleSubmit = async(e)=>{
    console.log("hello");
    e.preventDefault()
    if(!email || !password){
      return console.log("Please fill all the fields");
    }
    else{
      try {
        const config ={
          headers:{
            "Content-types":"application/json",
          }
        }
        const {data} = await axios.post("http://localhost:8081/api/login",{email,password},config)
        console.log('user registred successfull',data.name);
        localStorage.setItem('userInfo',JSON.stringify(data))
        navigate('/')
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  }
  return(
    <div className="container">
        <div className="row">
            <div className="col-4 mx-auto mt-3">
            <div className="card shadow">
                <h5 className="text-center mt-3">Login</h5>
                <form onSubmit={(e)=>handleSubmit(e)} className="p-3">
                    <span>Email</span>
                    <input className="form-control mb-2" onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter Email" name="email" />
                    <span>Password</span>
                    <input className="form-control mb-2" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Enter Password" name="password" />
                    <input type="submit" value="Submit" className="btn btn-secondary w-100" />
                </form>
                <h6 className="text-center mt-2 mb-3">Don't have an Account ? <span> <Link to='/signup' style={{textDecoration:'none',color:'#0095f6',fontSize:15,fontWeight:'600'}}> Signup</Link>  </span>  </h6>
                <h6 className="text-center mb-3"> <span className="text-primary">Forgot Password ?</span> </h6>
            </div>
            </div>
        </div>
    </div>
 
  )
};

export default Login;