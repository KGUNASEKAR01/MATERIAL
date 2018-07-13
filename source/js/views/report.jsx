import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reportPost, requestDetails } from 'actions/request.actions';

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

    console.log("nextProps",nextProps);
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
        dispatch(reportPost(this.state));
  }
  render() {
    const {
        reportData, userType, requestDet
    } = this.props;
    let {subCategory} = this.state;
console.log("reportPost", reportData, requestDet, this.props);

const data = [];
if(reportData){
 data.push(reportData);

}

  const columns = [ 
  {
    Header: 'In Stock',
    accessor: 'storeBalance',
    headerClassName:"gridcolHeader"
   
  },
  {
    Header: 'In',
    accessor: 'storeIn',
    headerClassName:"gridcolHeader"
   
  },
  {
    Header: 'Out',
    accessor: 'storeOut',
    headerClassName:"gridcolHeader"
   
  },
  {
    Header: 'Balance',
    accessor: 'currentBalance',
    headerClassName:"gridcolHeader"
   
  }
  ]
    return (
      <div>
        
        <div className="row">
                <div className="col-xs-8">
                
                    <ul className="WorkOrderForm">
                    <li><strong>Report Type</strong></li>
                        <li>
                            
                            {userType === "1" && 
                              <select id="reportType" name="reportType" className="ComboBox" placeholder="Search By Status" onChange={this.handleRequestType}>
                               <option value="1">Category</option>
                                <option value="2">Project</option>
                               
                            </select>
                            }
                            
                        </li>
                        {this.state.reportType == 1 && requestDet &&
                        <div>
                <li><strong>Material Name</strong></li>
               
                    <li>
                        
                         <select name="materialName" value={this.state.materialName} className="ComboBox" onChange={this.setSubCategory}>
                              <option value="">Select</option>
                            {this.setDDOptions(requestDet["category"], "categoryId", "categoryName")}
                         </select>
                        
                        
                    </li>
                        

                    <li><strong> Category </strong></li>
                    <li id="materialCategoryListContainer">
                        <select name="subCategorySel" value={this.state.subCategorySel} className="ComboBox" onChange={this.onSubCatChange}>
                             <option value="">Select</option>
                            {this.setDDOptions(subCategory, "subCategoryId", "subCategoryName")}
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
                defaultPageSize={1}
            />
          }
            </div>
      </div>
      
    );
  }
}
