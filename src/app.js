const express = require("express");
const {connectDB}=require("./config/database");
const {User}=require("./models/userSchema");

const app=express();

app.use(express.json());

//add user api
app.post("/signup",async (req,res)=>{

    const user=new User(req.body);
    
    try{
        await user.save();
        res.send("user saved successfull");
    }
    catch(err){
        res.status(400).send("Error in saving user " + err.message );
    };
});

//single user by mail id
app.get("/user",async(req,res)=>{

    const email=req.body.emailId;

    try{
        const user= await User.find({emailId:email});
        res.send(user);
    }
    catch(err){
        res.status(400).send("Something went Wrong");
    }
});

//get feed of app
app.get("/feed",async(req,res)=>{
    try{
        const users= await User.find({});
        res.send(users);
    }
     catch(err){
        res.status(400).send("Something went Wrong");
    }

})

//delete an user
app.delete("/deleteUser",async (req,res)=>{
    const userId=req.body.userId;
    try{
        const user= await User.findByIdAndDelete({_id:userId});
        res.send("user deleted Successfully");
    }
    catch(err){
        res.status(400).send("something went Wrong");
    }
});


//update an user data
app.patch("/updateUser/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    try{

        
        const allowedUpdates=["userId","photoUrl","about","gender","skills","age"];
        const isAllowedUpdates = Object.keys(data).every((keys)=>allowedUpdates.includes(keys));
        if(!isAllowedUpdates){
            throw new Error("UPDATE FAIL");
        }

        const user= await User.findByIdAndUpdate({_id:userId},data,{runValidators:true});
        res.send("user updated successfully");
    }
    catch(err){
        res.status(400).send("UPDATE FAIL" + err.message);

    }
})

//update user with EmailId
app.patch("/updateUserE",async (req,res)=>{
    const userId=req.body.emailId;
    try{
        const user= await User.findOneAndUpdate({emailId:userId},{firstName:"sam"});
        res.send("user updated successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

connectDB().then(()=>{
    console.log("Database connection established..");
    app.listen(3000,()=>{
    console.log("server is listening on port 3000..");
})
}).catch((err)=>{
    console.error("Database cannot be connected");
})


