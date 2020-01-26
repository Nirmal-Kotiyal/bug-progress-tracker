import React from 'react';
// import Navbar from './components/navbar.component'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import './App.css';
import Bugs from './components/bug.component'
import user from './components/user.component'
import edit from './components/editbug.component'
import createbugs from './components/createbugs.component'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Navbar from './components/navbar.component'

function App() {
  return (
    <Router>
    <div>
  <Switch>
  <Route path="/" exact component={SignIn}></Route>
      <Route path="/signup"  component={SignUp}></Route>
      <div>
    <Navbar />
     <Route path="/content/" exact component={user}></Route>
  <Route path="/content/:username" exact  component={Bugs} />
  <Route path="/content/:username/:id" exact  component={edit} />
  <Route path="/content/createbug/new/:username" exact  component={createbugs}/>   
  </div>
  </Switch>
  </div>
  </Router>
  );
}

export default App;
