const exp=require("express");
const app=exp();
const path=require("path");
const mongoclient=require("mongodb").MongoClient;

const dbUrl="mongodb+srv://chandu:K3aVJBegzuCkUe6@cluster0.uhoj0.mongodb.net/practice?retryWrites=true&w=majority"

app.use(exp.static(path.join(__dirname,'./dist/vast')));

//importing apis 
const userApiObj=require("./apis/userapi");
const adminApiObj=require("./apis/adminapi");
const productApiObj=require("./apis/productapi")
const cartApiObj=require("./apis/cartapi")

//redirecting to apis
app.use("/user",userApiObj);
app.use("/admin",adminApiObj);
app.use("/product",productApiObj);
app.use("/cart",cartApiObj);

//err handling
app.use((req,res,next)=>{
    res.send({message:"path not existed"})
})
app.use((err,req,res,next)=>{
    console.log(err);
    res.send({message:"something went wrong!!"})
})

mongoclient.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
    //get db object
    const dbObj=client.db("practice");
    //get collection objects
    const userCollectionObject=dbObj.collection("usercollection");
    const adminCollectionObject=dbObj.collection("admincollection");
    const productCollectionObject=dbObj.collection("productcollection");
    const cartCollectionObject=dbObj.collection("cartcollection");
    
    //add collection object to app object
    app.set("userCollectionObject",userCollectionObject);
    app.set("adminCollectionObject",adminCollectionObject);
    app.set("productCollectionObject",productCollectionObject);
    app.set("cartCollectionObject",cartCollectionObject);
    console.log("db connected successfully")

    

})
.catch(err=>{
    console.log("error in db connection",err)
})

const port=3000;
app.listen(port,()=> console.log("server is running on port",port));