import axios from "axios";
import React, { useState } from "react";
import CategoryForm from "../Components/CategoryForm";
import CategoryTable from "../Components/CategoryTable";
import Header from "../Components/Header";

const Category = () => {

  return (
    <>
    <Header/>
    <div className="container">
        <div className="row">
            <div className="col-4">
                <CategoryForm />
            </div>
            <div className="col-8">
                <CategoryTable/>
            </div>
        </div>
    </div>
    </>
  )
};

export default Category;
