
import get from "../api/";
export const REQUESTDET_START = 'REQUESTDET_START';
export const REQUESTDET_ERROR = 'REQUESTDET_ERROR';
export const REQUESTDET_SUCCESS = 'REQUESTDET_SUCCESS';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export function requestDetailsSuccess(loginData) {
  return {
    type: REQUESTDET_SUCCESS,
    data:loginData
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