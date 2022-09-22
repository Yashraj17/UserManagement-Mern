import { Route, Routes } from 'react-router-dom';
import './App.css';
import Category from './Page/Category';
import Home from './Page/Home';
import Login from './Page/Login';
import Product from './Page/Product';
import Signup from './Page/Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/product' element={<Product/>}/>
        {/* <Header/> */}
        
      </Routes>
    </>
     
      
  );
}

export default App;
