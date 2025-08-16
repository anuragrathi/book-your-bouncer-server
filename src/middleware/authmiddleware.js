import jwtProvider from "../config/jwtProvider.js";
import User from "../models/user.model.js";


const checkIsUserAuthenticated = async (req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    if(authorization){
        try{
            token = authorization.split(" ")[1];
            // verify token
const userId = jwtProvider.getUserIdFromToken(token);
        // get user from token 
req.user = await User.findById(userId).select("-password");

        next();
        }catch(error){
            return res.status(401).json({message: "unAuthorized User"});
        }
    }else{
        return res.status(401).json({message: "unAuthorized User"});
    }
};

export default checkIsUserAuthenticated;