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
export default class GenerateDO extends Component {
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
            doSuccess : false
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
            this.setState({requestDetails : viewDetailsUpdated, multiCategory : viewDetails.matRequests});
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
                                    <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-3"><input type="number" className="width100" name={data.categoryUniqueId} defaultValue={this.state[data.categoryUniqueId]} onChange={(e)=>{this.modifyRequest(data, data.quantityRequested, e)}} max={data.quantityRequested} id="delQty" /></div>
                                </li>
                            </ul>
                        </div>
            );
        });


  
}
setApproverComments=(e)=>{
    let comments = e.target.value;
    this.setState({approverComments:comments});

}
setApproverAction=()=>{
     const { dispatch } = this.props;
      // console.log("state", this.state)
            this.setState({doSuccess:true});
            this.state.requestCode = 6;
            this.state.requestStatus = 4;
            dispatch(requestPost(this.state));
            // this.props.history.push('/Home');    
       
}
close = () =>{
    this.props.history.push('/Home'); 
}
setDDOptions = (options, keyName, valueName) =>{
        return options.map((value)=>{
              return (<option key={value[keyName]} value={value[keyName]}>{value[valueName]}</option>);
        });
  }
  modifyRequest = (categoryId, max, e) =>{

    let value = e.target.value;
    if(value.trim() != ""){
     this.modifiedRow[categoryId] = {[categoryId]:value};
    }
    //  console.log(categoryId, this.modifiedRow);
    if(parseInt(value) <= parseInt(max)){
        // this.state.multiCategory = this.modifiedRow;
        // this.setState({[e.target.name]: value});
    }
    else{
        alert("Value should not be more than "+max);
        // this.state[e.target.name] = max;
        // this.setState({[e.target.name]: max});
    }
    this.onFormChange(e);
  }
   onFormChange = (e) =>{
      
      if(e){
        //   console.log("e", e, e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
      }
  }
   
  render() {
    const {
      requestDetails, doSuccess
    } = this.state;
     const {requestDet} = this.props;
    return (
      <div>
      
      {requestDetails.request && doSuccess === false && 
            
           
            <div id="detailsApproval">

                <div className="padding15">
                    <div className="row Listing1">
                        <label id="items" className="">Generate DO</label>
                        <ul className="Listing">
                            <li className="paddingbottom10"><strong>Notification Number:</strong> <span id="lblNotoficationNo">{requestDetails.request.requestId}</span></li>
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
                    <li><strong>Driver Name</strong></li>
                    <li>
                        {requestDet &&
                        <select name="driverName" value={this.state.driverName} className="ComboBox" onChange={this.onFormChange}>
                            <option value="">Select</option>
                            {this.setDDOptions(requestDet["drivers"], "driverId", "driverName")}
                        </select>
                        }
                    </li>
                    <li><strong>Vechicle No</strong></li>
                    <li>
                       {requestDet &&
                        <select name="vehicleName" value={this.state.vehicleName} className="ComboBox" onChange={this.onFormChange}>
                          <option value="">Select</option>
                            {this.setDDOptions(requestDet["vehicles"], "vehicleId", "vehicleNumber")}
                        </select>
                        }
                    </li>


                </ul>

                <ul className="WorkOrderForm" id="approvalCommCont" style={{paddingLeft:"20px"}}>
                    <li><strong>Remarks</strong></li>
                    <li><textarea id="txtComments" name="remarks" onChange={this.onFormChange} className="TextBox" placeholder="Remarks"></textarea></li>
                </ul>
                <div class='row'>
                    <div className="col-xs-4">
                        
                        <input type="button" value="Submit" onClick={this.setApproverAction} id="btSubmit" className="Button btn-block" />
                    </div>

                    <div className="col-xs-4">
                    </div>

                    <div className="col-xs-4">
                        <input type="button" id="btBack" value="Back" onClick={this.close} className="Button btn-block" />
                    </div>
                </div>
            </div>
      }

{doSuccess === true && 

<div id="DOGenerationAck">
                <div className=""><br /><br /></div>
                <div className="padding15">
                    <div className=" Listing1 padding15">
                        <label id="items" className="">DO Acknowledegement</label>
                        <p>Delivery Order is generated.</p>

                        <p>
                            <br /><br />Regards,
                            <br />Management
                        </p>

                    </div>

                </div>
                <div class='row'>
                    <div className="col-xs-3">
                    </div>
                    <div className="col-xs-5">                        
                        <input type="button" value="Back" onClick={this.close} id="btBack" className="Button btn-block" />
                    </div>
                    <div className="col-xs-4">
                    </div>

                </div>
            </div>
}


            </div>
    
    );
  }
}
