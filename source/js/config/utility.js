

export function getDetailsWithLib(rawListingDet, libArr){

// console.log("libs", rawListingDet, libArr);

    let detailsArr = {};
    let requestTypes = Array();
        requestTypes[1] = "Request";
        requestTypes[2] = "Return";
        requestTypes[3] = "Transfer";

    detailsArr = { 
        "request":{
            requestId : "REQ"+rawListingDet.request.requestId,
            requestType : requestTypes[rawListingDet.request.notificationType],
            projectIdFrom : getDetailsWithMatchedKey(rawListingDet.request.projectIdFrom, libArr["projects"], "projectId", "projectName"),
            createdBy : getDetailsWithMatchedKey(rawListingDet.request.createdBy, libArr["users"], "userId", "Name"),
            requestStatus : rawListingDet.request.requestStatus,
            description: rawListingDet.request.description
        }
    };
    if(rawListingDet.matRequests){
        let matRequest = [];
        rawListingDet.matRequests.map((value)=>{
                let req = {
                    categoryId : getDetailsWithMatchedKey(value.categoryId, libArr["category"], "categoryId", "categoryName"),
                    quantityRequested : value.quantityRequested,
                    subCategoryId : getDetailsWithMatchedKey(value.categoryId, libArr["subCategory"], "subCategoryId", "subCategoryName")
                }
                matRequest.push(req);
        });

        detailsArr.matRequests = matRequest;
    }

    return detailsArr;
        
}
export function getDetailsWithMatchedKey(id, lib, key, returnKey){
    let returnValue = "";
    lib.map((value) =>{
        if(value[key] === id){
            returnValue = value[returnKey];
        }

    });
    return returnValue;
}
export function getListingId(id){
     return id.replace("REQ", "");
     
}
export function validateLoggedUser(){
    let userId = sessionStorage.getItem("userId");
    if(userId === ""){
        return false;
    }
    else{
        return true;
    }

}