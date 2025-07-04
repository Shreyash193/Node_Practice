const adminAuth =(req,res,next)=>{
    const token="xyz";
    const isAuthorized = token ==="xyz";
     console.log("authorization checked");
    if(!isAuthorized){
       
        res.status(401).send("unAuthorized");
    }
    else{
        next();
    }
};

const userAuth =(req,res,next)=>{
    const token="xyz";
    const isAuthorized = token ==="xyz";
     console.log("authorization checked");
    if(!isAuthorized){
       
        res.status(401).send("unAuthorized");
    }
    else{
        next();
    }
};

module.exports ={
    adminAuth,userAuth
}