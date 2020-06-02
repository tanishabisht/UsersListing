import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import {RouteWithLayout} from './RouteWithLayout';

import Signin from './Pages/Signin'
import Signup from './Pages/Signup';
import Userslisting from './Pages/Userslisting';
import Editdetail from './Pages/Editdetail';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename='/'>
        <div className="App">

          <Switch>
            <Route path='/signin' exact component={Signin} />
            <Redirect from='/' to='/signin' exact/>            
            <Route path='/signup' exact component={Signup} />
            <Route path='/editdetail/:id' exact component={Editdetail}/>
            <Route path='/userslisting' exact component={Userslisting} />
          </Switch>
          
        </div>      
      </BrowserRouter>
      
    );
  }
}

export default App;
