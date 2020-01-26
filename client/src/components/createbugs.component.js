import React, { Component } from 'react';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default class createbug extends Component{
constructor(props){
    super(props);
    this.state={
        data:[],
        username:this.props.match.params.username,
        bugname:'',
        progress:"danger",
        label:["Stopped","InProgress","Completed"],
        currentlabel:"Stopped",
        duedate:new Date(),
        open:false,
        resp:" ",
        severity:" "
    }
    this.onchangebugname=this.onchangebugname.bind(this);
    // this.onchangecomplete=this.onchangecomplete.bind(this);
    this.onsubmit=this.onsubmit.bind(this);
    this.onselect=this.onselect.bind(this);
    this.onchangedate=this.onchangedate.bind(this);
}

onchangebugname(e){
    console.log(e.target.value);
    this.setState({
        bugname:e.target.value
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

// onchangecomplete(e){
//     console.log(e.target.value);
//     if(e.target.value==='on'){
//         this.setState({
//             Iscompleted:true
//         })    
//     }
//     else{
//         this.setState({
//             Iscompleted:false
//         })
//     }
// }

onchangedate(date){
this.setState({
    duedate:date
})
}

onsubmit(e){
    e.preventDefault();
    const date=this.state.duedate.toDateString();
    const bug={
        username:this.state.username,
        bugname:this.state.bugname,
        label:this.state.currentlabel,
        progress:this.state.progress,
        duedate:date
    }
    if(bug.bugname.length<1){
        this.setState({
            severity:"error",
            open:true,
            resp:"Plz Fill all the fields"
          })
    }
    else{
        this.setState({
            severity:"sucess",
            open:true,
            resp:"New Bug Added"
          })
    Axios.post('/api/user/add',bug)
    .then(result=>console.log("Bug SucessFully Added"))
    .catch(err=>console.log(err));
}
}

onselect(e){
    if(e.target.value==='Stopped'){
        this.setState({
            progress:"danger",
            currentlabel:e.target.value
        })
        }
    else if(e.target.value==='InProgress'){
        this.setState({
            progress:"warning",
            currentlabel:e.target.value

        })
    }
    else{
        this.setState({
            progress:"success",
            currentlabel:e.target.value
        })
    }
    console.log(this.state.progress);
    console.log('label',this.state.currentlabel);
}
componentDidMount(){
    Axios.get(`/api/user/${this.state.username}`)
    .then(result=>{this.setState({id:result.data.id})})
    .catch(err=>console.error(err));
}


render(){
    return(
        <div style={{alignContent:"center",textAlign:"center",justifyContent:"center"}}>
            <Snackbar open={this.state.open} autoHideDuration={8000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity={this.state.severity}>
            {this.state.resp}  
            </Alert>
          </Snackbar>
            <h3 style={{marginTop:"30px",fontFamily:"Raleway",color:"#555"}}>Fill the BugDetails</h3>
        <form className="form-group" onSubmit={this.onsubmit}>
            <div style={{marginTop:"30px"}} className="form-group">
            <label style={{fontFamily:"Raleway",color:"#555"}}>BugName</label>
            <br></br>
            <TextField id="outlined-basic" label="Required" variant="outlined"  required="true" onChange={this.onchangebugname} />
            {/* <input className="form-control" placeholder="BugName" type="text" required onChange={this.onchangebugname}/> */}
            </div>
            <div style={{marginTop:"20px"}} className="form-group">
                <label style={{fontFamily:"Raleway",marginBottom:"10px",color:"#555"}}>Status</label>
                <br></br>
                <TextField
          id="outlined-select-currency"
          select
          label="Bug Status"
          value={this.state.currentlabel}
          onChange={this.onselect}
          variant="outlined"
        >
          {this.state.label.map(currentlabel => (
            <MenuItem key={currentlabel} value={currentlabel}>
              {currentlabel}
            </MenuItem>
          ))}
        </TextField>
            {/* <select className="form-control" value={this.state.currentlabel} onChange={this.onselect}>{
this.state.label.map(currentlabel=>{
    return <option 
                    key={currentlabel}
                    value={currentlabel}>{currentlabel}
                    </option>; */}
{/* })
}</select> */}
            </div>
            <div style={{marginTop:"20px"}} className="form-group">
            <label style={{fontFamily:"Raleway",color:"#555"}}>DueDate</label>
            <div>
                <DatePicker zIndex="1000" position="relative" className="form-control" dateFormat="MMMM d, yyyy" selected={this.state.duedate} onChange={this.onchangedate} />
            {/* <label>Iscompleted<input className="form-check" type="checkbox" required onChange={this.onchangecomplete}/> */}
            {/* </label> */}
            </div>
            </div>

            <div style={{marginTop:"30px"}} className="form-group">
                <button type="submit" className="btn btn-success" onClick={this.onsubmit}><SaveIcon/> Add</button>
            </div>
            </form>        
        </div>
    )
}
}