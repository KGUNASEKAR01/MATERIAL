import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reportPost, requestDetails } from 'actions/request.actions';
import {getDetailsWithMatchedKey} from "../config/utility";

// import {getDetailsWithLib, validateLoggedUser} from "config/utility";
import baseHOC from "./baseHoc";
import {Grid, Row, Col} from "react-bootstrap";
import ReactTable from "react-table";


@connect(state => ({

  requestDet: state.request.get('requestDet'),
  reportData: state.request.get('reportData'),
}))
@baseHOC
export default class Report extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
        requestCode:2,
        requestStatus:2,
        reportType:1,
        subCategory:[],
        data:[],
        columns:[],
        subCategorySel: "",
        
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
   
  }
  componentWillReceiveProps(nextProps){
    const {requestDet} = this.props;
    // console.log("nextProps",nextProps);

    if(nextProps.reportData){
      let data = [];
      let columns = [];
      if(this.state.requestCode == "3"){
        nextProps.reportData.map

        for (var key in nextProps.reportData) {
          let categoryName = getDetailsWithMatchedKey(nextProps.reportData[key].categoryId, requestDet["category"], "categoryId", "categoryName");
          let subCategoryName = getDetailsWithMatchedKey(key, requestDet["subCategory"], "subCategoryId", "subCategoryName");
          let price = getDetailsWithMatchedKey(key, requestDet["subCategory"], "subCategoryId", "price");
          let returnedQuantity = (nextProps.reportData[key].returnedQuantity)?nextProps.reportData[key].returnedQuantity:0;
          let balance = (nextProps.reportData[key].requestedQuantity - returnedQuantity) * parseFloat(price);
          
          data.push({
            ...nextProps.reportData[key],
            categoryName,
            subCategoryName,
            price,
            returnedQuantity,
            balance
          });

        
        }

        this.setState({data});
        columns =  [ 
          {
            Header: 'Category',
            accessor: 'categoryName',
            headerClassName:"gridcolHeader"
           
          },
          {
            Header: 'Sub Category',
            accessor: 'subCategoryName',
            headerClassName:"gridcolHeader"
           
          },
          {
            Header: 'Price',
            accessor: 'price',
            headerClassName:"gridcolHeader"
           
          },
          {
            Header: 'Requested Qnty',
            accessor: 'requestedQuantity',
            headerClassName:"gridcolHeader"
           
          },
          {
            Header: 'Returned Qnty',
            accessor: 'returnedQuantity',
            headerClassName:"gridcolHeader"
           
          },
          {
            Header: 'Pending Qnty (* Amount)',
            accessor: 'balance',
            headerClassName:"gridcolHeader"
           
          }
          ];
          this.setState({columns});
      }
      else{
        columns = [ 
          {
            Header: 'Opening Balance',
            accessor: 'storeBalance',
            headerClassName:"gridcolHeader"
           
          },
          {
            Header: 'Stock Out',
            accessor: 'storeOut',
            headerClassName:"gridcolHeader"
           
          },
          {
            Header: 'Stock In',
            accessor: 'storeIn',
            headerClassName:"gridcolHeader"
           
          },
          {
            Header: 'Balance',
            accessor: 'currentBalance',
            headerClassName:"gridcolHeader"
           
          }
          ];
        
        this.setState({data:[nextProps.reportData]});
        this.setState({columns})
      }

    }
  }
  handleRequestType = (e) => {
    const { dispatch } = this.props;
    let requestStatus = e.target.value;
   
    this.setState({reportType:requestStatus});


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
  onFormChange = (e) =>{
      
    if(e){
      //   console.log("e", e, e.target.name, e.target.value);
      this.setState({[e.target.name]: e.target.value});
    }
  }
  onSubCatChange = (e) =>{
    const { dispatch } = this.props;
    this.onFormChange(e);
    this.state.subCategorySel = e.target.value;
    this.state.requestCode = 2;
    dispatch(reportPost(this.state));
  }
  onProjectChange = (e) =>{
    const { dispatch } = this.props;
    this.onFormChange(e);
    this.state.projects = e.target.value;
    this.state.requestCode = 3;
    dispatch(reportPost(this.state));
  }
  render() {
    const {
        reportData, userType, requestDet
    } = this.props;
    let {subCategory, data, columns} = this.state;
    

console.log("data", data, columns, data.length);

  
    return (
      <div>
        
        <div className="row">
                <div className="col-xs-8">
                
                    <ul className="WorkOrderForm">
                    <li><strong>Report Type</strong></li>
                        <li>
                            
                            {userType === "1" && 
                              <select id="reportType" name="reportType" className="ComboBox form-control" placeholder="Search By Status" onChange={this.handleRequestType}>
                               <option value="1">Category</option>
                                <option value="2">Project</option>
                               
                            </select>
                            }
                            
                        </li>
                        {this.state.reportType == 1 && requestDet &&
                        <div>
                <li><strong>Material Name</strong></li>
               
                    <li>
                        
                         <select name="materialName" value={this.state.materialName} className="ComboBox form-control" onChange={this.setSubCategory}>
                              <option value="">Select</option>
                            {this.setDDOptions(requestDet["category"], "categoryId", "categoryName")}
                         </select>
                        
                        
                    </li>
                        

                    <li><strong> Category </strong></li>
                    <li id="materialCategoryListContainer">
                        <select name="subCategorySel" value={this.state.subCategorySel} className="ComboBox form-control" onChange={this.onSubCatChange}>
                             <option value="">Select</option>
                            {this.setDDOptions(subCategory, "subCategoryId", "subCategoryName")}
                        </select>
                    </li> 
                    </div>
                }  

                 {this.state.reportType == 2 && requestDet &&
                 <div>
                  <li><strong> Project </strong></li>
                  <li id="materialCategoryListContainer">
                  <select name="projects" value={this.state.projects} className="ComboBox form-control" onChange={this.onProjectChange}>
                              <option value="">Select</option>
                            {this.setDDOptions(requestDet["projects"], "projectId", "projectName")}
                         </select>
                  </li> 
                </div>
                 }
                    </ul>

                </div>
                
            </div>
                    <br />
            <div className="container" id="divRequestListing">
          {data.length > 0 &&
                
            <ReactTable
                data={data}
                columns={columns}
                showPagination={false}
                defaultPageSize={10}
            />
          }
            </div>
      </div>
      
    );
  }
}
