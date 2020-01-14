import React, { Component } from 'react';
import Axios from 'axios';

export default class editbug extends Component{
constructor(props){
    super(props);
    this.state={
        data:[],
        id:this.props.match.params.id,
        username:this.props.match.params.username,
        bugname:'',
        duration:'',
        Iscompleted:false
    }
    this.onchangebugname=this.onchangebugname.bind(this);
    this.onchangecomplete=this.onchangecomplete.bind(this);
    this.onchangeduration=this.onchangeduration.bind(this);
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
onsubmit(e){
    e.preventDefault();
    const bug={
        bugname:this.state.bugname,
        duration:this.state.duration,
        completed:this.state.Iscompleted
    }
    console.log(bug);
    Axios.patch('http://localhost:5000/user/'+this.state.username+'/'+this.state.id,bug)
    .then(result=>console.log("SucessFully Edited"))
    .catch(err=>console.log(err));
}
onchangeusername(e){
    this.setState({
        username:e.target.value
    })
}
render(){
    return(
        <div>
        <form className="form-group" onSubmit={this.onsubmit}>
            <div className="form-group">
            <label>Username</label>
            <input className="form-control" type="text" onChange={this.onchangeusername} value={this.state.username}/>
            </div>
            <div className="form-group">
            <label>BugName</label>
            <input className="form-control" placeholder="BugName" type="text" required onChange={this.onchangebugname}/>
            </div>
            <div className="form-group">
            <label>Duration</label>
            <input className="form-control" placeholder="Duration" type="text" required onChange={this.onchangeduration} />
            </div>
            <div>
            <label>Iscompleted<input className="form-check" type="checkbox" required onChange={this.onchangecomplete}/>
            </label>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={this.onsubmit}>Add</button>
            </div>
            </form>        
        </div>
    )
}
}