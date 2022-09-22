import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserState } from "../Context/User";

const CategoryForm = () => {
    const {getCategory,select,IsSelected} = UserState()
    const [cat_name,setCat_title] = useState("")
    const [cat_description,setCat_description] = useState('')
    useEffect(()=>{
      setCat_title(select.cat_name)
      setCat_description(select.cat_description)
    },[select])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!cat_name || !cat_description){
            return console.log("Please fill all the fields");
          }
          else{
            try {
              const config ={
                headers:{
                  "Content-types":"application/json",
                }
              }
               await axios.post("http://localhost:8081/api/category/create",{cat_name,cat_description},config).then(()=>{
                 getCategory()
               })
               setCat_title("")
               setCat_description("")
            } catch (error) {
              console.log(error.response.data.message);
            }
          }
    }
    const handleUpdate = async (e) =>{
      console.log(select._id)
      e.preventDefault()
      if(!cat_name || !cat_description){
          return console.log("Please fill all the fields");
        }
        else{
          try {
            const config ={
              headers:{
                "Content-types":"application/json",
              }
            }
             await axios.put(`http://localhost:8081/api/category/update/${select._id}`,{cat_name,cat_description},config).then(()=>{
               getCategory()
             })
             IsSelected("")
             setCat_title("")
             setCat_description("")
          } catch (error) {
            console.log(error.response.data.message);
          }
        }
    }
  return( 
            <div className="card shadow mt-3">
                <h5 className="text-center mt-3">Insert Category</h5>
                  {
                    (select)? <form onSubmit={(e)=>handleUpdate(e)}  className="p-3">
                       <span>Title</span>
                      <input className="form-control mb-2"  onChange={(e)=>setCat_title(e.target.value)} value={cat_name} type="text" placeholder="Enter Title" />
                      <span>Description</span>
                      <input className="form-control mb-2" onChange={(e)=>setCat_description(e.target.value)} value={cat_description} type="text" placeholder="Enter description" />
                      <input type="submit" value="Edit" className="btn btn-secondary w-100" />
                  </form>
                       :
                        <form onSubmit={(e)=>handleSubmit(e)}  className="p-3"> 
                        <span>Title</span>
                      <input className="form-control mb-2"  onChange={(e)=>setCat_title(e.target.value)} value={cat_name} type="text" placeholder="Enter Title" />
                      <span>Description</span>
                      <input className="form-control mb-2" onChange={(e)=>setCat_description(e.target.value)} value={cat_description} type="text" placeholder="Enter description" />
                      <input type="submit" value="Submit" className="btn btn-secondary w-100" />
                  </form>
                  }
                
            </div>
  )
};

export default CategoryForm;
