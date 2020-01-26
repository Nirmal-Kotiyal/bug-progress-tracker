import React, { Component } from 'react';
import qs from 'query-string'
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import '../App.css'
import Typed from 'react-typed'

  export default class user extends Component{
constructor(props){
    super(props);
    this.state={
        data:[],
        username:'',
        id:'',
    }
    this.onselect=this.onselect.bind(this);
}

onselect(e){
this.setState({
    username:e.target.value
})
}

showbugs=()=>{

window.location='content/'+this.state.username;

}

addbugs=()=>{

window.location='content/createbug/new/'+this.state.username;

}

componentDidMount(){
    const user=qs.parse(this.props.location.search);
    
    this.setState({
        username:user.username,
        id:user.token
    })
}

render(){
const add = ["Add","New","Bugs"];
const show = ["Show","Bugs","List"];    
    return(
//         <div>
//             {/* <Navbar userdata={this.state.username}/> */}
//             <div className="form-group">
//     <h1 style={{textAlign:"center",textTransform:"capitalize"}}>{this.state.username} DashBoard</h1>
//         </div>
//         <table>
//             <tc>
//         <Button type="submit" variant="contained" color="primary" onClick={this.addbugs}>AddBugs</Button>
        
//         <Button  type="submit" variant="contained" color="primary" onClick={this.showbugs}>ShowBugs</Button>
//         </tc>
//         </table>
// </div>
<div style={{paddingTop:"5em"}}>
    <Grow in="true"
    number="2000">
    <Grid
    container
  direction="row"
  justify="space-evenly"
  alignItems="center"
  >
        <Grid xs={6}
        container
        alignItems="center"
        direction="row"
  justify="space-evenly">
      <Paper elevation={20}>
    <Card style={{textAlign:"center",border:"solid #555"}} onClick={this.addbugs}>
        <CardActionArea className="addbugs" style={{width:"40vmin"}}>
            <CardContent>
                <i className="fas fa-bug" style={{fontSize:"10vw",color:"white"}}></i>
                <Typography style={{color:"white",paddingTop:"10px",fontSize:"2vw",fontWeight:"700"}}>
                <Typed className="self-typed"
                  loop
                  typeSpeed={60}
                  backSpeed={60}
                  strings={add}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                />
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    </Paper>
    </Grid>
    <Grid xs={6}
    container
    alignItems="center"
    direction="row"
  justify="space-evenly"
    >
    <Card style={{textAlign:"center",border:"solid #555"}} onClick={this.showbugs}>
        <CardActionArea className="showbugs" style={{width:"40vmin"}}>
            <CardContent>
            <i className="fas fa-bug" style={{fontSize:"10vw",color:"white"}}></i>
                <Typography style={{color:"white",paddingTop:"10px",fontSize:"2vw",fontWeight:"700"}}>
                <Typed className="self-typed"
                  loop
                  typeSpeed={60}
                  backSpeed={60}
                  strings={show}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                />
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    </Grid>
    </Grid>
</Grow>
</div>
    )
}
}

