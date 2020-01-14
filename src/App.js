import React from 'react';
import Navbar from './components/navbar.component'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import './App.css';
import Bugs from './components/bug.component'
import user from './components/user.component'
import edit from './components/editbug.component'
import createbugs from './components/createbugs.component'
function App() {
  return (
    <Router>
    <div className="container">
  <Navbar/>
  <br/>
  <Switch>
    <Route path="/" exact component={user} />
  <Route path="/:username" exact component={Bugs} />
  <Route path="/:username/:id" exact component={edit} />
  <Route path="/createbug/new/:username" exact component={createbugs}/>
  </Switch>
  </div>
  </Router>
  );
}

export default App;
