const express =require('express');
const router = express.Router();
const usersess = require('../../model/UserSession')

router.delete('/',(req,res)=>{
    const token=req.query.token;
    
    usersess.findOneAndDelete({UserId:token},(err,result)=>{
        if(result===undefined){
        return res.send("Not valid session");
    }
    else{    
    return res.send({logout:true});
    }
})

})


module.exports = router;