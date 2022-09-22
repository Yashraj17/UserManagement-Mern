const productModel = require("../Model/product");

const getAllProduct = async (req,res)=>{
    try {
        const getProducts = await productModel.find({})
        if (getProducts !==null) {
            res.status(200).json({message:'All Products Data',getProducts})
        }
        else{
            res.status(404).json({message:'No Products Exits'})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const  createProduct = async (req,res) =>{
    try {
        console.log(req.body);
        const newProduct = await productModel.create(req.body)
        res.status(200).json({message:'New Product',newProduct})
    } catch (error) {
        console.log(error.message);
    }
}
const deleteProduct = async (req,res)=>{
    try {
        const id = req.params._id;
        var product =await productModel.findById(id)
        if(product){
            await product.remove();
            res.status(200).json({message:'Product Deleted',product})
        }
        else{
            res.status(404).json({message:'No Products Exits'})
        }
    } catch (error) {
        console.log("this is me",error.message);
    }
}
const getSingleProduct = async (req,res)=>{
    try {
        const id = req.params._id;
        var product =await productModel.findById(id)
        if(product){
            res.status(200).json({status:true,product})
        }
        else{
            res.status(404).json({message:'No Products Exits'})
        }
    } catch (error) {
        console.log(error.message);
    }
}
const updateProduct = async (req,res)=>{
    try {
        const id = req.params._id
        console.log("this is id",id);
        const product = await productModel.findByIdAndUpdate(id,req.body,{new:true})
        console.log(product);
        res.status(200).json({
            status:true,
            product
        })
    }catch (error) {
        res.status(400).json({
            status:false,
            message:error.message
        })
    }
}


module.exports={
    getAllProduct,
    createProduct,
    deleteProduct,
    getSingleProduct,
    updateProduct
}