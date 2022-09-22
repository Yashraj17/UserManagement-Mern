import axios from "axios";
import React from "react";
import { UserState } from "../Context/User";

const ProductTable = () => {
    const {product,getProduct,IsSelectedPro}= UserState()
    const handleDelete = async (id)=>{
        try {
            await axios
            .delete(`http://localhost:8081/api/product/delete/${id}`)
            .then(() => {
              getProduct()
            });
        } catch (error) {
            console.log("hello",error);
        }
    }
    const handleGetPro = async (id)=>{
        console.log("this is product",id);
        const {data} = await axios.get(`http://localhost:8081/api/product/single/${id}`)
        console.log(data);
        IsSelectedPro(data.product)
    }
  return(
    <div className="card shadow mt-3">
        <h5 className="text-center mt-3"> Category Table</h5>
        <div className="px-3">
        <table className="table">
        <thead>
            <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
           
                {
                    product !== "" && product?.map((value,index)=>(
                        <tr key={index}>
                            <td>{value.product_name}</td>
                            <td>{value.price}</td>
                            <td>{value.cat_id}</td>
                            <td>{value.description}</td>
                            <td>
                                <td><button onClick={()=>handleDelete(value._id)} className="btn btn-danger btn-sm" >Delete</button></td>
                                <td><button onClick={()=>handleGetPro(value._id)} className="btn btn-success btn-sm" >Edit</button></td>
                            </td>
                    </tr>
                    ))
                }
                
        </tbody>
        </table>
        </div>
        
    </div>
  )
};

export default ProductTable;
