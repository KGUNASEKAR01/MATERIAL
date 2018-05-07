
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {DropdownButton, MenuItem} from "react-bootstrap"
import { requestDetails, requestPost, viewDetails } from 'actions/request.actions';
import {getListingId} from "config/utility";

@connect(state => ({
  error: state.request.get('error'),
  loading: state.request.get('loading'),
  requestDet: state.request.get('requestDet'),
  requestPost: state.request.get('requestPost'),
  viewDetails: state.request.get('viewDetails'),
}))
export default class MatRequest extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
        subCategory:[],
        requestCode:1
    };
    }
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(requestDetails());
    let listingid = getListingId(this.props.match.params.id);
    if(!isNaN(listingid) && listingid !== "0"){
        this.state = {
            requestCode:3,
            requestStatus:2,
            listingId:listingid,
        } 
      dispatch(viewDetails(this.state));
    }
    
  }
  componentWillReceiveProps(nextProps){
    let {requestPost, viewDetails, requestDet} = nextProps;
    
        console.log("requestPost", requestPost);
        if(requestPost && requestPost.responsecode === 1){         
            // this.props.history.push('/Home');
             
        }
        else if(requestPost && requestPost.responsecode === 0){
          this.setState({errorMessage : "Something Wrong! Please try again."});
        }
        if(!requestPost && viewDetails && viewDetails.request && viewDetails.matRequests[0]){
            // this.setSubCategory({target:{value:viewDetails.matRequests[0].categoryId}});
            let listingid = getListingId(this.props.match.params.id);
            this.setState({
                    requestType: viewDetails.request.notificationType,
                    cboProjectsFrom: viewDetails.request.projectIdFrom,
                    cboProjectsTo: viewDetails.request.projectIdTo,
                    notificationNo: viewDetails.request.notificationNumber,
                    materialName: viewDetails.matRequests[0].categoryId,
                    subCategorySel: viewDetails.matRequests[0].subCategoryId,
                    description: viewDetails.request.description,
                    txtQty: viewDetails.matRequests[0].quantityRequested,
                    driverName: viewDetails.request.driverId,
                    vehicleName: viewDetails.request.vehicleId,
                    txtRemarks: viewDetails.request.remarks,
                    requestCode:5,
                     listingId:listingid
            });
        }
        else{
            this.setState({
                    requestType: "",
                    cboProjectsFrom: "",
                    cboProjectsTo: "",
                    notificationNo: "",
                    materialName: "",
                    subCategorySel: "",
                    description: "",
                    txtQty: "",
                    driverName: "",
                    vehicleName: "",
                    requestCode:3,
                    requestStatus:2,
                    listingid:""
            });
        }
        console.log("requestPost", viewDetails);
  }

  handleTestButtonClick = () => {
    const { dispatch } = this.props;

    dispatch(increment());
  }
  onFormChange = (e) =>{
      
      if(e){
        //   console.log("e", e, e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
      }
  }
  setDDOptions = (options, keyName, valueName) =>{
        return options.map((value)=>{
              return (<option key={value[keyName]} value={value[keyName]}>{value[valueName]}</option>);
        });
  }
  setSubCategory = (e)=>{
    const {requestDet} = this.props;
    let catId = e.target.value;
    let subCategory = [];
    if(catId){
        
        requestDet["subCategory"].map((value)=>{
            if(catId === value["categoryId"])
                subCategory.push(value);
        });
        
    }
    this.onFormChange(e);

    this.setState({subCategory});

  }
  submitForm = () =>{
    //   console.log("data", this.state);
      const { dispatch } = this.props;
    this.state.requestStatus = 1;
    dispatch(requestPost(this.state));
  }
  submitDraft = () =>{
      const { dispatch } = this.props;
    this.state.requestStatus = 2;
    dispatch(requestPost(this.state));
  }

  render() {
    const {requestDet, viewDetails} = this.props;
    let {subCategory, rdoRequestType} = this.state;
   
    return (
            <div className="Content">         
                <div style={{color:'red',textAlign:'center',fontSize:'14px', paddingBottom:"5px",}}><strong>{this.state.errorMessage}</strong></div>      
                <ul className="WorkOrderForm">
                    <li><strong>Notification Type</strong></li>
                    <li>
                        <label className="Check"><input ref="requestType" type="radio"  name="rdoRequestType" value="1"  onChange={this.onFormChange} checked={this.state.requestType === "1"} /> Request</label>&nbsp;&nbsp;
                        
                        <label className="Check"><input ref="requestType" type="radio"  name="rdoRequestType" value="2" onChange={this.onFormChange} checked={this.state.requestType === "2"} /> Return</label>&nbsp;&nbsp;
                        <label className="Check"><input ref="requestType" type="radio"  name="rdoRequestType" value="3" onChange={this.onFormChange} checked={this.state.requestType === "3"} /> Transfer</label>
                    </li>

                    <li><strong>From Project</strong></li>
                    <li>
                        
                        {requestDet &&
                         <select name="cboProjectsFrom" value={this.state.cboProjectsFrom} className="ComboBox" onChange={this.onFormChange}>
                              <option value="">Select</option>
                            {this.setDDOptions(requestDet["projects"], "projectId", "projectName")}
                         </select>
                        }
                    </li>
                    {rdoRequestType === "3" &&
                    <div>
                    <li className="transfer"><strong>To Project </strong></li>
                    <li className="transfer">
                       {requestDet &&
                         <select name="cboProjectsTo" value={this.state.cboProjectsTo} className="ComboBox" onChange={this.onFormChange}>
                             <option value="">Select</option>
                            {this.setDDOptions(requestDet["projects"], "projectId", "projectName")}
                         </select>
                        }
                    </li>
                    
                    <li className="transfer"><strong>Notification No </strong></li>
                    <li className="transfer">
                        <input type="text" value={this.state.notificationNo} name="notificationNo" className="ComboBox" onChange={this.onFormChange} />
                           
                    </li>
                    </div>
                    }
                    <li id="transPrjLabel" style={{display:"none"}}><strong>Transfer Project</strong></li>
                    <li id="transPrjCombo" style={{display:"none"}}><select id="cboTransferProjects" className="ComboBox"></select></li>
                    <li className="pull-right">
                        <button type="button" id="Add" className="btn btn-default btn-sm right">
                            <span className="glyphicon glyphicon-plus right"></span>
                        </button>
                    </li>
                    <li><strong>Material Name</strong></li>
                    <li>
                         {requestDet &&
                         <select name="materialName"  className="ComboBox" onChange={this.setSubCategory}>
                              <option value="">Select</option>
                            {this.setDDOptions(requestDet["category"], "categoryId", "categoryName")}
                         </select>
                        }
                        
                    </li>
                    <li><strong> Category </strong></li>
                    <li id="materialCategoryListContainer">
                        <select name="subCategorySel"  className="ComboBox" onChange={this.onFormChange}>
                             <option value="">Select</option>
                            {this.setDDOptions(subCategory, "subCategoryId", "subCategoryName")}
                        </select>
                    </li>
                   
         
                    <li><strong>Description</strong></li>
                    <li><input name="description" value={this.state.description} type="text" className="TextBox" id="txtDescription" placeholder="Description" onChange={this.onFormChange} /></li>
                    <li><strong>Qty</strong></li>
                    <li><input type="number" value={this.state.txtQty} className="TextBox" name="txtQty" placeholder="Qty" onChange={this.onFormChange} /></li>
                    {rdoRequestType === "2" &&
                    <div>
                    <li className="return"><strong>Approx. </strong></li>
                    
                    <li className="return">
                        <label className="Check"><input type="radio" id="rdoYes" name="rdoApprox" value="1" onChange={this.onFormChange} checked={ (this.state.rdoApprox) === "1"? 'checked' : ""} />Yes</label>
                        <label className="Check"><input type="radio" id="rdoNo" name="rdoApprox" value="0" onChange={this.onFormChange}  checked={ (this.state.rdoApprox) === "0"? 'checked' : ""}/>No</label>
                        
                    </li>
                    </div>
                    }
                </ul>
             {rdoRequestType === "2" &&
                <ul className="WorkOrderForm" id="OtherThanRequest">
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
                }
                <ul className="WorkOrderForm">
                    <li><strong>Remarks</strong></li>
                    <li><textarea name="txtRemarks" value={this.state.txtRemarks} className="TextBox" placeholder="Remarks" onChange={this.onFormChange}></textarea></li>
                    </ul>
                   
                    <div className='row'>
                        <div className="col-xs-6">
                          
                            <input type="button" value="Draft" onClick={this.submitDraft} id="btDraft" className="Button btn-block" />
                        </div>

                        <div className="col-xs-6">
                            
                            <input type="button" value="Add" onClick={this.submitForm} id="btPreview" className="Button btn-block" />
                            
                        </div>

                        
                    </div>

            </div>
          

            );
  }
}
