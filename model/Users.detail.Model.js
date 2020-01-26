const mongoose =require('mongoose');


const users=new mongoose.Schema({

    name:{
        type:String,
        require:true,
        default:''
    },
    email:{
        type:String,
        requried:true,
        default:''
    },
    password:{
        type:String,
        required:true,
        default:''
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});


const user=mongoose.model('user-details',users);

module.exports = user;