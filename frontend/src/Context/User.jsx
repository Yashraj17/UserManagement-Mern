import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const User = createContext()

const UserContext = ({children}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [user,setUser] = useState();
    const [category,setCategory] = useState([])
    const [product,setProduct] = useState([])
    const [select,IsSelected] = useState('')
    const [selectPro,IsSelectedPro] = useState('')


    const isAuth = ()=>{
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo)
        if(!userInfo ){
            if (location.pathname !== '/login' && location.pathname !== '/signup') {
                
                navigate('/login') 
            }
        }
    }
            useEffect(()=>{
                isAuth()
                // eslint-disable-next-line
            },[navigate])
    const getCategory = async()=>{
      const {data}= await axios.get("http://localhost:8081/api/category/all")
      setCategory(data.allCategory)
  }
    const getProduct = async()=>{
      const {data}= await axios.get("http://localhost:8081/api/product/all")
      setProduct(data.getProducts)
  }
           useEffect(()=>{
             getCategory()
              getProduct()
                // eslint-disable-next-line
            },[navigate])
  return (
    <User.Provider value={{user,category,setCategory,getCategory,product,getProduct,IsSelected,select,selectPro,IsSelectedPro}}>{children}</User.Provider>
  )
};

export default UserContext;

export const UserState = ()=>{
    return useContext(User)
}