import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserState } from "../Context/User";

const ProductForm = () => {
  const {category,getProduct,selectPro,IsSelectedPro} = UserState()
  const[product_name,setProductName] = useState('')
  const[cat_id,setCat_id] = useState('')
  const[price,setPrice] = useState('')
  const[description,setDescription] = useState('')
  console.log(selectPro._id);
  useEffect(()=>{
    setProductName(selectPro.product_name)
    setPrice(selectPro.price)
    setCat_id(selectPro.cat_id)
    setDescription(selectPro.description)
  },[selectPro])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!product_name || !description || !cat_id || !price){
      return console.log("Please fill all the fields");
    }
    else{
      try {
        const config ={
          headers:{
            "Content-types":"application/json",
          }
        }
         await axios.post("http://localhost:8081/api/product/create",{product_name,cat_id,price,description},config).then((response)=>{
          getProduct()
          console.log("hello",response.data.newProduct);
         })
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  }
  const handleUpdate = async (e)=>{
    e.preventDefault()
    if(!product_name || !description){
        return console.log("Please fill all the fields");
      }
      else{
        try {
          const config ={
            headers:{
              "Content-types":"application/json",
            }
          }
           await axios.put(`http://localhost:8081/api/product/update/${selectPro._id}`,{product_name,description,price,cat_id},config).then((response)=>{
            getProduct()
            console.log(response);
          })
          IsSelectedPro("")
          setProductName("")
          setPrice("")
          setCat_id("")
          setDescription("")
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
  }
  return(
    <div className="card shadow mt-3">
    <h5 className="text-center mt-3">Insert Product</h5>
    {
      (selectPro) ? 
       <form onSubmit={(e)=>handleUpdate(e)} className="p-3">
      <span>Product Name</span>
      <input className="form-control mb-2" value={product_name} onChange={(e)=>setProductName(e.target.value)} type="text" placeholder="Enter Title" name="Product" />
      <span>Price</span>
      <input className="form-control mb-2" value={price} onChange={(e)=>setPrice(e.target.value)} type="text" placeholder="Enter Price" name="Price" />
      <span>Select Category</span>
      <select class="form-select" onChange={(e)=>setCat_id(e.target.value)} aria-label="Default select example">
          <option >{cat_id}</option>
          {
            category !== "" && category?.map((value,index)=>(
              <option key={index} value={value._id}>{value.cat_name}</option>
            ))
          }
          </select>
      <span>Description</span>
      <textarea className="form-control mb-2" onChange={(e)=>setDescription(e.target.value)} type="text" value={description} placeholder="Enter description" name="description" />
      <input type="submit" value="Update" className="btn btn-secondary w-100" />
    </form> :
     <form onSubmit={(e)=>handleSubmit(e)} className="p-3">
     <span>Product Name</span>
     <input className="form-control mb-2" onChange={(e)=>setProductName(e.target.value)} type="text" placeholder="Enter Title" name="Product" />
     <span>Price</span>
     <input className="form-control mb-2" onChange={(e)=>setPrice(e.target.value)} type="text" placeholder="Enter Price" name="Price" />
     <span>Select Category</span>
     <select class="form-select" onChange={(e)=>setCat_id(e.target.value)} aria-label="Default select example">
         <option>Open this select menu</option>
         {
           category !== "" && category?.map((value,index)=>(
             <option key={index} value={value._id}>{value.cat_name}</option>
           ))
         }
         </select>
     <span>Description</span>
     <textarea className="form-control mb-2" onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Enter description" name="description" />
     <input type="submit" value="Submit" className="btn btn-secondary w-100" />
 </form>
    }
   

</div>
  )
};

export default ProductForm;
