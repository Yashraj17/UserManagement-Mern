import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/User";

const CategoryTable = () => {
const {category,setCategory,getCategory,IsSelected} = UserState()


    const handleDelete =async (id)=>{
        await axios
      .delete(`http://localhost:8081/api/category/delete/${id}`)
      .then(() => {
        getCategory()
      });
    }
    const handleGetCat = async (id)=>{
        const {data} = await axios.get(`http://localhost:8081/api/category/single/${id}`)
        console.log(data);
        IsSelected(data.category)
    }
  return(
    <div className="card shadow mt-3">
        <h5 className="text-center mt-3"> Category Table</h5>
        <div className="px-3">
        <table className="table">
        <thead>
            <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
               category !== "" &&  category?.map((value,index)=>(
                    <tr key={index}>
                        <td>{value.cat_name}</td>
                        <td>{value.cat_description}</td>
                        <th>
                            <td><button onClick={()=>handleDelete(value._id)} className="btn btn-danger btn-sm" >Delete</button></td>
                            <td><button onClick={()=>handleGetCat(value._id)} className="btn btn-success btn-sm" >Edit</button></td>
                        </th>
                    </tr>
                ))
            }
           
        </tbody>
        </table>
        </div>
        
    </div>
  )
};

export default CategoryTable;
