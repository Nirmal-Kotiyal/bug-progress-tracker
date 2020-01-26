import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
const Bug = props => (
    <tr>
    <td style={{fontFamily:"Raleway",color:"grey"}}>{props.bugs.bugname}</td>
    <td style={{fontFamily:"Raleway",color:"grey"}}>{props.bugs.created}</td>
    <td style={{fontFamily:"Raleway"}}><ProgressBar variant={props.bugs.progress} label={props.bugs.label} style={{width:"65px"}} animated={true} now={100} /></td>
    <td style={{fontFamily:"Raleway",color:"grey"}}>{props.bugs.duedate}</td>
    <td>
      <a href={props.username+"/"+props.bugs._id}>
      <Fab size="small" fontSize="small" color="primary" aria-label="edit">
      <EditIcon fontSize="small" />
      </Fab>
      </a>  ||  
<a href="#" onClick={() => { props.deletebugs(props.bugs._id) }}>
       <DeleteIcon color="secondary"/>
       </a>
    </td>   
  </tr>
  )

export default class Bugs extends Component{
constructor(props){
    super(props);
    
    this.deletebugs=this.deletebugs.bind(this);
    this.state={
        bugs:[],
        username:this.props.match.params.username,
    }
}

async componentDidMount(){
  console.log("conponent method ran")
 const response = await axios.get('/api/user/'+this.state.username)  
  const data = response.data.bugdetail;
  this.setState({
    bugs:data
  })
  }

    BugsList(){
           return this.state.bugs.map(currentbug => {
             console.log(currentbug.created);
            return <Bug bugs={currentbug} username={this.state.username} deletebugs={this.deletebugs} key={currentbug._id}/>;
          })
}
    deletebugs(id){
      console.log(id);
      axios.delete('/api/user/'+this.state.username+'/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      bugs: this.state.bugs.filter(el => el._id !== id)
    })
    }
  
render(){
    return(
      <div>
        <div className="form-group">
          <h1 style={{marginBottom:"10px",marginTop:"5px",fontFamily:"Raleway",textAlign:"center",color:"grey",textTransform:"uppercase"}}>{this.state.username} Bugs</h1>
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th style={{fontFamily:"Raleway"}}>Bug</th>
                      <th style={{fontFamily:"Raleway"}}>Created</th>
                      <th style={{fontFamily:"Raleway"}}>Progress</th>
                      <th style={{fontFamily:"Raleway"}}>Due Date</th>
                      <th style={{fontFamily:"Raleway"}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.BugsList()}
                  </tbody>
                </table>
                </div>
                </div>
    )
}
}
