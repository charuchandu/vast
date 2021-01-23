const exp=require("express");
const userRouteObj=exp.Router();

//import cloudinary modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');



//configure cloudinary
cloudinary.config({
    cloud_name: "dsovo9zd2",
    api_key: "783754171231941",
    api_secret: "-cNgfluzLOdJDdoiQjDcw4G1aHM"
});




//configure storage setting
var clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'userfolder',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
      },
});


//configure multer
var multerObj = multer({ storage: clStorage });


const bcrypt=require("bcryptjs");

//import json web token
const jwt=require("jsonwebtoken");

userRouteObj.use(exp.json());

userRouteObj.post("/uregister",multerObj.single("photo"),(req,res)=>{
    //get cdn links from cloudinary
    let profilepic=req.file.path;

    
    console.log("userObject is:",req.body.userObject);

    let user=JSON.parse(req.body.userObject);
    user.photo=profilepic;
    console.log(user);

    const userObj=user;
    console.log(userObj);

    //get user colletion object
    const userCollectionObject=req.app.get("userCollectionObject");

    userCollectionObject.findOne({username:userObj.username})
    .then(userObject=>{
        if(userObject==null){

            bcrypt.hash(userObj.password,5)
            .then(hashedPassword=>{
                userObj.password=hashedPassword;
                userCollectionObject.insertOne(userObj)
                .then((success)=>{
                    res.send({message:"user registration successfully"})
                })
                .catch(err=>console.log("error in inserting",err));
            }) 
        }
        else{
            res.send({message:"user already existed"})
        }
    })
    .catch(
        err=>console.log("err in reading user",err)
    )

})

//user login
userRouteObj.post("/login",(req,res)=>{
    let userCredentialsObject=req.body;
    console.log(userCredentialsObject);

   //get user colletion object
   const userCollectionObject=req.app.get("userCollectionObject");

   userCollectionObject.findOne({username:userCredentialsObject.username})
   .then(
       userObject=>{
           if(userObject==null){
               res.send({message:"invalid username",status:"failed"})
           }
           else{
               bcrypt.compare(userCredentialsObject.password,userObject.password,(err,result)=>{
                   if(err){
                       console.log(err);
                   }
                   else if(result==false){
                       res.send({message:"invalid password",status:"failed"});
                   }
                   else{
                       jwt.sign({username:userObject.username},"secret",{expiresIn:100},(err,signedToken)=>{
                           if(err){
                               console.log(err);
                           }
                           else{
                               res.send({message:signedToken,username:userObject.username,photo:userObject.photo,status:"success",email:userObject.email});
                           }
                       });
                   }
               })
           }
       }
   )
   .catch(
       err=>{
           console.log("err in user login",err);
       }
   )
})

//read a user by username
userRouteObj.get("/read/:username",(req,res)=>{
    let usernameFromClient=req.params.username;

    //get user collection object
    const userCollectionObject=req.app.get("userCollectionObject");
    //find user
    userCollectionObject.findOne({username:usernameFromClient})
    .then(userObj=>{
        res.send({message:userObj})
    })
    .catch(
        err=>{
            console.log(err);
        }
    )
})

//update
userRouteObj.put("/update",(req,res)=>{
    let modifiedUserObj=req.body;
    //get user collection object
    const userCollectionObject=req.app.get("userCollectionObject");

    userCollectionObject.updateOne({username:modifiedUserObj.username},{
        $set:{name:modifiedUserObj.name,dob:modifiedUserObj.dob}
    })
    .then(()=>{
        userCollectionObject.findOne({username:modifiedUserObj.username})
        .then(latestUserObj=>res.send({message:"update success",userObj:latestUserObj}))
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
})

//read users
userRouteObj.get("/users",(req,res)=>{
    //get user collection object
    const userCollectionObject=req.app.get("userCollectionObject");
    userCollectionObject.find().toArray()
    .then(
        usersArray=>res.send({message:"success",users:usersArray})
    )
    .catch(err=>{
        res.send({message:"err"})
    })
})

module.exports=userRouteObj;