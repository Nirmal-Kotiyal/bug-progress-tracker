const express=require('express');
const bodyParser=require('body-parser');
const user=require('./routes/users');
const mongoose=require('mongoose');
const csp = require('express-csp-header');
const uri='mongodb://localhost:27017/bug-tracker-data'

mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true})
.then(
console.log("The server is connected to database")
).catch(err=>{
    console.log(err);
});

const app=express();


app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
     res.header("Access-Control-Allow-Headers",
     'Origin,X-Requested-With,Content-Type,Accept,Authorization')
     if(req.method==='OPTIONS'){
         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
         return res.status(200).json({});
    }
    res.header("Access-Control-Allow-Credentials","true");
    next();
});
app.use(csp({
    policies: {
        'default-src': [csp.NONE],
        'img-src': [csp.SELF],
    }
}));

app.use('/user',user);


module.exports=app;