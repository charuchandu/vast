const exp=require("express");
const productRouteObj=exp.Router();

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
        folder: 'productfolder',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
      },
});


//configure multer
var multerObj = multer({ storage: clStorage });

productRouteObj.use(exp.json());

productRouteObj.post("/addproduct",multerObj.single("photo"),(req,res)=>{
    //get cdn links from cloudinary
    let image=req.file.path;

    
    console.log("productObject is:",req.body.productObject);

    let product=JSON.parse(req.body.productObject);
    product.photo=image;
    console.log(product);

    const productObj=product;
    console.log(productObj);

    //get product colletion object
    const productCollectionObject=req.app.get("productCollectionObject");

    productCollectionObject.findOne({pid:productObj.pid})
    .then(productObject=>{
        if(productObject==null){
         productCollectionObject.insertOne(productObj)
         .then((success)=>{
            res.send({message:"product added successfully"})
         })
         .catch(err=>console.log("error in adding",err))
        }
        else{
            res.send({message:"product already existed id"})
        }

    })
    .catch(
        err=>console.log("err in reading user",err)
    )

})

//get all products
productRouteObj.get("/products",(req,res)=>{
    //get product collection object
    const productCollectionObject=req.app.get("productCollectionObject");
    productCollectionObject.find().toArray()
    .then(
        productsArray=>res.send({message:"success",products:productsArray})
    )
    .catch(err=>{
        res.send({message:"err"})
    })
})

//delete 
productRouteObj.delete("/deleteproduct/:pid",(req,res)=>{
   // let deleteObj=req.body;
    let paramsid=req.params;
    console.log(paramsid);
    //delete one
   const productCollectionObject=req.app.get("productCollectionObject");
    productCollectionObject.deleteOne({pid:paramsid.pid})
   .then(
        productCollectionObject.find().toArray()
        .then(
           productsArray=>res.send({message:"success",products:productsArray})
        )
        .catch(err=>{
         res.send({message:"err"})
        } )

    )
    .catch(err=>console.log(err))
})

module.exports=productRouteObj;