import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { listigDetails } from 'actions/request.actions';


@connect(state => ({
  listingDetails: state.request.get('listingDetails'),
}))
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
    const { dispatch } = this.props;
    dispatch(listigDetails(this.state));
  }
  componentWillReceiveProps(nextProps){

  }

  Listings = (listings) =>{
    let response = "";
    if(listings && listings.length > 0){
        response = listings.map((data, index) =>{
            let requestId="REQ"+data.requestId;
            let requestTypes = Array();
            requestTypes[1] = "Request";
            requestTypes[2] = "Return";
            requestTypes[3] = "Transfer";
            let projects = Array();
            projects[3] = "project1";
            projects[4] = "project2";

        return (
            <div className="row Listing1 hrline" key={index}>
                        <ul className="Listing">
                            <li className="paddingbottom10"><strong>Notification Number:</strong> <span id="lblNotoficationNo"><a href= {`/View/${requestId}`}>{requestId}</a></span></li>
                            <li className="paddingbottom10"><strong>Notification Type:</strong> <span id="lblNotoficationType">{requestTypes[data.notificationType]}</span></li>
                            <li className="paddingbottom10"><strong>Project Name:</strong> <span id="lblProjectName">{projects[data.projectIdFrom]}</span></li>
                            <li className="paddingbottom10"><strong>Supervisor</strong> <span id="lblSupervisor">admin</span></li>
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
    dispatch(listigDetails(this.state));
  }
  addRequest = ()=>{
    this.props.history.push('/MatRequest');
  }
  render() {
    const {
      listingDetails,
    } = this.props;

    return (
      <div>
        
        <div className="row">
                <div className="col-xs-8">
                    <ul className="WorkOrderForm">
                        <li>
                            <select id="cboProjects" className="ComboBox" PlaceHolder="Search By Status" onChange={this.handleRequestType}>
                                <option value="2">Draft</option>
                                <option value="1">Submit for Approval</option>
                                <option value="3">Approved</option>
                                <option value="4">Delivered</option>
                                <option value="5">Request</option>
                            </select>
                        </li>
                    </ul>

                </div>
                <div className="col-xs-4 pull-right">
                    <ul className="WorkOrderForm">
                        <li>
                            <button type="button" id="Add" className="btn btn-default right" onClick={this.addRequest}>
                                <span className="glyphicon glyphicon-plus"></span> Add
                            </button>
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
