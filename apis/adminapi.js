const exp=require("express");
const adminRouteObj=exp.Router();

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
        folder: 'adminfolder',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
      },
});


//configure multer
var multerObj = multer({ storage: clStorage });


const bcrypt=require("bcryptjs");

//import json web token
const jwt=require("jsonwebtoken");



adminRouteObj.use(exp.json());

adminRouteObj.post("/aregister",multerObj.single("photo"),(req,res)=>{
    //get cdn links from cloudinary
    let profilepic=req.file.path;

    
    

    let admin=JSON.parse(req.body.adminObject);
    admin.photo=profilepic;
    console.log(admin);

    const adminObj=admin;

    const adminCollectionObject=req.app.get("adminCollectionObject");

    adminCollectionObject.findOne({username:adminObj.username})
    .then(adminObject=>{
        if(adminObject==null){

            bcrypt.hash(adminObj.password,5)
            .then(hashedPassword=>{
                adminObj.password=hashedPassword;
                console.log("adminObject is:",adminObj);
                adminCollectionObject.insertOne(adminObj)
                .then((success)=>{
                    res.send({message:"admin registration successfully"})
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

//admin login
adminRouteObj.post("/login",(req,res)=>{
    let userCredentialsObject=req.body;
    console.log(userCredentialsObject);

   //get user colletion object
   const adminCollectionObject=req.app.get("adminCollectionObject");

   adminCollectionObject.findOne({username:userCredentialsObject.username})
   .then(
       adminObject=>{
           if(adminObject==null){
               res.send({message:"invalid username",status:"failed"})
           }
           else{
               bcrypt.compare(userCredentialsObject.password,adminObject.password,(err,result)=>{
                   if(err){
                       console.log(err);
                   }
                   else if(result==false){
                       res.send({message:"invalid password",status:"failed"});
                   }
                   else{
                       jwt.sign({username:adminObject.username},"secret",{expiresIn:100},(err,signedToken)=>{
                           if(err){
                               console.log(err);
                           }
                           else{
                               res.send({message:signedToken,username:adminObject.username,photo:adminObject.photo,status:"success",email:adminObject.email});
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

//read a admin by username
adminRouteObj.get("/read/:username",(req,res)=>{
    let usernameFromClient=req.params.username;

    //get user collection object
    const adminCollectionObject=req.app.get("adminCollectionObject");
    //find user
    adminCollectionObject.findOne({username:usernameFromClient})
    .then(adminObj=>{
        res.send({message:adminObj})
    })
    .catch(
        err=>{
            console.log(err);
        }
    )
})

//update
adminRouteObj.put("/update",(req,res)=>{
    let modifiedAdminObj=req.body;
    //get admin collection object
    const adminCollectionObject=req.app.get("adminCollectionObject");

    adminCollectionObject.updateOne({username:modifiedAdminObj.username},{
        $set:{Firstname:modifiedAdminObj.Firstname,dob:modifiedAdminObj.dob,Lastname:modifiedAdminObj.Lastname}
    })
    .then(()=>{
        adminCollectionObject.findOne({username:modifiedAdminObj.username})
        .then(latestAdminObj=>res.send({message:"update success",adminObj:latestAdminObj}))
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
})


module.exports=adminRouteObj;