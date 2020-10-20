import React, {Suspense} from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home';
import Led from './components/Led';
function App() {
  return (
    <Router>
     <Suspense fallback={<div>Loading...</div>}>
       <Switch>
         <Route exact path="/" component={Home}/>
         <Route path="/home" component={Home}/>
         <Route path="/led" component={Led}/>
       </Switch>
     </Suspense>
   </Router>
  )
}

export default App;
