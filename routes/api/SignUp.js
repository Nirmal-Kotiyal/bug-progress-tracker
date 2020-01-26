const express = require('express');
const user = require('../../model/Users.detail.Model');
const router = express.Router();

router.post('/',(req,res)=>{
    const userdata={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }

if(!userdata.name){
    res.end("Plz enter the name");
}
if(!userdata.email){
    res.end("Plz enter the email");
}
if(!userdata.password){
    res.end("Plz enter the password");
}

userdata.email=userdata.email.toLowerCase();

user.find({email:userdata.email},(err,prevUser)=>{
    if(err) {
        res.end("Server error")
    }
    else if(prevUser.length>0){
        res.end("Email is already linked to an account");
    }
    else{
        console.log(prevUser);
        const newuser=new user({
            name:userdata.name,
            email:userdata.email,
            password:userdata.password
        });
        
        newuser.save()
        .then(res.send({id:newuser._id}))
        .catch(err=>console.error(err));                
    }
})
});

router.get('/',(req,res)=>{
    user.find().exec((err,result)=>{
        if(err) console.error(err);
         res.send(result);
    });
});

module.exports = router;