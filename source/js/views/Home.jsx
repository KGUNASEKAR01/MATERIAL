import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { listigDetails, requestDetails } from 'actions/request.actions';
import {getDetailsWithLib, validateLoggedUser} from "config/utility";
import baseHOC from "./baseHoc";

@connect(state => ({
  listingDetails: state.request.get('listingDetails'),
  requestDet: state.request.get('requestDet'),
}))
@baseHOC
export default class Home extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
        requestCode:2,
        requestStatus:2
    };
    }
  componentDidMount(){
    const { dispatch, requestDet } = this.props;

    
    if(!requestDet){
     dispatch(requestDetails());
    }
    if(this.props.userType === "3"){
        this.state.requestStatus = 3;
    }
    else if(this.props.userType === "4"){
        this.state.requestStatus = 4;
    }
    dispatch(listigDetails(this.state));
  }
  componentWillReceiveProps(nextProps){

  }
  redirectView = (requestId, requestStatus) =>{
    //   console.log("requestId",requestId);
      if(requestStatus === "2"){
        //  this.props.history.push('/MatRequest?id='+requestId);
         this.props.history.push(
              {
                pathname: '/MatRequest/'+requestId
                
            });
      }
      else if(requestStatus === "3"){
          this.props.history.push(
              {
                pathname: '/GenerateDO/'+requestId
                
            });
      }
        else if(requestStatus === "4"){
          this.props.history.push(
              {
                pathname: '/DriverView/'+requestId
                
            });
      }
      else{
         
          this.props.history.push('/View/'+requestId);
      }    
  }

  Listings = (listings) =>{
    let {requestDet} = this.props;
    let response = "";
    let requestDetails = {};

    if(listings && requestDet && listings.length > 0){
        response = listings.map((data, index) =>{
        let rawListingsDet = {request : data};
        
        requestDetails = getDetailsWithLib(rawListingsDet, requestDet);
        let RequestId = requestDetails.request.requestId;
        let requestStatus = requestDetails.request.requestStatus;
        // console.log("dt", rawListingsDet, )
        return (
            <div className="row Listing1 hrline" key={index}>
                        <ul className="Listing">
                            <li className="paddingbottom10"><strong>Notification Number:</strong> 
                            
                            <span id="lblNotoficationNo"><a href="javascript:void(0);" onClick={()=>this.redirectView(RequestId, requestStatus)}>{RequestId}</a></span></li>
                             <li className="paddingbottom10"><strong>Notification Type:</strong> <span id="lblNotoficationType">{requestDetails.request.requestType}</span></li>
                            <li className="paddingbottom10"><strong>Project Name:</strong> <span id="lblProjectName">{requestDetails.request.projectIdFrom}</span></li>
                            <li className="paddingbottom10"><strong>Supervisor:</strong> <span id="lblSupervisor">{requestDetails.request.createdBy}</span></li>

                            
                        </ul>
                    </div>
            );
        });
    }
    else{
        response = (<div style={{"color":"red", "width":"80%", "textAlign":"center", "textWeight":"bold", "paddingTop":"100px"}}>No Listings Found</div>)
    }
    return response;
  }

  handleRequestType = (e) => {
    const { dispatch } = this.props;
    let requestStatus = e.target.value;
    console.log("requestStatus",requestStatus);
    this.state.requestStatus = requestStatus;
    dispatch(listigDetails(this.state));
  }
  addRequest = ()=>{
    this.props.history.push('/MatRequest/0');
  }
  render() {
    const {
      listingDetails, userType
    } = this.props;
console.log("usertype", userType);
    return (
      <div>
        
        <div className="row">
                <div className="col-xs-8">
                    <ul className="WorkOrderForm">
                        <li>
                             {userType === "4" &&
                            <select id="cboProjects" className="ComboBox" placeholder="Search By Status" onChange={this.handleRequestType}>
                                
                                <option value="4">Delivery</option>
                                <option value="5">Collection</option>
                            </select>

                            }
                            {userType === "3" &&
                            <select id="cboProjects" className="ComboBox" placeholder="Search By Status" onChange={this.handleRequestType}>
                                <option value="3">Approved</option>
                                <option value="4">Delivered</option>
                                <option value="5">Collection</option>
                            </select>

                            }
                            {userType === "1" && 
                              <select id="cboProjects" className="ComboBox" placeholder="Search By Status" onChange={this.handleRequestType}>
                                <option value="2">Draft</option>
                                <option value="1">Submit for Approval</option>
                                <option value="3">Approved</option>
                                <option value="4">Delivered</option>
                                <option value="6">Rejected</option>
                            </select>
                            }
                            
                        </li>
                    </ul>

                </div>
                <div className="col-xs-4 pull-right">
                    <ul className="WorkOrderForm">
                        <li>
                             {userType === "1" && 
                                <button type="button" id="Add" className="btn btn-default right" onClick={this.addRequest}>
                                    <span className="glyphicon glyphicon-plus"></span> Add
                                </button>
                             }
                        </li>
                    </ul>

                </div>
            </div>

            <div className="padding15" id="divRequestListing">

                {listingDetails && 
                this.Listings(listingDetails)
                }
            </div>
      </div>
      
    );
  }
}
