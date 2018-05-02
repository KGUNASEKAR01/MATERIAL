import React, { Component } from 'react';


export default class Header extends Component {
addRequest = ()=>{
  this.props.history.push('/MatRequest');
}

  render() {
    return (
     <div className="headerBK">
      <div className="TitleLogin">
                <img src="assets/img/icon.png" className="imgFixed" /><h3> Request</h3>
        
        </div>

         
        </div>
     
    );
  }
}
