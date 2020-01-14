import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Bug = props => (
    <tr>
    <td>{props.bugs.bugname}</td>
    <td>{props.bugs.duration}</td>
    <td><input type="checkbox" checked={props.bugs.completed}/></td>
    <td>
    <Link to={props.username+"/"+props.bugs._id}>edit</Link> | <a href="#" onClick={() => { props.deletebugs(props.bugs._id) }}>delete</a>
    </td>   
  </tr>
  )

export default class Bugs extends Component{
constructor(props){
    super(props);
    this.deletebugs=this.deletebugs.bind(this);
    this.state={
        bugs:[],
        username:props.match.params.username,
    }
}

componentDidMount(){
    axios.get('http://localhost:5000/user/'+this.state.username)
    .then(result=>{
        const arr=result.data;
        console.log(arr);
        this.setState({
            bugs:arr
        })
    })
    .catch(err=>console.log(err));
}

    BugsList(){
        return this.state.bugs.map(currentbug => {
            return <Bug bugs={currentbug} username={this.state.username} deletebugs={this.deletebugs} key={currentbug._id}/>;
          })
}
    deletebugs(id){
      console.log(id);
      axios.delete('http://localhost:5000/user/'+this.state.username+'/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      bugs: this.state.bugs.filter(el => el._id !== id)
    })
    }
  
render(){
    return(
        <div className="form-group">
          <h3>{this.state.username} Bugs</h3>
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Bug</th>
                      <th>Duration</th>
                      <th>IsCompleted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.BugsList()}
                  </tbody>
                </table>
                </div>
    )
}
}


