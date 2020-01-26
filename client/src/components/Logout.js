import React,{Component} from 'react';
import qs from 'query-string'
import Axios from 'axios'
export default class Logout extends Component{

    onclicklogout=async()=>{
        const user=qs.parse(this.props.location.search);
        console.log(user);
        const result=await Axios.delete(`/api/logout?token=${user.token}`);
        if(result.data.logout===true){
            window.alert("Logout Successfull");
            window.location='/';
        }    
    }
    
    render(props){
        const user=qs.parse(this.props.location.search);
        return(
            <div style={{textAlign:"center"}}>
        <h1 style={{width:"100%"}}>Welcome {user.username} for Logging In</h1>
        <button className="button mt-20" style={{width:"10vw"}} onClick={this.onclicklogout}>Logout</button>
            </div>
        )
    }
}