const mongoose = require('mongoose')

const category_Schema = mongoose.Schema({
    cat_name:{type:String,require:true},
    cat_description:{type:String,require:true}
},
{timestamps:true}
)
const categoryModel = mongoose.model('Category',category_Schema);
module.exports = categoryModel