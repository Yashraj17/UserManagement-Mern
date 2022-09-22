const jwt = require('jsonwebtoken');
const UserModel = require('../Model/user');

const protect = async(req,res,next)=>{
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decode = jwt.verify(token,"hellomynameisyash");
            req.user = await UserModel.findById(decode.userId).select("-password");
            next();
        } catch (error) {
            res.status(401).json({message:'You are Unauthorized'})
        }
    }
}
module.exports = protect