import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewDetails, requestDetails, requestPost } from 'actions/request.actions';
import {getDetailsWithLib, getListingId} from "config/utility";
import MatRequest from "./MatRequest";
import baseHOC from "./baseHoc";

@connect(state => ({
  viewDetails: state.request.get('viewDetails'),
   requestDet: state.request.get('requestDet'),
}))
@baseHOC
export default class DriverView extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);

    let listingid = getListingId(this.props.match.params.id);
    // console.log("listingid", listingid);
    this.state = {
            requestCode:3,
            requestStatus:2,
            listingId:listingid,
            requestDetails:{},
            approverComments:"",
            approveStatus:0,
            multiCategory:[],
            DOId : this.props.match.params.doid,
            userId : this.props.userId
        };
    this.modifiedRow = [];

    }
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(requestDetails());
    dispatch(viewDetails(this.state));

  }
  componentWillReceiveProps(nextProps){

        let {viewDetails, requestDet} =  nextProps;
        let viewDetailsUpdated = {};
        if(viewDetails && requestDet){
            viewDetailsUpdated = getDetailsWithLib(viewDetails, requestDet);
        }
        if(viewDetails){
            // console.log("log",viewDetails);
            this.setState({requestDetails : viewDetailsUpdated});
        }
        
  }

  
  renderMaterialRequest = (matRequests) =>{

      return matRequests.map((data, index) =>{
          this.state[data.categoryUniqueId] = data.quantityRequested;
            
        return (
                          <div className="row Listing1 hrline" key={index}>
                            <ul className="Listing">
                                <li className="paddingbottom10">
                                    <div className=" col-lg-4 col-md-4 col-sm-4 col-xs-4"> <span id="lblCategory">{data.categoryId}</span> </div>
                                    <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-3"> <span id="lblSubCategory">{data.subCategoryId}</span> </div>
                                    <div className=" col-lg-2 col-md-2 col-sm-2 col-xs-2"> <span id="lblQty">{data.quantityRequested}</span> </div>
                                    <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-3">{data.quantityDelivered}</div>
                                </li>
                                <li class="paddingbottom10"><div class=" col-lg-12 col-md-12 col-sm-12 col-xs-12"> <span id="lblDescription">{data.description}</span></div></li>
                            </ul>
                        </div>
            );
        });


  
}

setApproverAction=()=>{
     const { dispatch } = this.props;
   
            
            this.state.requestCode = 7;
            this.state.requestStatus = 5;
            dispatch(requestPost(this.state));
            this.props.history.push('/Home');    
       
}
close = () =>{
    this.props.history.push('/Home'); 
}

 
   onFormChange = (e) =>{
      
      if(e){
        //   console.log("e", e, e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
      }
  }
   
  render() {
    const {
      requestDetails
    } = this.state;
     const {requestDet} = this.props;
    return (
      <div>
      
      {requestDetails.request && 
            
           
            <div id="detailsApproval">

                <div className="padding15">
                    <div className="row Listing1">
                        <label id="items" className="">Delivery Order</label>
                        <ul className="Listing">
                            <li className="paddingbottom10"><strong>DO Number:</strong> <span id="lblNotoficationNo">{requestDetails.request.activeDoNumber}</span></li>
                            <li className="paddingbottom10"><strong>Notification Type:</strong> <span id="lblNotoficationType">{requestDetails.request.requestType}</span></li>
                            <li className="paddingbottom10"><strong>Project Name:</strong> <span id="lblProjectName">{requestDetails.request.projectIdFrom}</span></li>
                            <li className="paddingbottom10"><strong>Supervisor:</strong> <span id="lblSupervisor">{requestDetails.request.createdBy}</span></li>
                        </ul>
                        <div className="row Listing1 hrline">
                            <ul className="Listing">
                                <li className="paddingbottom10">
                                    <div className=" col-lg-4 col-md-4 col-sm-4 col-xs-4"> <span id="lblCategory"><strong>Category</strong></span> </div>
                                    <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-3"> <span id="lblSubCategory"><strong>Sub Category</strong></span> </div>
                                    <div className=" col-lg-2 col-md-2 col-sm-2 col-xs-2"> <span id="lblQty"><strong>Req. Qty</strong></span> </div>
                                    <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-3"><strong>Del. Qty</strong></div>
                                </li>
                            </ul>
                        </div>
                        {requestDetails.matRequests && this.renderMaterialRequest(requestDetails.matRequests) }
                        <div style={{paddingLeft:"20px"}}>{requestDetails.request.description}</div>  
                    </div>

                </div>
                <div className="row height20"></div>
                <ul className="WorkOrderForm" id="DriverInfo" style={{paddingLeft:"20px"}}>
                    <li><strong>Driver Name : </strong>
                   <span id="lblNotoficationNo">{requestDetails.request.driverId}</span>
                        
                    </li>
                    <li><strong>Vechicle No : </strong>
                   <span id="lblNotoficationNo">
                       {requestDetails.request.vehicleId}
                    </span>
                        </li>
                    {requestDetails.request.DORemarks != "" &&
                    <li><strong>Remarks: </strong>
                   <span id="lblNotoficationNo">
                       {requestDetails.request.DORemarks}
                    </span>
                        </li>
                    }

                </ul>
                {(this.props.userType == "4" || this.props.userType == "1") &&
                <ul className="WorkOrderForm" id="approvalCommCont" style={{paddingLeft:"20px"}}>
                    <li><strong>Remarks</strong></li>
                    <li><textarea id="txtComments" name="remarks" onChange={this.onFormChange} className="TextBox" placeholder="Remarks"></textarea></li>
                </ul>
                }
                <div class='row'>
                     {(this.props.userType == "4" || this.props.userType == "1") &&
                    <div className="col-xs-4">
                        
                        <input type="button" value="Submit" onClick={this.setApproverAction} id="btSubmit" className="Button btn-block" />
                    </div>
                     }

                    <div className="col-xs-4">
                    </div>

                    <div className="col-xs-4">
                        <input type="button" id="btBack" value="Back" onClick={this.close} className="Button btn-block" />
                    </div>
                </div>
            </div>
      }



            </div>
    
    );
  }
}
