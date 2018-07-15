
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {DropdownButton, MenuItem} from "react-bootstrap"
import { requestDetails, requestPost, viewDetails } from 'actions/request.actions';
import {getDetailsWithLib, getListingId} from "config/utility";
import baseHOC from "./baseHoc";
import { ToastContainer, toast } from 'react-toastify';
// let ToastMessageFactory = React.createFactory(ToastMessage.animation);

@connect(state => ({
  error: state.request.get('error'),
  loading: state.request.get('loading'),
  requestDet: state.request.get('requestDet'),
  requestPost: state.request.get('requestPost'),
  viewDetails: state.request.get('viewDetails'),
}))
@baseHOC
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
        requestCode:1,
        previewEnabled :false,
        multiCategory : [],
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
        userId:props.userId
    };
    
    this.previewData = {request:{},matRequests:{}};
    }
  componentDidMount(){
    const { dispatch, requestDet } = this.props;
    if(!requestDet)
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
    let {listingId} = this.state;
    
        // console.log("requestPost", requestPost);
        // if(requestPost && requestPost.responsecode === 1){         
        //     this.props.history.push('/Home');
             
        // }
        // else if(requestPost && requestPost.responsecode === 0){
        //   this.setState({errorMessage : "Something Wrong! Please try again."});
        // }
        if(listingId !== "0" && viewDetails && viewDetails.request && viewDetails.matRequests[0]){
            // this.setSubCategory({target:{value:viewDetails.matRequests[0].categoryId}});
            // console.log("inside", requestPost);
            let listingid = getListingId(this.props.match.params.id);
            this.setState({
                    requestType: viewDetails.request.notificationType,
                    // requestType : viewDetails.request.notificationType,
                    cboProjectsFrom: viewDetails.request.projectIdFrom,
                    cboProjectsTo: viewDetails.request.projectIdTo,
                    notificationNo: viewDetails.request.notificationNumber,
                    // materialName: viewDetails.matRequests[0].categoryId,
                    // subCategorySel: viewDetails.matRequests[0].subCategoryId,
                    // description: viewDetails.request.description,
                    // txtQty: viewDetails.matRequests[0].quantityRequested,
                    driverName: viewDetails.request.driverId,
                    vehicleName: viewDetails.request.vehicleId,
                    txtRemarks: viewDetails.request.remarks,
                    requestCode:5,
                    listingId:listingid,
                    multiCategory : viewDetails.matRequests
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
                    listingid:"",
                    multiCategory : []
            });
        }
        // console.log("requestPost", viewDetails);
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
      const {listingId} = this.state;
    

    this.state.requestStatus = 1;
    this.state.requestCode = (listingId && listingId !== '0') ? 5 : 1;
    dispatch(requestPost(this.state));
    this.props.history.push('/Acknowledge');
  }
  submitDraft = () =>{
      const { dispatch } = this.props;
      const {listingId} = this.state;
    //   console.log("==",this.state.materialName);
    
       if(this.state.requestType == ""){
       
            toast.error("Notification type can't be empty", { autoClose: 3000 });
            return false;
        }    
        else if(this.state.cboProjectsFrom == "" ){
            
            toast.error("Project name can't be empty", { autoClose: 3000 });
            return false;
        }
        else if(this.state.materialName == "" && this.state.multiCategory.length == 0){
           
            toast.error("Material Name can't be empty", { autoClose: 3000 });
            return false;
        }
        else if(this.state.subCategorySel == "" && this.state.materialName != "" && this.state.materialName != 99999){
           
            toast.error("Category can't be empty", { autoClose: 3000 });
            return false;
        }
        else if(this.state.txtQty == "" && this.state.materialName != ""){
           
            toast.error("Quantity can't be empty", { autoClose: 3000 });            
            return false;
        }
        else if(this.state.materialName === "99999" && this.state.description == ""){
          
            toast.error("Description is required for Others", { autoClose: 3000 });          
           
            return false;
        }

        if(this.state.requestType == 2){
            if(this.state.driverName  == ""){
                toast.error("Driver Name can't be empty", { autoClose: 3000 });         
           
                return false;
            }
            
            if(this.state.vehicleName  == ""){
                toast.error("Vehicle Name can't be empty", { autoClose: 3000 });         
           
                return false;
            }
        }


    this.categoryAddition();
    this.state.requestStatus = 2;
   this.state.requestCode = (listingId && listingId !== '0') ? 5 : 1;
    dispatch(requestPost(this.state));
    this.props.history.push('/Acknowledge');
  }
  search = (key, nameKey)=>{
    for (var i=0; i <  this.state.multiCategory.length; i++) {
            if (this.state.multiCategory[i][key] === nameKey) {
                return this.state.multiCategory[i];
            }
        }
    }
  categoryAddition = () =>{
        const { materialName, subCategorySel, txtQty, description, rdoApprox } = this.state;

        if(this.state.materialName == ""){
           
            toast.error("Material Name can't be empty", { autoClose: 3000 });
            return false;
        }
        else if(this.state.subCategorySel == "" && this.state.materialName != "" && this.state.materialName != 99999){
           
            toast.error("Category can't be empty", { autoClose: 3000 });
            return false;
        }
        else if(this.state.txtQty == "" && this.state.materialName != ""){
           
            toast.error("Quantity can't be empty", { autoClose: 3000 });            
            return false;
        }
        else if(this.state.materialName === "99999" && this.state.description == ""){
          
            toast.error("Description is required for Others", { autoClose: 3000 });          
           
            return false;
        }
        if(this.state.materialName != ""){
        // console.log("===",subCategorySel, materialName, this.search("subCategoryId",subCategorySel));
            if(!this.search("subCategoryId",subCategorySel) || this.state.materialName === "99999"){
                let catSelected =  {
                        categoryId : materialName,
                        subCategoryId : subCategorySel,
                        quantityRequested:txtQty,
                        description: description,   
                         rdoApprox: rdoApprox,          
                    };
                this.state.multiCategory.push(catSelected);
                // console.log("====", this.state.multiCategory);
                toast.success("Material Request added successfully. View them in Preview", { autoClose: 3000 });  
                this.setState({materialName:"", subCategorySel:"", txtQty:"", description:"", rdoApprox: ""});
            }
            else{
                // console.log("prompt");
                toast.error("Category already added", { autoClose: 3000 });  
                return false;
            }
        }
  }
  setPreview = () =>{
    
        if(this.state.requestType == ""){
       
            toast.error("Notification type can't be empty", { autoClose: 3000 });
            return false;
        }    
        else if(this.state.cboProjectsFrom == "" ){
            
            toast.error("Project name type can't be empty", { autoClose: 3000 });
            return false;
        }
        else if(this.state.materialName == "" && this.state.multiCategory.length == 0){
           
            toast.error("Material Name can't be empty", { autoClose: 3000 });
            return false;
        }
        else if(this.state.subCategorySel == "" && this.state.materialName != "" && this.state.materialName != 99999){
           
            toast.error("Category can't be empty", { autoClose: 3000 });
            return false;
        }
        else if(this.state.txtQty == "" && this.state.materialName != ""){
           
            toast.error("Quantity can't be empty", { autoClose: 3000 });            
            return false;
        }
        else if(this.state.materialName === "99999" && this.state.description == ""){
          
            toast.error("Description is required for Others", { autoClose: 3000 });          
           
            return false;
        }

        if(this.state.requestType == 2){
            if(this.state.driverName  == ""){
                toast.error("Driver Name can't be empty", { autoClose: 3000 });         
           
                return false;
            }
            
            if(this.state.vehicleName  == ""){
                toast.error("Vehicle Name can't be empty", { autoClose: 3000 });         
           
                return false;
            }
        }

      this.categoryAddition();
      let data ={
                    notificationType: this.state.requestType,
                    projectIdFrom: this.state.cboProjectsFrom,
                    projectIdTo: this.state.cboProjectsTo,
                    notificationNumber: this.state.notificationNo,                    
                    // description: this.state.description,                   
                    driverId: this.state.driverName,
                    vehicleId: this.state.vehicleName,
                    remarks: this.state.txtRemarks,
                    createdBy:this.props.userId,
                    requestId:"000"
      }

      this.previewData = {request:data, matRequests:this.state.multiCategory};
      this.setState({previewEnabled:true});
  }
  removePreview = () =>{
      this.setState({previewEnabled:false});
  }
  deleteRequest = (obj) =>{
      let filtered = this.state.multiCategory.filter(function(el){
          let uniqueid = el.categoryId+"-"+el.subCategoryId+"-"+el.quantityRequested;
        //   console.log("f", uniqueid);
          return uniqueid !== obj.categoryUniqueId; 
      }); 
    //   console.log("filtered",this.state.multiCategory, obj, filtered);
      this.state.multiCategory=filtered;
      this.setPreview();
  }
renderMaterialRequest = (matRequests) =>{

      return matRequests.map((data, index) =>{
            
        return (
             
             <div className="row Listing1 hrline" key={index} >
                 <ul className="Listing">
                            <li className="paddingbottom10">
                                <div className=" col-lg-10 col-md-10 col-sm-10 col-xs-10"> <span id="lblCategory">{data.categoryId}</span> - {data.subCategoryId != "" &&  <span id="lblSubCategory">{data.subCategoryId} -</span> } <span id="lblQty">{data.quantityRequested}</span></div>
                                <div className=" col-lg-1 col-md-1 col-sm-1 col-xs-1">  <span className="glyphicon glyphicon-remove pointer" onClick={()=>{this.deleteRequest(data)}}></span></div>
                                
                            </li>
                              <li className="paddingbottom10"><div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12"> <span id="lblDescription">{data.description}</span></div></li>
                            </ul>
                        </div>
            );
        });


  
}

  render() {
    const {requestDet, viewDetails} = this.props;
    let {subCategory, requestType, previewEnabled} = this.state;
//    console.log("===",this.previewData);
    let requestDetails = {};
   if(this.previewData.request.notificationType && requestDet){
      requestDetails = getDetailsWithLib(this.previewData, requestDet);
   }
//    console.log("res", this.state);

    return (
            <div className="Content">  
                {previewEnabled === false && 
                <div>
                <div style={{color:'red',textAlign:'center',fontSize:'14px', paddingBottom:"5px",}}>{this.state.errorMsg}</div>      
                <ToastContainer autoClose={8000} />
                <ul className="WorkOrderForm">
                    <li><strong>Notification Type</strong></li>
                    <li>
                        <label className="Check"><input ref="requestType" type="radio"  name="requestType" value="1"  onChange={this.onFormChange} checked={this.state.requestType == "1"} /> Request</label>&nbsp;&nbsp;
                        
                        <label className="Check"><input ref="requestType" type="radio"  name="requestType" value="2" onChange={this.onFormChange} checked={this.state.requestType == "2"} /> Return</label>&nbsp;&nbsp;
                        <label className="Check"><input ref="requestType" type="radio"  name="requestType" value="3" onChange={this.onFormChange} checked={this.state.requestType == "3"} /> Transfer</label>
                    </li>

                    <li><strong>From Project</strong></li>
                    <li>
                        
                        {requestDet &&
                         
                         <select name="cboProjectsFrom" value={this.state.cboProjectsFrom} className="ComboBox form-control" onChange={this.onFormChange}>
                              <option value="">Select</option>
                            {this.setDDOptions(requestDet["projects"], "projectId", "projectName")}
                         </select>
                        
                        }
                    </li>
                    {requestType === "3" &&
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
                       
                        {requestDet &&
                         <select name="notificationNo" value={this.state.notificationNo} className="ComboBox" onChange={this.onFormChange}>
                             <option value="">Select</option>
                            {this.setDDOptions(requestDet["requestDetails"], "requestNo", "requestNo")}
                         </select>
                        }
                           
                    </li>
                    </div>
                    }
                    <li id="transPrjLabel" style={{display:"none"}}><strong>Transfer Project</strong></li>
                    <li id="transPrjCombo" style={{display:"none"}}><select id="cboTransferProjects" className="ComboBox"></select></li>
                    <li className="pull-right">
                        <button type="button" id="Add" onClick={this.categoryAddition} className="btn btn-default btn-sm right">
                            <span className="glyphicon glyphicon-plus right"></span>
                        </button>
                    </li>
                    <li><strong>Material Name</strong></li>
                    <li>
                         {requestDet &&
                         <select name="materialName" value={this.state.materialName} className="ComboBox" onChange={this.setSubCategory}>
                              <option value="">Select</option>
                            {this.setDDOptions(requestDet["category"], "categoryId", "categoryName")}
                         </select>
                        }
                        
                    </li>
                    <li><strong> Category </strong></li>
                    <li id="materialCategoryListContainer">
                        <select name="subCategorySel" value={this.state.subCategorySel} className="ComboBox" onChange={this.onFormChange}>
                             <option value="">Select</option>
                            {this.setDDOptions(subCategory, "subCategoryId", "subCategoryName")}
                        </select>
                    </li>               
         
                    
                    <li><strong>Qty</strong></li>
                    <li><input type="number" value={this.state.txtQty} className="TextBox" name="txtQty" placeholder="Qty" onChange={this.onFormChange} /></li>
                    <li><strong>Description</strong></li>
                    <li><input name="description" value={this.state.description} type="text" className="TextBox" id="txtDescription" placeholder="Description" onChange={this.onFormChange} /></li>
                    {requestType === "2" &&
                    <div>
                    <li className="return"><strong>Approx. </strong></li>
                    
                    <li className="return">
                        <label className="Check"><input type="radio" id="rdoYes" name="rdoApprox" value="1" onChange={this.onFormChange} checked={this.state.rdoApprox == "1"} />Yes</label>
                        <label className="Check"><input type="radio" id="rdoNo" name="rdoApprox" value="0" onChange={this.onFormChange}  checked={this.state.rdoApprox == "0"}/>No</label>
                        
                    </li>
                    </div>
                    }
                </ul>
             {requestType === "2" &&
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
                            
                            <input type="button" value="Preview" onClick={this.setPreview} id="btPreview" className="Button btn-block" />
                            
                        </div>

                        
                    </div>
                    </div>
                }
{previewEnabled === true && 
                    
            <div className="row Listing1">
                    <label id="items" className="">Material Details</label>
                    <ul className="Listing">
                        <li className="paddingbottom10"><strong>Notification Type:</strong> <span id="lblNotoficationType">{requestDetails.request.requestType}</span></li>
                        <li className="paddingbottom10"><strong>Project From:</strong> <span id="lblProjectName">{requestDetails.request.projectIdFrom}</span></li>
                        
                      
                        <li className="paddingbottom10"><strong>Supervisor:</strong> <span id="lblSupervisor">{requestDetails.request.createdBy}</span></li>
                    </ul>
                     {requestDetails.matRequests && this.renderMaterialRequest(requestDetails.matRequests) }
                    <div className="paddingbottom10">&nbsp;</div>
                    <div>{requestDetails.request.description}</div>  
                     <div className="paddingbottom10">&nbsp;</div>
                    
            <div className='row'>
                <div className="col-xs-8">
                    
                    <input type="button" value="Submit" onClick={this.submitForm} id="btSubmitForApproval" className="Button btn-block" />
                </div>

                <div className="col-xs-4">
                    
                    <input type="button" value="Back" id="btBack" onClick={this.removePreview} className="Button btn-block" />
                </div>


            </div>

                </div>
}

            </div>
          

            );
  }
}
