const mongoose=require('mongoose')

const schema=mongoose.Schema;

const users=new schema({
    username:{type:String,required:true,unique:true},
    bugdetail:[{
            bugname:{type:String,required:true,unique:true},
            duration:{type:Number,require:true},
            completed:{type:Boolean,require:true}
    }]
})

const user_model=mongoose.model("user",users);

module.exports=user_model;