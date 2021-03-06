const express =require('express');
const usermodel=require('../../model/user-bugs.model')
const router=express.Router();

router.get('/',(req,res)=>{
const username=[];
usermodel.find().exec((err,doc)=>{
    if(err){
        console.log(err);
    }
    else{
        doc.forEach(result=>{
            username.push(result.username);
        });
    }
    res.send(username);
})
    
});

router.post('/add',(req,res)=>{
    usermodel.findOne({username:req.body.username})
    .then(result=>{
        if(result===null){
            const newuser=new usermodel({
                username:req.body.username,
                bugdetail:[{
                    bugname:req.body.bugname,
                    label:req.body.label,
                    progress:req.body.progress,
                    duedate:req.body.duedate
                }]
            });
            
            newuser.save().then(res.send('User Sucessfully Added'))
            .catch(err=>{console.log(err)});
        }
        else{
            usermodel.findOne({username:req.body.username})
            .then(result=>{
                result.bugdetail.push({
                    bugname:req.body.bugname,
                    label:req.body.label,
                    progress:req.body.progress,
                    duedate:req.body.duedate            
                })
                result.save().then(res.send("Bug added")).catch(err=>console.error(err));
            })
        }
    })

});

router.get('/:username',(req,res)=>{
    const username=req.params.username;

    usermodel.findOne({username:username})
    .then(result=>res.send({bugdetail:result.bugdetail,id:result._id}).json())
    .catch(err=>res.send(err));
});

router.post('/:username',(req,res)=>{
const username=req.params.username;

usermodel.findOne({username:username})
.then(result=>{
result.bugdetail.push({
    bugname:req.body.bugname,
    label:req.body.label,
    progress:req.body.progress,
    duedate:req.body.duedate
});
result.save().then(res.send("Bug is Added")).catch(err=>res.send(err));
}).catch(err=>res.send(err));

});

router.patch('/:username/:id',(req,res)=>{
    const username=req.params.username;
    const Id=req.params.id;
    
    usermodel.findOne({username:username}).exec()
    .then(result=>{
        result.bugdetail.pull({_id:Id});
        result.save().then(console.log("Bug is deleted"))
        .catch(err=>res.send(err));
        
    

        result.bugdetail.push({
        bugname:req.body.bugname,
        label:req.body.label,
        progress:req.body.progress,
        duedate:req.body.duedate
        });

        result.save().then(result=>res.send(result)).catch(err=>res.send(err));
    }).catch(err=>res.send(err));

});

router.delete('/:username/:id',(req,res)=>{
    const username=req.params.username;
    const Id=req.params.id;
   
    usermodel.findOne({username:username})
    .then(result=>{
        result.bugdetail.pull({_id:Id});
        result.save().then(result=>res.send("Bug Sucessfully Deleted"))
        .catch(err=>res.send(err));
    }).catch(err=>res.send(err));

});

module.exports=router;