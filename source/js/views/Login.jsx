import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validateLogin } from 'actions/login.actions';

// import {}

@connect(state => ({
  error: state.login.get('error'),
  loading: state.login.get('loading'),
  userId: state.login.get('userId'),
}))
export default class Login extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
        userName: '',
        password: '',
        errorMessage: ''
    };
    }

componentWillReceiveProps(nextProps){
        // console.log("props", nextProps);
        let {userId} = nextProps;
        
        if(userId && userId.response === "success"){ 
            sessionStorage.setItem("userId", userId.userId);
            sessionStorage.setItem("userType", userId.userType);       
            this.props.history.push('/Home');
             
        }
        else if(userId && userId.response === "fail"){
          this.setState({errorMessage : "Invalid Login! Please try again."});
        }
 }
  handleLogin =()=>{
    const { dispatch } = this.props;
    let {userName, password} = this.state;
    if(userName === "" || password === ""){
        this.setState({errorMessage : "Username and Password can't be empty."});
        return false;
    }

    dispatch(validateLogin(userName, password));
  }
  setUserName = (e) =>{
      let userName = e.target.value;
      this.setState({userName});
  }
  setPassword = (e) =>{
      let password = e.target.value;
      this.setState({password});
  }

  render() {
    const {
      loading,
    } = this.props;
    let {userName, password} = this.state;
    return (
      <div className='Home'>

          <div className="FormContainer">
                <div style={{color:'red',textAlign:'center',fontSize:'14px', paddingBottom:"5px",}}><strong>{this.state.errorMessage}</strong></div>

                    <div style={{marginBottom: "10px"}} className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input type="text" className="form-control" value={userName} onChange={this.setUserName} id="txtUserName" name="txtUserName" placeholder="Username" />
                    </div>
                    <div style={{marginBottom: "10px"}} className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                        <input type="password" className="form-control" value={password} onChange={this.setPassword} id="txtPwd" name="txtPwd" placeholder="Password" />
                    </div>
                   
                    <button className="Button btn-block" id="login" type="submit" onClick={this.handleLogin}>{loading === true ? "Loading ..." : "Login"}</button>
                </div>
       
      </div>
    );
  }
}
