const express = require('express');
const user = require('../../model/Users.detail.Model');
const usersess = require('../../model/UserSession');
const router = express.Router();


router.post('/',(req,res)=>{
   
const userdata = {
    email:req.body.email,
    password:req.body.password
}

userdata.email=userdata.email.toLowerCase();

user.findOne({email:userdata.email},(err,usermodel)=>{
if(usermodel==null){
   return res.send("Enter valid email");
}

else if(userdata.password!==usermodel.password){
   return res.send("Enter valid password");
}

else{
   usersess.findOne({UserId:usermodel._id},(err,usersessionmodel)=>{
      console.log(usermodel);
      if(usersessionmodel===null){
         const newUserSession = new usersess();
         newUserSession.name=usermodel.name,
         newUserSession.UserId=usermodel._id;
         newUserSession.save()
         .then(result=>res.send({token:usermodel._id,name:usermodel.name}))
         .catch(err=>console.log(err));
      }
      else{
         return res.send("User already logged in");
      }
   })
}
});
});


module.exports=router;