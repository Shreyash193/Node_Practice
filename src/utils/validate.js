const validator = require("validator");

const validateSignUpData = (req) =>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Enter Name Correctly");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter correct Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter Strong Password");
    }
}

module.exports ={
    validateSignUpData
}