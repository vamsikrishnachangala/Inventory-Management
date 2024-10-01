var express = require('express');
const fs= require('fs');
const multer = require('multer');
var router = express.Router();


const storage=multer.memoryStorage();
const upload=multer({storage:storage});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add/:firstNumber/and/:secondNumber', (req,res)=>{
  console.log(req.params.firstNumber + req.params.secondNumber);
  //Checkout console to see why parseInt is essential in this case.
  let firstNo = parseInt(req.params.firstNumber),
      secondNo = parseInt(req.params.secondNumber);
  res.json({"Addition" : firstNo + secondNo});
});

//Read the image file as a binary buffer
//Mongodb Atlas connection using mongoose
const mongoose=require('mongoose');
mongoose.connect("mongodb://mongo:27017/test",{useNewUrlParser:true,useUnifiedTopology: true })
.then(()=>{
  console.log("Connected to Mongodb");
})
.catch((err)=>{
  console.log("Failed to connect to Mongodb");
});

//InventorySchema
const inventoryschema= new mongoose.Schema({
  Item:Buffer,
  Name:String,
  Quantity:Number,
  User:String
});
//User Schema
const userschema= new mongoose.Schema({
  Username:{
    type:String,
    required:true,
    unique: true
  },
  Password:{
    type:String,
    required: true
  },
  Firstname:{
    type:String,
    required:true,
  },
  Lastname:{
    type:String,
    required:true,
  },
  Email:{
    type:String,
    required:true,
    unique:true
  },
  Age:{
    type:Number,
    required: true,

  },

});

const Inventoryitem=mongoose.model("Inventoryitems",inventoryschema);
const User = mongoose.model("User",userschema);



  router.get("/InventoryManagement/:username",async(req,res)=>{
    try {
      const username=req.params.username;
      const items =  await Inventoryitem.find({User:username});
      console.log('InventoryItems:');
      //console.log(items);
      res.json(items);
    } catch (err) {
      console.log(`Failed to fetch InevntoryItems: ${err}`);
      res.status(500).send('Failed to fetch InevntoryItems');
    }
  });

  router.post('/Submitadditem/:username',upload.single('image'),async (req,res)=>{

    const item=new Inventoryitem({
      Item:req.file.buffer,
      Name:req.body.name,
      Quantity:req.body.quantity,
      User:req.params.username
      });
      item.save()
      .then((submitteditem)=>{
        res.status(200).json({message:"Item Added sucessfully"})
      })
      .catch((error)=>{
        res.json(error);
      })
  });

  router.post('/Updateitem',async (req,res)=>{
    Inventoryitem.updateOne({_id:req.body._id},{Name:req.body.name,Quantity:req.body.quantity})
    .then((updatedItem)=>{
      res.status(200).json({message:"Item Updated sucessfully"})
    })
    .catch((error)=>{
      res.json(error);
    })
  });

  router.post('/Deleteitem',async (req,res)=>{
    Inventoryitem.deleteOne({_id:req.body._id})
    .then(()=>{
      res.status(200).json({message:"Item Deleted sucessfully"})
    })
    .catch((error)=>{
      res.json(error);
    })
  });

  router.post('/')
  
  //Login server router logic



  //Signup server router logic
  router.post('/Signup',async (req,res)=>{

    const newuser=new User({
      Username:req.body.username,
      Password:req.body.password,
      Firstname:req.body.firstname,
      Lastname:req.body.lastname,
      Email:req.body.email,
      Age:req.body.age

      });
      newuser.save()
      .then(()=>{
        res.status(200).json({message:"New user added sucessfully"})
      })
      .catch((error)=>{
        res.json({message:"Username already exists"});
      })
  });

  router.post('/Login',async (req,res)=>{
    const user=await User.findOne({Username:req.body.username})
      console.log(user)
      if(user===null){
        res.status(200).json({message:"Didn't find the user, Please signup to continue"})
      }else{
        if(user.Password!==req.body.password){
          res.status(200).json({message:"Password is wrong"})
        }
        else{
          res.status(200).json({message:"Login successful",user:user})
        }
      }
  });


module.exports = router;
