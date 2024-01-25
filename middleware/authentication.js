const jwt = require('jsonwebtoken');
const UserModal = require('../Modals/user_modal');
const asyncHandler = require('express-async-handler');

 exports.protect = asyncHandler( async (req,res,next)=>{
  let token;
if( req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ){
    try{
        token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.SCREAT_KEY);
        console.log(decode);
        req.user = await UserModal.findById(decode.user_id).select("password");
        next();
    }catch(err){
        res.status(401);
        throw new Error("Not authenized, token failed");
    }
}
});