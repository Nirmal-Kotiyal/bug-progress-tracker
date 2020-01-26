// import React, { Component } from 'react';
// import { Link} from 'react-router-dom';
// import Axios from 'axios'

// export default class Navbar extends Component {
// constructor(props){
// super(props);
// console.log(props.userdata)
// this.state={
//   username:'',
//   token:'',
//   iscalled:false
// }
// }
//  onclicklogout=async()=>{
//            const result=await Axios.delete(`/api/logout?token=${this.token}`);
//            if(result.data.logout===true){
//                window.alert("Logout Successfull");
//                window.location='/';
//            }    
//     }


// async componentDidMount(){
//   this.setState({
//     username:this.props.userdata
//   })
//      const name=this.state.username
//      console.log(name)
//     const response = await Axios.get(`/api/user/${{name}}`);
//     this.setState({
//       token:response.data.id
//     }) 
//     console.log(this.state.token)
//     }

//   render() {
//   //   const name=this.props.userdata.username;
//   //   if(!iscalled)
//   //   {
//   //   this.passingdata(name);
//   // this.setState({
//   //   iscalled:true
//   // })  
//   // }
//   // const data=sessionStorage.getItem("SessionStorage");
//   // const data1 = JSON.parse(data);
//   // console.log(data1.name);
//     return (
//       <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
//         <button><Link to={{           
//               pathname:'/content',
//              search:`?username=${this.username},?token=${this.token}`
//            }}>Home</Link></button>
//         <div className="collpase navbar-collapse">
//         <ul className="navbar-nav mr-auto">
//           <li className="navbar-item">
//           <button className="btn btn-danger" onClick={this.onclicklogout}>Logout</button>
//           </li>
//         </ul>
//         </div>
//       </nav>
//     );
//   }
//}
import React from 'react';
import { Link, Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Axios from 'axios'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Navbar() {
  const data=sessionStorage.getItem("SessionStorage");
  const parseddata = JSON.parse(data);
  const userdata={
    username:parseddata.name,
    id:parseddata.token
  }

  const classes = useStyles();
  

  const [open, setOpen] = React.useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




  async function onclicklogout(){
        const result=await Axios.delete(`/api/logout?token=${userdata.id}`);
        if(result.data.logout===true){
            setOpen(true);
            window.location='/';
        }    
    }
    function onclickhome(){
      window.location=`/content?username=${userdata.username}&token=${userdata.id}`;
    }
  return (
    
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          !! You Have Been Successfull Logout
        </Alert>
      </Snackbar>
      <AppBar style={{backgroundColor:"#555"}} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Button onClick={onclickhome}><i style={{color:"white",fontSize:"30px"}} className="fas fa-home"></i></Button>
          </Typography>
          <Button variant="contained" color="secondary" style={{fontWeight:"700",fontStyle:"bold"}} onClick={onclicklogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
