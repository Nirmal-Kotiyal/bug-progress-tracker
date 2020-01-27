import React, { Component } from 'react';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import SaveIcon from '@material-ui/icons/Save'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class editbug extends Component{
constructor(props){
    super(props);
    this.state={
        statebugdata:[],
        id:this.props.match.params.id,
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
    this.onchangedate=this.onchangedate.bind(this);
    this.onselect=this.onselect.bind(this);
    this.onsubmit=this.onsubmit.bind(this);
}

onchangebugname(e){
    console.log(e.target.value);
    this.setState({
        bugname:e.target.value
    })
}

onchangeduration(e){
    console.log(e.target.value);
    this.setState({
        duration:Number.parseInt(e.target.value)
    })
}

onchangecomplete(e){
    console.log(e.target.value);
    if(e.target.value==='on'){
        this.setState({
            Iscompleted:true
        })    
    }
    else{
        this.setState({
            Iscompleted:false
        })
    }
}

handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    this.setState({
      open:false
    })
  };

onsubmit(e){
    e.preventDefault();
    const data=sessionStorage.getItem("SessionStorage");
  const parseddata = JSON.parse(data);
  const userdata={
    username:parseddata.name,
    id:parseddata.token
  }

    const date=this.state.duedate.toDateString();
    const bug={
        bugname:this.state.bugname,
        duration:this.state.duration,
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
            resp:"Plz Fill BugName"
          })
    }
    else{   
        Axios.patch('/api/user/'+this.state.username+'/'+this.state.id,bug)
    .then(result=>console.log("SucessFully Edited"))
    .catch(err=>console.log(err));
    
        this.setState({
            severity:"success",
            open:true,
            resp:"Bug Detail Has Been Changed"
          })   
    
    window.location=`/content?username=${userdata.username}&token=${userdata.id}`;
}
}
onchangedate(date){
    this.setState({
        duedate:date
    })
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

render(){
    return(
        <div style={{alignContent:"center",textAlign:"center",justifyContent:"center"}}>
            <Snackbar open={this.state.open} autoHideDuration={8000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity={this.state.severity}>
            {this.state.resp}  
            </Alert>
          </Snackbar>
            <h1 style={{textAlign:"center",marginTop:"10px",fontFamily:"Raleway",color:"#555"}}>Edit the BugDetails</h1>
            <form className="form-group" onSubmit={this.onsubmit}>
            <div style={{marginTop:"30px"}} className="form-group">
            <label style={{fontFamily:"Raleway",color:"#555"}}>BugName</label>
            <br></br>
            <TextField id="outlined-basic" label="Required" variant="outlined"  required onChange={this.onchangebugname} />
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
                <button type="submit" className="btn btn-success" onClick={this.onsubmit}><SaveIcon/> Save</button>
            </div>
            </form>           
        </div>
    )
}
}