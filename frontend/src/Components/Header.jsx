import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = ()=>{

    localStorage.removeItem('userInfo')
    navigate('/login')
}
  return(
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark ">
  <div class="container">
    <a class="navbar-brand" href="#">UserManagement</a>

      <ul class="navbar-nav">
        <li class="nav-item">
          <Link to='/' className="nav-link active" style={{textDecoration:'none'}}> Home</Link>
        </li>
        <li class="nav-item">
          <Link to='/category' className="nav-link active" style={{textDecoration:'none'}}> Category</Link>
        </li>
        <li class="nav-item">
          <Link to='/product' className="nav-link active" style={{textDecoration:'none'}}> Product</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link active btn btn-sm" onClick={()=>handleLogout()}>Logout</a>
        </li>
      </ul>
  </div>
</nav>
  )
};

export default Header;
