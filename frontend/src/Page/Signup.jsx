import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!name || !email || !password){
      return console.log("Please fill all the fields");
    }
    else{
      try {
        const config ={
          headers:{
            "Content-types":"application/json",
          }
        }
        const {data} = await axios.post("http://localhost:8081/api/signup",{name,email,password},config)
        // console.log('user registred successfull',data.name);
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
                <h5 className="text-center mt-3">Signup</h5>
                <form onSubmit={(e)=>handleSubmit(e)} className="p-3">
                    <span>UserName</span>
                    <input className="form-control mb-2" onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Enter UserName" name="name" />
                    <span>Email</span>
                    <input className="form-control mb-2" onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter Email" name="email" />
                    <span>Password</span>
                    <input className="form-control mb-2" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Enter Password" name="password" />
                    <input type="submit" value="Submit" className="btn btn-secondary w-100" />
                </form>
                <h6 className="text-center mt-2 mb-3">Already have an Account ?  <span> <Link to='/login' style={{textDecoration:'none',color:'#0095f6',fontSize:15,fontWeight:'600'}}> Login</Link>  </span> </h6>
            </div>
            </div>
        </div>
    </div>
 
  )
};

export default Signup;
