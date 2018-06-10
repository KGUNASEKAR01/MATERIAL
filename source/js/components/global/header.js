import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {DOMAIN_NAME} from "../../config/api-config";
@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);

     let title = this.setTilte();
  console.log("title", title);
    this.state = {            
            pagename:title
    };

  }
  componentWillReceiveProps(){
    let page = window.location.pathname;
    // console.log("listingid", listingid);
    let title = this.setTilte();
  
    
    this.setState({pagename:title});
  }
  setTilte =() =>{
     let page = window.location.pathname;
    // console.log("listingid", listingid);
    let title = "Details";
    console.log("page",page);
    if(page.match(/home/gi)){
      title = "Listing"
    }
    else if(page.match(/\/$/gi)){
      title = "Login"
    }
     else if(page.match(/login/gi)){
      title = "Login"
    }
    else if(page.match(/matrequest/gi)){
      title = "Material Request";
    }
     else if(page.match(/View/gi)){
      title = "Details";
    }
     else if(page.match(/generatedo/gi)){
      title = "Details";
    }
    else if(page.match(/driverview/gi)){
      title = "Details";
    }
    else if(page.match(/Acknowledge/gi)){
      title = "Acknowledegement";
    }
    
    return title;
  }
  
  goBack = () => {    
     this.props.history.push('/Home'); 
  }

  render() {
    let iconurl = DOMAIN_NAME+"/assets/img/icon.png";
    let backButton = DOMAIN_NAME+"/assets/back_24.png";

    return (
     <div className="headerBK">
      <div className="TitleLogin" >
                <img src={iconurl} className="imgFixed" />
                {this.state.pagename.toLowerCase() != "listing" && this.state.pagename.toLowerCase() != "login" &&
                <img src={backButton} onClick={this.goBack} style={{float:"left"}} /> 
                }
                &nbsp;<h3 style={{float:"left"}}>{this.state.pagename}</h3>
        
        </div>

         
        </div>
     
    );
  }
}
