
import get from "../api/";
export const REQUESTDET_START = 'REQUESTDET_START';
export const REQUESTDET_ERROR = 'REQUESTDET_ERROR';
export const REQUESTDET_SUCCESS = 'REQUESTDET_SUCCESS';
export const REQUESTPOST_SUCCESS = 'REQUESTPOST_SUCCESS';
export const LISTINGDETAILS_SUCCESS = 'LISTINGDETAILS_SUCCESS';
export const VIEWDETAILS_SUCCESS = 'VIEWDETAILS_SUCCESS';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export function requestDetailsSuccess(loginData) {
  return {
    type: REQUESTDET_SUCCESS,
    data:loginData
  };
}
export function requestPostSuccess(data) {
  return {
    type: REQUESTPOST_SUCCESS,
    data:data
  };
}
export function listingDetailsSuccess(data) {
  return {
    type: LISTINGDETAILS_SUCCESS,
    data:data
  };
}
export function viewDetailsSuccess(data) {
  return {
    type: VIEWDETAILS_SUCCESS,
    data:data
  };
}
export function requestDetailsStart() {
  return {
    type: REQUESTDET_START,
  };
}

export function requestDetails(){
  return function (dispatch) {
    let url = "http://localhost:8080/api/commonAPIs.php";
    
      dispatch(requestDetailsStart())
      return fetch(url)
          .then(response => response.json())
          .then(json => dispatch(requestDetailsSuccess(json)));
  }

}
export function listigDetails(obj){
 
  return function (dispatch) {
  
    fetch('http://localhost:8080/api/requests.php', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(obj)
      }).then(response => response.json())
          .then(json => dispatch(listingDetailsSuccess(json)));
  }

}

export function viewDetails(obj){
 
  return function (dispatch) {
  
    fetch('http://localhost:8080/api/requests.php', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(obj)
      }).then(response => response.json())
          .then(json => dispatch(viewDetailsSuccess(json)));
  }

}
export function requestPost(obj){
  return function (dispatch) {
  
    fetch('http://localhost:8080/api/requests.php', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(obj)
      }).then(response => response.json())
          .then(json => dispatch(requestPostSuccess(json)));
  }
}