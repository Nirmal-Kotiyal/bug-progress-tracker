import React,{Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './SignUp.css'
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class SignIn extends Component{

setData(data){
let object = {name:data.name,token:data.token}
sessionStorage.setItem("SessionStorage",JSON.stringify(object))
}

handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  this.setState({
    open:false
  })
};

getData(){
let data = sessionStorage.getItem("SessionStorage");
return data;
}

state={
    email:'',
    password:'',
    open:false,
    resp:" ",
    severity:" "
}

onchangeemail=(e)=>{

    this.setState({
    email:e.target.value
})
}    

onchangepassword=(e)=>{
this.setState({
    password:e.target.value
})
}

onclicksignin=async()=>{
    const userdata={
        email:this.state.email,
        password:this.state.password
    }
const response=await Axios.post('/api/signin',userdata);
const token = response.data.token;
console.log(response)
console.log(token);
if(token===undefined){
  this.setState({
    severity:"error",
    open:true,
    resp:response.data
  })
    // window.alert(response.data);
}
else{
  this.setState({
    severity:"success",
    open:true,
    resp:"You have been sucessfully Logged In"
  })
this.setData(response.data);
window.location=`/content?username=${response.data.name}&token=${response.data.token}`
}
}



onclicksubmit=()=>{
    window.location='/signup';
}
    
    render(){
        return(  
          <div>       
        <Router>
         <Snackbar open={this.state.open} autoHideDuration={8000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity={this.state.severity}>
        {this.state.resp}  
        </Alert>
      </Snackbar>
          <div className="joinOuterContainer">
              <div className="joinInnerContainer">
                <h1 className="heading">Login</h1>
                <div>
                  <input placeholder="Email" className="joinInput" type="text" onChange={this.onchangeemail} />
                </div>
                <div>
                  <input placeholder="Password" className="joinInput mt-20" type="password" onChange={this.onchangepassword} />
                </div>
                  <button className={'button mt-20'} type="submit" onClick={this.onclicksignin}>Sign In</button>
                <h3 style={{marginTop:"20px",marginBottom:"5px",color:"white"}}>Don't have an account</h3>
                <button className={'button mt-20'} type="submit" onClick={this.onclicksubmit}>Sign Up</button>
              </div>
            </div>
            </Router>
            </div>  
        )
    }
}