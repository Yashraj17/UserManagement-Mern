const categoryModel = require("../Model/category");
const productModel = require("../Model/product");

const createCategory = async(req,res)=>{
    const {cat_name,cat_description} = req.body;
    try {
        const result = await categoryModel.findOne({cat_name:cat_name})
        if (result === null) {
            const category = await categoryModel.create({
            cat_name,
            cat_description
            })
            res.status(200).json({message:'New Category Created',category})
        }
        else{
            return res.status (404).json({message:'Category Already Exist'})
        }

    } catch (error) {
        console.log(error.message);
    }
}
const getAllCategory = async (req,res)=>{
    try {
        const allCategory = await categoryModel.find({})
        if (allCategory !== null) {
            res.status(200).json({message:'All category Data',allCategory})
        } else {
            res.status (200).json({message:'No Category Exist'})
        }
    } catch (error) {
        console.log(error.message);
    }
}
const getSingleCategory = async (req,res)=>{
    try {
        const _id = req.params._id
        const category = await categoryModel.findById(_id)
        if (category === null) {
            res.status(404).json({message:'No category found'})
        } else {
           res.status(200).json({
            status:true,
            category
           })
        }
    } catch (error) {
        console.log(error.message);
    }
}
const updateCategory = async(req,res)=>{
    try {
        const id = req.params._id
        const category = await categoryModel.findOneAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            status:true,
            category
        })
    }catch (error) {
        res.status(400).json({
            status:false,
            message:error.message
        })
    }
}
const deleteCategory = async (req,res)=>{
try {
    const _id = req.params._id
    var category =await categoryModel.findById(_id)
    if(category){
        // await productModel.deleteMany({cat_id:_id})
        category = await categoryModel.findByIdAndDelete(_id)
        res.status(200).json({message:'Product Deleted',category})
    }
    else{
        res.status(404).json({message:'No category Exits'})
    }
} catch (error) {
    console.log(error.message);
}
}
module.exports={
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
}