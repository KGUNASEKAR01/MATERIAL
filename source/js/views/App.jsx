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
import Header from "components/global/header";
import ViewDetails from "views/ViewDetails";
import GenerateDO from "views/GenerateDO";
import DriverView from "views/driverView"

class App extends Component {
  componentWillReceiveProps(nextProps){
    
  }
  render() {
    let currentLocation = window.location.pathname;
    
    // console.log("location", this.props, window.location.pathname, currentLocation, this.props.userId);
    return (
     <div className="mobileContainer">
        {currentLocation === "/Login" &&  <Menu />}
         {currentLocation !== "/Login" &&  <Header />}

        <div className='Page'>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/Home" component={ Home } />
            <Route path={ routeCodes.PEOPLE } component={ Login } />
            <Route path="/View/:id" component={ ViewDetails } />            
            <Route path="/GenerateDO/:id" component={ GenerateDO } />
            <Route path="/DriverView/:id" component={ DriverView } />
            <Route path="/Login" component={ Login } />
            <Route path="/MatRequest/:id" component={MatRequest} />
            <Route path='*' component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
