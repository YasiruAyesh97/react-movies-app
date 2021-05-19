const jwt = require("jsonwebtoken");
const config = require("config");
    //take request object and return response to the client
    // passes control another middleware function


function authentication (req,res,next) {
    const token =req.header('x-auth-token');
    if(!token){
     return   res.status(401).send('access denied. No token provided');
    }
    try{
        const decoded =jwt.verify(token,config.get('jwtPrivateKey'));
        req.user=decoded;
        //call the router middleware function  in req,res pipline
        next();


    }catch(e){
        res.status(400).send('Invalid Token');

    }
}

module.exports =authentication ;