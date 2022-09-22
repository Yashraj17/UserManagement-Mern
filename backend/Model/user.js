const mongoose = require('mongoose')

const user_Schema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    prevPassword:{type:String,require:true},
    photo:{type:String,require:false,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
},
{ timestamps: true }
)
const UserModel = mongoose.model('User',user_Schema);
module.exports =UserModel