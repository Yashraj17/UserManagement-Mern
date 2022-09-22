import React from "react";
import Header from "../Components/Header";
import ProductForm from "../Components/ProductForm";
import ProductTable from "../Components/ProductTable";

const Product = () => {
  return <>
  <Header/>
  <div className="container">
      <div className="row">
          <div className="col-4">
              <ProductForm/>
          </div>
          <div className="col-8">
            <ProductTable/>
          </div>
      </div>
  </div>
  </>
};

export default Product;
