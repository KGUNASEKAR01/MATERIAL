import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {DOMAIN_NAME} from "../../config/api-config";
import Sidebar from 'react-sidebar';
import {Button, Glyphicon, Navbar, Nav, NavItem, MenuItem} from "react-bootstrap";
/*
https://github.com/balloob/react-sidebar
*/
const defaultStyles = {
  root: {
    position: 'absolute',
    top: 26600,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    transition: 'left .3s ease-out, right .3s ease-out',
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0,
  },
};
@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);

     let title = this.setTilte();
  
    this.state = {      
            pagename:title,
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            pullRight: false,
            touchHandleWidth: 20,
            dragToggleDistance: 30,
            panelStyle:defaultStyles
    };

    
    
  }

  componentWillReceiveProps(){
    let page = window.location.pathname;
    // console.log("listingid", listingid);
    let title = this.setTilte();
  
    
    this.setState({pagename:title});
  }
  updateModal(isVisible) {
    	this.state.isVisible = isVisible;
      this.forceUpdate();
    }
  setTilte =() =>{
     let page = window.location.pathname;
    // console.log("listingid", listingid);
    let title = "Details";
    // console.log("page",page);
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
    else if(page.match(/Report/gi)){
      title = "Report";
    }
    else if(page.match(/Search/gi)){
      title = "Notification Search";
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
     this.onSetOpen(false);
  }
  goReport = () => {    
     this.props.history.push('/Report'); 
     this.onSetOpen(false);
  }
  goSearch = () => {    
    this.props.history.push('/Search'); 
    this.onSetOpen(false);
    
 }
 goAlerts = () => {    
  this.props.history.push('/Alerts'); 
  this.onSetOpen(false);
}
  logout = () =>{
    sessionStorage.setItem("userId", "");
    sessionStorage.setItem("userType", "");       
    sessionStorage.setItem("userName", ""); 
    this.onSetOpen(false) ;     
    this.props.history.push('/Login');
  }
   onSetOpen =(open)=> {
    //  console.log("open", open)
    let styles = this.state.panelStyle;
    // console.log("styles=", styles, open);
    if(open === true){
      styles.root={
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      };
      // console.log("styles", styles);
      this.setState({panelStyle:styles});
    }
    else{
      styles.root={
        position: 'absolute',
        top: 26600,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      };
      this.setState({panelStyle:styles});
      // console.log("styles", styles);
    }

    this.setState({open: open});
  }
  menuButtonClick =(ev) => {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }
  sideBarContent = () =>{

    const styles2 = {
        sidebar: {
          width: 256,
          height: '100%',
        },
        sidebarLink: {
          display: 'block',
          padding: '16px 0px',
          color: '#757575',
          textDecoration: 'none',
        },
        divider: {
          margin: '8px 0',
          height: 1,
          backgroundColor: '#757575',
        },
        content: {
          padding: '16px',
          height: '100%',
          backgroundColor: 'white',
        },
      };
       let username = sessionStorage.getItem("userName");      
       let userType = sessionStorage.getItem("userType");      
    return(
    <div style={styles2.content}>
        
        <div style={{width:"100%",textAlign:"right",cursor:"pointer"}} onClick={this.menuButtonClick}><Glyphicon glyph="remove"/> </div>
        <div className="menuText">Welcome {username}</div>
        <div style={styles2.divider} />
        <a href="javascript:void(0);" onClick={this.goBack} style={styles2.sidebarLink}><Glyphicon glyph="home"/> Home</a>
        {(userType == 1 || userType == 5 || userType == 3) &&
        <a href="javascript:void(0);" onClick={this.goReport} style={styles2.sidebarLink}><Glyphicon glyph="duplicate"/> Report</a>   
        }     
        {(userType == 1) &&
        <a href="javascript:void(0);" onClick={this.goAlerts} style={styles2.sidebarLink}><Glyphicon glyph="duplicate"/> Mismatch Alerts</a>   
        }     
         <a href="javascript:void(0);" onClick={this.goSearch} style={styles2.sidebarLink}><Glyphicon glyph="duplicate"/> Notification Search</a> 
        <a href="javascript:void(0);" onClick={this.logout} style={styles2.sidebarLink}><Glyphicon glyph="log-out"/> Logout</a>
        <div style={styles2.divider} />
         
       
      </div>);
  }
  

  render() {
    let iconurl = DOMAIN_NAME+"/assets/img/icon.png";
    let backButton = DOMAIN_NAME+"/assets/back_24.png";
    var sidebar = <this.sideBarContent />;
 
    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };
 
    return (
     <div className="headerBK">
       <Sidebar {...sidebarProps} styles={this.state.panelStyle}>
     </Sidebar> 
      <div className="TitleLogin" >
        
                <div>
                <img src={iconurl} className="imgFixed" />
                 &nbsp;<Button style={{float:"left", marginTop: "5px"}} onClick={this.menuButtonClick}>
                  <Glyphicon glyph="align-justify" />
                </Button>
                {this.state.pagename.toLowerCase() != "listing" && this.state.pagename.toLowerCase() != "login" &&
                <img src={backButton} onClick={this.goBack} style={{float:"left", marginTop: "10px"}} />  
                }
                
                &nbsp;<h3 style={{float:"left"}}>{this.state.pagename}</h3>
               </div>
                
        
        </div>
            
           
         
       
        </div>
     
    );
  }
}
