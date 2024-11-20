import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {

    const token = req.cookies.jwt;
  
    
    if(!token) {
        res.status(400).json("Unauthorized - No Token provided")
    }
    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            res.status(400).json("Invalid Token");
        }
        
        
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Server side error", error.message)
    }

}