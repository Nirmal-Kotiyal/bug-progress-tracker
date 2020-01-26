import React,{Component} from 'react';
import './SignUp.css'
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default class SignUp extends Component{
    
    state={
        name:'',
        email:'',
        password:'',
        open:false,
        resp:" ",
        severity:" "
    }
    
    onchangename=(e)=>{
    
        this.setState({
        name:e.target.value
    })
    } 

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        this.setState({
          open:false
        })
      };
    
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

    onclickregister=async()=>{
        const userdata={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }

        console.log(userdata.name);

        if(userdata.name.length<1||userdata.email.length<1||userdata.password.length<1){
            this.setState({
                severity:"error",
                open:true,
                resp:"Plz Fill all the fields"
              })
        }

else{
        const response = await Axios.post('/api/signup',userdata);
        console.log(response);
        const id=response.data.id;
        console.log(id);
        if(id===undefined){
            this.setState({
                severity:"error",
                open:true,
                resp:"Email Already Linked In"
              })
            window.location='/signup'
        }
        else{
            this.setState({
                severity:"success",
                open:true,
                resp:"You Are Signed UP"
              })
            window.location='/'
        }
    }
}
    render(){
        return(
            <div>
            <Snackbar open={this.state.open} autoHideDuration={8000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity={this.state.severity}>
            {this.state.resp}  
            </Alert>
          </Snackbar>
            <div className="joinOuterContainer">
              <div className="joinInnerContainer">
                <h1 className="heading">Sign Up</h1>
                <div>
                  <input placeholder="Name" className="joinInput" type="text" onChange={this.onchangename} />
                </div>
                <div>
                  <input placeholder="Email" className="joinInput mt-20" type="email" onChange={this.onchangeemail} />
                </div>
                <div>
                <input placeholder="password" className="joinInput mt-20" type="password" onChange={this.onchangepassword} />
                </div>
                  <button className={'button mt-20'} type="submit" onClick={this.onclickregister}>Register</button>
        </div>
        </div>
        </div>
        )
    }
}