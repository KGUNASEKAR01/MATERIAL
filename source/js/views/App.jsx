import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Menu from 'components/global/Menu';
import Home from 'views/Home';
import People from 'views/People';
import NotFound from 'views/NotFound';
import Login from "views/Login";
import MatRequest from "views/MatRequest";


class App extends Component {
  render() {
    return (
     <div className="mobileContainer">
        
        <Menu />

        <div className='Page'>
          <Switch>
            <Route exact path="/Home" component={ Home } />
            <Route path={ routeCodes.PEOPLE } component={ People } />
            
            <Route path="/Login" component={ Login } />
            <Route path="/MatRequest" component={MatRequest} />
            <Route path='*' component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
