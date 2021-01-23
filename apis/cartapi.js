const exp=require("express");
const { ReplSet } = require("mongodb");
const cartRouteObj=exp.Router();

cartRouteObj.use(exp.json());

cartRouteObj.post("/addToCart",(req,res)=>{
    let cardObj=req.body;
    let cartCollectionObject=req.app.get("cartCollectionObject")
    cartCollectionObject.findOne({pid:cardObj.pid})
    .then((cartObj)=>{
        if(cartObj==null){
            cartCollectionObject.insertOne(cardObj)
            res.send({message:"product added to cart!!"})
        }
        else{
            res.send({message:"product already added to cart!!"})
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

cartRouteObj.get("/getCart",(req,res)=>{
    let cartCollectionObject=req.app.get("cartCollectionObject")
    cartCollectionObject.find().toArray()
    .then((cartArray)=>{
        res.send({cart:cartArray})
    })
    .catch((err)=>{
        console.log(err);
    })
})

cartRouteObj.delete("/deleteObj/:pid",(req,res)=>{
    let delid=req.params.pid;
    let cartCollectionObject=req.app.get("cartCollectionObject")
    cartCollectionObject.deleteOne({pid:delid})
    .then((success)=>{
        console.log(success);
        res.send({message:"deleted successfully"})
    })
    .catch((err)=>{
        console.log(err);
    })
})


module.exports=cartRouteObj