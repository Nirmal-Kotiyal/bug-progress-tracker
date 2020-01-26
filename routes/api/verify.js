const express =require('express');
const router = express.Router();
const usersess = require('../../model/UserSession')

router.get('/',(req,res)=>{
    const token=req.query.token;
    
    usersess.findOne({_id:token},(err,result)=>{
    
        if(result===undefined){
        return res.send("Not valid session");
    }
    else{    
    return res.send("Good");
    }
})

})

router.post('/user',(req,res)=>{
  const username=req.body.username;
  console.log(username);
  usersess.findOne({name:username},(err,result)=>{
      if(result===undefined){
          return res.send('Server error');
      }
      else{
          return res.send({id:result.UserId});
      }
  })  
})


module.exports = router;