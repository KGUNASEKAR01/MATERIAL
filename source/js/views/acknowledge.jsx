import React, { Component } from 'react';

export default class Acknowledge extends Component {
  constructor(props) {
    super(props);

    

  }
 
  
  
  goBack = () => {    
     this.props.history.push('/Home'); 
  }

  render() {
    return (
     <div>

            <div class=""><br /><br /></div>
            <div class="padding15">
                <div class=" Listing1 padding15">
                    <label id="items" class="">Material Notification Acknowledegement</label>
                    <p>Thanks for submitting the Material Notification.</p>
                    <p>Please log into system to check the status.Thanks.</p>
                    <p>
                        <br /><br />Regards,
                        <br />Management
                    </p>
                </div>

            </div>

            <div class='row'>
                <div class="col-xs-3">
                </div>
                <div class="col-xs-5">
                    
                    <input type="button" value="Back" id="btBack" onClick={this.goBack} class="Button btn-block" />
                </div>
                <div class="col-xs-4">
                </div>

            </div>
    
     </div>
     
    );
  }
}