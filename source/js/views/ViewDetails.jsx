import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewDetails, requestDetails } from 'actions/request.actions';
import {getDetailsWithLib, getListingId} from "config/utility";
import MatRequest from "./MatRequest";
import baseHOC from "./baseHoc";
import { ToastContainer, toast } from 'react-toastify';
@connect(state => ({
  viewDetails: state.request.get('viewDetails'),
   requestDet: state.request.get('requestDet'),
}))
@baseHOC
export default class ViewDetails extends Component {
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
            approveStatus:0
        };

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
        this.setState({requestDetails : viewDetailsUpdated});

  }

  
  renderMaterialRequest = (matRequests, doStatus) =>{

      return matRequests.map((data, index) =>{
            
        return (
             <div className="row Listing1 hrline" key={index}>
                            <ul className="Listing">
                                <li className="paddingbottom10">
                                    <div className=" col-lg-4 col-md-4 col-sm-4 col-xs-4"> <span id="lblCategory">{data.categoryId}</span> </div>
                                    <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-3"> <span id="lblSubCategory">{data.subCategoryId}</span> </div>
                                    <div className=" col-lg-2 col-md-2 col-sm-2 col-xs-2"> <span id="lblQty">{data.quantityRequested}</span> </div>
                                    {(doStatus == 11 || doStatus == 13) &&
                                    <div className=" col-lg-2 col-md-2 col-sm-2 col-xs-2"> <span id="lblQty">{data.quantityAccepted}</span> </div>
                                    }
                                   
                                </li>
                                <li class="paddingbottom10"><div class=" col-lg-12 col-md-12 col-sm-12 col-xs-12"> <span id="lblDescription">{data.description}</span></div></li>
                            </ul>
                        </div>
             
            );
        });


  
}
setApproverComments=(e)=>{
    let comments = e.target.value;
    this.setState({approverComments:comments});

}
setApproverAction=(action)=>{
     const { dispatch } = this.props;
        if(this.state.approverComments !== ""){
            this.setState({commentsError:""});
            this.state.requestCode = 4;
            this.state.approveStatus = action;
            dispatch(viewDetails(this.state));
            this.props.history.push('/Home');    
        }
        else{
           
            toast.error("Comments can't be empty", { autoClose: 3000 });       
        }
}
close = () =>{
    this.props.history.push('/Home'); 
}
   
  render() {
    const {
      requestDetails
    } = this.state;
    
    return (
      <div>
      
      {requestDetails.request &&         
            
           
            <div id="detailsApproval">
 <ToastContainer autoClose={8000} />
                <div className="padding15">
                    <div className="row Listing1">
                        <label id="items" className="">Material Details</label>
                        <ul className="Listing">
                            <li className="paddingbottom10"><strong>Notification Number:</strong> <span id="lblNotoficationNo">{requestDetails.request.reqID}</span></li>
                            <li className="paddingbottom10"><strong>Notification Type:</strong> <span id="lblNotoficationType">{requestDetails.request.requestType}</span></li>
                            <li className="paddingbottom10"><strong>Project Name:</strong> <span id="lblProjectName">{requestDetails.request.projectIdFrom}</span></li>
                            <li className="paddingbottom10"><strong>Supervisor:</strong> <span id="lblSupervisor">{requestDetails.request.createdBy}</span></li>
                            <li className="paddingbottom10"><strong>Created On:</strong> <span id="lblSupervisor">{requestDetails.request.createdOn}</span></li>
                        </ul>
                        <div className="row Listing1 hrline">
                            <ul className="Listing">
                                <li className="paddingbottom10">
                                    <div className=" col-lg-4 col-md-4 col-sm-4 col-xs-4"> <span id="lblCategory"><strong>Category</strong></span> </div>
                                    <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-3"> <span id="lblSubCategory"><strong>Sub Category</strong></span> </div>
                                    <div className=" col-lg-2 col-md-2 col-sm-2 col-xs-2"> <span id="lblQty"><strong>Req. Qty</strong></span> </div>
                                    {(requestDetails.request.doStatus == 11 || requestDetails.request.doStatus == 13) &&
                                    <div className=" col-lg-2 col-md-2 col-sm-2 col-xs-2"> <span id="lblQty"><strong>Acc. Qty</strong></span> </div>
                                    }
                                   
                                </li>
                            </ul>
                        </div>
                        {requestDetails.matRequests && this.renderMaterialRequest(requestDetails.matRequests, requestDetails.request.doStatus) }
                        <div>{requestDetails.request.description}</div>  
                    </div>

                </div>
                {requestDetails.request.cRemarks != "" &&
                <div>
                <div className="row height20"></div>
                <ul className="WorkOrderForm" id="approvalCommCont">
                    <li className="errorMessage">{this.state.commentsError}</li>
                    <li><strong>Remarks</strong></li>
                    <li>{requestDetails.request.cRemarks}</li>
                </ul>
                </div>
                }
                {requestDetails.request.requestStatus === "1" &&
                <div>
                <div className="row height20"></div>
                <ul className="WorkOrderForm" id="approvalCommCont">
                    <li className="errorMessage">{this.state.commentsError}</li>
                    <li><strong>Approver Comments</strong></li>
                    <li><textarea id="txtApproverComments" onChange={this.setApproverComments} className="TextBox" placeholder="Approver Comments"></textarea></li>
                </ul>
                <div className='row'>
                    <div className="col-xs-4">
                        
                        <input type="button" value="Approve" onClick={()=>this.setApproverAction(3)} id="btApprove" className="Button btn-block" />
                    </div>

                    <div className="col-xs-4">
                        
                        <input type="button" value="Reject" onClick={()=>this.setApproverAction(6)} id="btReject" className="Button btn-block" />
                    </div>

                    <div className="col-xs-4">
                        <input type="button" id="btClose" value="Close" onClick={()=>this.setApproverAction(9)} className="Button btn-block" />
                    </div>
                </div>
                </div>
                }
            </div>
      }
            </div>
    
    );
  }
}
