
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestDetails } from 'actions/request.actions';


@connect(state => ({
  error: state.login.get('error'),
  loading: state.login.get('loading'),
  requestDet: state.login.get('requestDet'),
}))
export default class MatRequest extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  componentWillMount(){
    const { dispatch } = this.props;
    console.log("id==");
    dispatch(requestDetails());
  }
  componentWillReceiveProps(nextProps){
    console.log("form", nextProps);
  }

  handleTestButtonClick = () => {
    const { dispatch } = this.props;

    dispatch(increment());
  }
  onProjectChange = () =>{

  }
  

  render() {
    const {
      counter,
    } = this.props;
    console.log("id");
    return (
            <div className="Content">               
                <ul className="WorkOrderForm">
                    <li><strong>Notification Type</strong></li>
                    <li>
                        <label className="Check"><input type="radio" id="rdoRequest" name="rdoRequestType" checked="checked" onChange={this.onProjectChange()} value="REQUEST" />Request</label>
                        
                        <label className="Check"><input type="radio" id="rdoReturn" name="rdoRequestType" value="RETURN" onChange={this.onProjectChange()} />Return</label>
                        <label className="Check"><input type="radio" id="rdoTransfer" name="rdoRequestType" value="TRANSFER" onChange={this.onProjectChange()} />Transfer</label>
                    </li>

                    <li><strong>From Project</strong></li>
                    <li>
                        <select id="cboProjects" className="ComboBox" onChange={this.onProjectChange()}>
                            <option value="1">Project 1</option>
                            <option value="2">Project 2</option>
                        </select>
                    </li>
                    <li className="transfer"><strong>To Project </strong></li>
                    <li className="transfer">
                        <select id="cboProjects" className="ComboBox" onChange={this.onProjectChange()}>
                            <option value="1">Project 1</option>
                            <option value="2">Project 2</option>
                        </select>
                    </li>
                    <li className="transfer"><strong>Notification No </strong></li>
                    <li className="transfer">
                        <select id="cboRequests" className="ComboBox" onChange={this.onProjectChange()}>
                            <option value="1">R0001</option>
                            <option value="2">R0002</option>
                        </select>
                    </li>
                    <li id="transPrjLabel" style={{display:"none"}}><strong>Transfer Project</strong></li>
                    <li id="transPrjCombo" style={{display:"none"}}><select id="cboTransferProjects" className="ComboBox"></select></li>
                    <li className="pull-right">
                        <button type="button" id="Add" className="btn btn-default btn-sm right">
                            <span className="glyphicon glyphicon-plus right"></span>
                        </button>
                    </li>
                    <li><strong>Material Name</strong></li>
                    <li>
                        <select id="cboMaterial" className="ComboBox">
                            <option value="pipe">PIPE</option>
                            <option value="plank">PLANK</option>
                        </select>
                        
                    </li>
                    <li><strong> Category </strong></li>
                    <li id="materialCategoryListContainer">
                        <select id="cboSubMaterial" className="ComboBox">
                            <option value="6MM">6MM </option>
                            <option value="15MM">15MM </option>
                        </select>
                    </li>
                   
         
                    <li><strong>Description</strong></li>
                    <li><input type="text" className="TextBox" id="txtDescription" placeholder="Description" /></li>
                    <li><strong>Qty</strong></li>
                    <li><input type="number" className="TextBox" id="txtQty" placeholder="Qty" /></li>
                    <li className="return"><strong>Approx. </strong></li>
                    <li className="return">
                        <label className="Check"><input type="radio" id="rdoYes" name="rdoApprox" value="Yes" />Yes</label>
                        <label className="Check"><input type="radio" id="rdoNo" name="rdoApprox" value="No" />No</label>
                        
                    </li>
                </ul>

                <ul className="WorkOrderForm" id="OtherThanRequest">
                    <li><strong>Driver Name</strong></li>
                    <li>
                        <select id="cboDriverName" className="ComboBox" onChange={this.onProjectChange()}>
                            <option value=""></option>
                            <option value="Driver1">Driver Name 1</option>
                            <option value="Driver2">Driver Name 2</option>
                        </select>
                    </li>
                    <li><strong>Vechicle No</strong></li>
                    <li>
                        <select id="cboDriverName" className="ComboBox">
                            <option value="SG2345">SG2345</option>
                            <option value="SG44232">SG44232</option>
                        </select>
                    </li>

                    
                </ul>
                <ul className="WorkOrderForm">
                    <li><strong>Remarks</strong></li>
                    <li><textarea id="txtRemarks" className="TextBox" placeholder="Remarks"></textarea></li>
                    </ul>
                   
                    <div className='row'>
                        <div className="col-xs-6">
                          
                            <input type="button" value="Draft" id="btDraft" className="Button btn-block" />
                        </div>

                        <div className="col-xs-6">
                            
                            <input type="button" value="Preview" id="btPreview" className="Button btn-block" />
                            
                        </div>

                        
                    </div>

            </div>
          

            );
  }
}
