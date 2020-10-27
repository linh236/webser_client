import React, {Suspense} from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Led from './components/Led';
import Login from './components/Login';
import Logout from './components/Logout';
import Setting from './components/Setting';
import Service from './components/Service';
import Feedback from './components/Feedback';
function App() {
  return (
    <Router>
     <Suspense fallback={<div>Loading...</div>}>
       <Switch>
         <Route exact path="/" component={Login}/>
         <Route path="/home" component={Home}/>
         <Route path="/led" component={Led}/>
         <Route path="/login" component={Login}/>
         <Route path="/logout" component={Logout}/>
         <Route path="/setting" component={Setting}/>
         <Route path="/service" component={Service}/>
         <Route path="/feedback" component={Feedback}/>
       </Switch>
     </Suspense>
   </Router>
  )
}

export default App;
