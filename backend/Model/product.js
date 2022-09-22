const mongoose = require('mongoose')

const product_Schema = mongoose.Schema({
    product_name:{type:String,require:true},
    cat_id:{type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
    },
    price:{type:Number,require:true},
    description:{type:String,require:true},
},
{ timestamps: true }
)

const productModel = mongoose.model('Product',product_Schema);
module.exports = productModel