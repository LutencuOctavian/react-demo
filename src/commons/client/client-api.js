import {HOST} from "../hosts";
import RestApiClient from "../api/rest-client";

const endpoint = {
    getSmartDeviceByUsers:'/api/smartDevice/',
    addNewDevice:'/api/smartDevice/add',
    deleteDevice:'/api/smartDevice/delete',
    //deleteUser: '/api/user/delete',
    //updateUser: '/api/user/update',
};

function getSmartDeviceByUsers(userName, callback) {
    let request = new Request(HOST.backend_api + endpoint.getSmartDeviceByUsers+userName, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        }
    });
    RestApiClient.performRequest(request, callback);
}

function addNewSmartDevice(device, callback){
    let request = new Request(HOST.backend_api + endpoint.addNewDevice , {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify(device)
    });

    RestApiClient.performRequest(request, callback);
}
//
function deleteDevice(idDevice, callback){
    let request = new Request(HOST.backend_api + endpoint.deleteDevice , {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify(idDevice)
    });

    RestApiClient.performRequest(request, callback);
}
//
// function updateUser(dto, callback){
//     let request = new Request(HOST.backend_api + endpoint.updateUser , {
//         method: 'POST',
//         headers : {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
//         },
//         body: JSON.stringify( dto)
//     });
//
//     RestApiClient.performRequest(request, callback);
// }

export {
    getSmartDeviceByUsers,
    addNewSmartDevice,
    deleteDevice,
};
