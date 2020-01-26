const mongoose=require('mongoose')

const schema=mongoose.Schema;

const option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const users=new schema({
    username:{type:String,required:true,unique:true},
    bugdetail:[{
            bugname:{type:String,required:true,unique:true},
            label:{type:String,require:true},
            progress:{type:String,require:true},
            duedate:{type:String,require:true},
            created:{type:String,default:new Date().toDateString()}
    }]
})

const user_model=mongoose.model("users-bugs",users);

module.exports=user_model;