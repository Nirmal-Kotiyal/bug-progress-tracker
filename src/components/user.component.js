import React, { Component } from 'react';
import Axios from 'axios'


export default class user extends Component{
constructor(props){
    super(props);
    this.state={
        data:[],
        username:''
    }
    this.onselect=this.onselect.bind(this);
}

onselect(e){
this.setState({
    username:e.target.value
})
}

showbugs=()=>{

window.location='/'+this.state.username;

}

addbugs=()=>{

window.location='/createbug/new/'+this.state.username;

}

componentDidMount(){
Axios.get('http://localhost:5000/user')
.then(result=>{
    this.setState({
        data:result.data,
        username:result.data[0]
    })
})

}

render(){
    return(
        <div>
            <div className="form-group">
            <label>List of Users</label>
<select className="form-control" value={this.state.username} onChange={this.onselect}>{
this.state.data.map(user=>{
    return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
})
}</select>
        </div>
        <table>
            <tc>
        <button  type="submit" className="btn btn-primary" onClick={this.addbugs}>AddBugs</button>
        </tc>
        <td></td>
        <td></td>
        <td></td>
        <td></td><td></td>
        <td></td><td></td>
        <td></td><td></td>
        <td></td><td></td>
        <td></td><td></td>
        <td></td>
        <tc>
        <button  type="submit" className="btn btn-primary" onClick={this.showbugs}>ShowBugs</button>
        </tc>
        </table>
</div>
    )
}
}

