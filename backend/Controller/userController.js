const UserModel = require("../Model/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const allUser = async (req,res)=>{
    try {
        
        const allUsers = await UserModel.find({}).find({_id:{$ne:req.user._id}})
        res.status(200).json({allUsers})
    } catch (error) {
        console.log(error.message);
    }

}

const signup = async (req,res)=>{
    try {
        const profile = req.file;
        console.log(profile);
        const {name,email,password} = req.body;
        const checkUser = await UserModel.findOne({email:email})
        if (checkUser !== null ) {
            return res.status (404).json({message:'Email already registered'})
        }
        else{
            if (name && email && password) {
                const hasspassword = await bcrypt.hash(password,10)
                const user = await UserModel.create({
                    name:name,
                    email:email,
                    password:hasspassword,
                    prevPassword:hasspassword
                })
                const token = jwt.sign({userId:user._id},"hellomynameisyash",{expiresIn:'5d'})
                res.status(200).json({message:`You are registered`,_id:user._id,name:name,email:email,token:token,image:user.photo});
            }
            else{
                return res.status(404).json({message:"All Field are Required "});
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        if (email && password) {
            const isUser = await UserModel.findOne({email:email});
                if (isUser !== null) {
                    const isMatch = await bcrypt.compare(password,isUser.password)
                    if (isUser.email === email && isMatch) {
                        const token = jwt.sign({userId:isUser._id},"hellomynameisyash",{expiresIn:'5d'})

                        return res.status(200).json({message:"You are logged in",_id:isUser._id,name:isUser.name,email:email,token:token,image:isUser.photo,status:isUser.status});
                    }
                    else{
                        return res.status(404).json({message:"Email or Password does not match"});
                    }
                }
                else{
                    return res.status(404).json({message:'User not exist'})
                }
        }
        else{
            return res.status(404).json({message:'All Field required'})
        }
    } catch (error) {
        console.log(error.message);
    }
}


const edit_user_profile = async (req,res)=>{
    const {userId,name} = req.body;
    try {
        const updatedUser = await UserModel.findOneAndUpdate(userId,{
            name:name
        },{new:true})
        if (updatedUser === null) {
            return res.status(404).json({message:'SomeThing Went Wrong Try Again'})
        }
        else{
            return res.status(200).json(updatedUser)
        }
    } catch (error) {
        console.log(error.message);
    }
}

const changePassWord = async (req,res)=>{
    try {
        const {password,confirm_password} = req.body;
        if (password && confirm_password) {
            if (password !== confirm_password) {
                res.send({status:'faild',message:'New password and confirm passsword does not match'})
            } else {
                const hasspassword = await bcrypt.hash(password,10);
               const user =  await UserModel.findByIdAndUpdate(req.user._id,{$set:{password:hasspassword}},{new:true})
                res.status(200).json({status:true,user})
            }
        } else {
            res.send({status:'faild',message:'All field requird'})
        }
    } catch (error) {
        console.log(error.message);
    }
}
 //reset verify email
 const verifyEmail = async (req,res)=>{
   
        const {email}= req.body;
    if (email) {
        const user = await UserModel.findOne({email:email})
        if (user) {
            const secret = user._id + process.env.JWT_SECRET_KEY
            const token = jwt.sign({userId:user._id},secret,{expiresIn:'5d'});
            // https://login-system-jwt.herokuapp.com/
            // http://127.0.0.1:8081
            const link = `http://127.0.0.1:8081/user/reset/${user._id}/${token}`

            var mailOptions = {
                from:process.env.EMAIL_FROM,
                to:user.email,
                subject:"JWT AUTHENTICATION PASSWORD RESET",
                html:`<a href=${link}>Click Here</a> to Reset Password`
            };

            await transporter.sendMail(mailOptions,function (error,response) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json({message:'Please Check Your Gmail to Recover Your Password'})
                }
            })

        } else {
            res.send({'status':'faild','message':'Email does exits Please signup'})
        }
    } else {
        res.send({'status':'faild','message':'field requird'})
    }
    }
    



module.exports ={
    signup,
    login,
    edit_user_profile,
    allUser,
    changePassWord,
    verifyEmail
}