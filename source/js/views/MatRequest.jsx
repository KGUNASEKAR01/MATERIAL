
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {DropdownButton, MenuItem} from "react-bootstrap"
import { requestDetails, requestPost } from 'actions/request.actions';


@connect(state => ({
  error: state.request.get('error'),
  loading: state.request.get('loading'),
  requestDet: state.request.get('requestDet'),
  requestPost: state.request.get('requestPost'),
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
  }
  componentWillReceiveProps(nextProps){
    let {requestPost} = nextProps;
    console.log("requestPost", requestPost);
        
        if(requestPost && requestPost.responsecode === 1){         
            this.props.history.push('/Home');
             
        }
        else if(requestPost && requestPost.responsecode === 0){
          this.setState({errorMessage : "Something Wrong! Please try again."});
        }
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
              return (<option value={value[keyName]}>{value[valueName]}</option>);
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
    const {requestDet} = this.props;
    let {subCategory, rdoRequestType} = this.state;
    console.log("rdoRequestType==", rdoRequestType);
    return (
            <div className="Content">         
                <div style={{color:'red',textAlign:'center',fontSize:'14px', paddingBottom:"5px",}}><strong>{this.state.errorMessage}</strong></div>      
                <ul className="WorkOrderForm">
                    <li><strong>Notification Type</strong></li>
                    <li>
                        <label className="Check"><input ref="requestType" type="radio" id="rdoRequest" name="rdoRequestType" value="1"  onChange={this.onFormChange} /> Request</label>&nbsp;&nbsp;
                        
                        <label className="Check"><input ref="requestType" type="radio" id="rdoReturn" name="rdoRequestType" value="2" onChange={this.onFormChange} /> Return</label>&nbsp;&nbsp;
                        <label className="Check"><input ref="requestType" type="radio" id="rdoTransfer" name="rdoRequestType" value="3" onChange={this.onFormChange} /> Transfer</label>
                    </li>

                    <li><strong>From Project</strong></li>
                    <li>
                        
                        {requestDet &&
                         <select name="cboProjectsFrom" className="ComboBox" onChange={this.onFormChange}>
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
                         <select name="cboProjectsTo" className="ComboBox" onChange={this.onFormChange}>
                             <option value="">Select</option>
                            {this.setDDOptions(requestDet["projects"], "projectId", "projectName")}
                         </select>
                        }
                    </li>
                    
                    <li className="transfer"><strong>Notification No </strong></li>
                    <li className="transfer">
                        <input type="text" name="notificationNo" className="ComboBox" onChange={this.onFormChange} />
                           
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
                         <select name="materialName" className="ComboBox" onChange={this.setSubCategory}>
                              <option value="">Select</option>
                            {this.setDDOptions(requestDet["category"], "categoryId", "categoryName")}
                         </select>
                        }
                        
                    </li>
                    <li><strong> Category </strong></li>
                    <li id="materialCategoryListContainer">
                        <select name="subCategorySel" className="ComboBox" onChange={this.onFormChange}>
                             <option value="">Select</option>
                            {this.setDDOptions(subCategory, "subCategoryId", "subCategoryName")}
                        </select>
                    </li>
                   
         
                    <li><strong>Description</strong></li>
                    <li><input name="description" type="text" className="TextBox" id="txtDescription" placeholder="Description" onChange={this.onFormChange} /></li>
                    <li><strong>Qty</strong></li>
                    <li><input type="number" className="TextBox" name="txtQty" placeholder="Qty" onChange={this.onFormChange} /></li>
                    {rdoRequestType === "2" &&
                    <div>
                    <li className="return"><strong>Approx. </strong></li>
                    
                    <li className="return">
                        <label className="Check"><input type="radio" id="rdoYes" name="rdoApprox" value="Yes" onChange={this.onFormChange} />Yes</label>
                        <label className="Check"><input type="radio" id="rdoNo" name="rdoApprox" value="No" onChange={this.onFormChange} />No</label>
                        
                    </li>
                    </div>
                    }
                </ul>
             {rdoRequestType === "2" &&
                <ul className="WorkOrderForm" id="OtherThanRequest">
                    <li><strong>Driver Name</strong></li>
                    <li>
                        {requestDet &&
                        <select name="driverName" className="ComboBox" onChange={this.onFormChange}>
                            <option value="">Select</option>
                            {this.setDDOptions(requestDet["drivers"], "driverId", "driverName")}
                        </select>
                        }
                    </li>
                    <li><strong>Vechicle No</strong></li>
                    <li>
                        {requestDet &&
                        <select name="vehicleName" className="ComboBox" onChange={this.onFormChange}>
                          <option value="">Select</option>
                            {this.setDDOptions(requestDet["vehicles"], "vehicleId", "vehicleNumber")}
                        </select>
                        }
                    </li>
             
                    
                </ul>
                }
                <ul className="WorkOrderForm">
                    <li><strong>Remarks</strong></li>
                    <li><textarea name="txtRemarks" className="TextBox" placeholder="Remarks" onChange={this.onFormChange}></textarea></li>
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
