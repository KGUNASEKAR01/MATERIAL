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
    else if(this.props.userType === "5"){
        
        this.state.requestStatus = 2;
    }

    if(this.state.requestStatus == 5 || this.state.requestStatus == 4 || this.state.requestStatus == 7){
        this.state.requestCode = 9;
    }
    dispatch(listigDetails(this.state));
  }
  componentWillReceiveProps(nextProps){

  }
  redirectView = (requestId, requestStatus, type) =>{
      console.log(type, requestStatus, this.state.requestStatus);
      
    //   console.log("requestId",requestId);
      if(requestStatus === "2"){
        //  this.props.history.push('/MatRequest?id='+requestId);
         this.props.history.push(
              {
                pathname: '/MatRequest/'+requestId
                
            });
      }
      else if(requestStatus === "3" && this.state.requestStatus == "3" && (this.props.userType == 1 || this.props.userType == 3)){
          this.props.history.push(
              {
                pathname: '/GenerateDO/'+requestId
                
            });
      }
      else if(requestStatus === "4" && this.state.requestStatus == "4" && type == 1 && (this.props.userType == 1 || this.props.userType == 4)){
          this.props.history.push(
              {
                pathname: '/View/'+requestId
                
            });
      }
      else if((requestStatus === "5" || requestStatus === "8") && (this.props.userType == 1 || this.props.userType == 3)){
          this.props.history.push(
              {
                pathname: '/collection/'+requestId+"/0"
                
            });
      }
      else if(requestStatus === "4" && this.state.requestStatus == "4" && type == 2 && (this.props.userType == 1 || this.props.userType == 4)){
          this.props.history.push(
              {
                pathname: '/DoView/'+requestId+"/0"
                
            });
      }
      
    //   else if(requestStatus === "4" && this.props.userType == "1"){
    //       this.props.history.push(
    //           {
    //             pathname: '/GenerateDO/'+requestId
                
    //         });
    //   }
    //     else if(requestStatus === "4" && this.props.userType == "4"){
    //       this.props.history.push(
    //           {
    //             pathname: '/DriverView/'+requestId
                
    //         });
    //   }
      else{
         
          this.props.history.push('/View/'+requestId);
      }    
  }
  redirectViewDO = (requestId, doId, requestStatus)=>{
     
        if(requestStatus == 5 || requestStatus == 7){
            this.props.history.push('/collection/'+requestId+"/"+doId);
        }else if(requestStatus == 4 && (this.props.userType == 1 || this.props.userType == 3)){
            this.props.history.push('/DOView/'+requestId+"/"+doId);
        }
        else{
            this.props.history.push('/DriverView/'+requestId+"/"+doId);
        }
  }
  renderDO = (RequestId, obj) =>{
    
        let renderDONumber = [];
        for (var key in obj) {
            // console.log("do=", key);
           renderDONumber.push(<a key={key} id={key} href="javascript:void(0);" onClick={(e)=>this.redirectViewDO(RequestId, e.target.id, obj[key].requestStatus)}>{obj[key].id}</a>);
        }
        return renderDONumber;
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
        let rawRequestType = requestDetails.request.rawRequestType;
        // console.log("dt", requestStatus);
        let renderDONumber = this.renderDO(RequestId, requestDetails.request.reqID);

        return (
            <div className="row Listing1 hrline" key={index}>
                        <ul className="Listing">
                            
                            <li className="paddingbottom10"><strong>Notification Number:</strong> <span id="lblNotoficationNo"><a href="javascript:void(0);" onClick={()=>this.redirectView(RequestId, requestStatus, rawRequestType)}>{requestDetails.request.formattedReqID}</a></span></li>
                            
                            {(renderDONumber != "" && rawRequestType ==1) &&
                            <li className="paddingbottom10"><strong>DO Number:</strong> <span id="lblNotoficationNo">{renderDONumber}</span></li>
                            }
                            
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
    if(this.state.requestStatus == 5 || this.state.requestStatus == 4 || this.state.requestStatus == 7 || this.state.requestStatus == 8){
        this.state.requestCode = 9;
    }
    else{
         this.state.requestCode = 2;
    }
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
                             {userType === "5" &&
                            <select id="cboProjects" className="ComboBox" placeholder="Search By Status" onChange={this.handleRequestType}>
                                 <option value="2">Draft</option>
                                <option value="1">Submit for Approval</option>
                                <option value="5">Collection</option>
                                <option value="7">Collection Completed</option>
                                <option value="10">Transfer</option>
                                <option value="8">Return</option>
                            </select>

                            }
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
                                <option value="5">Collection</option>
                                <option value="6">Rejected</option>
                                 <option value="7">Collection Completed</option>
                                 <option value="10">Transfer</option>
                                <option value="8">Return</option>
                                <option value="9">Closed</option>
                            </select>
                            }
                            
                        </li>
                    </ul>

                </div>
                <div className="col-xs-4 pull-right">
                    <ul className="WorkOrderForm">
                        <li>
                             {(userType === "1" || userType === "5") && 
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
