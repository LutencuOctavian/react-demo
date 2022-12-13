import {HOST} from "../hosts";
import RestApiClient from "../api/rest-client";

const endpoint = {
    getConsumptionEnergy:'/api/consumptionEnergy/',
};

function getSmartDeviceByUsers(idDevice, callback) {
    let request = new Request(HOST.backend_api + endpoint.getConsumptionEnergy+idDevice, {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        // }
    });
    RestApiClient.performRequest(request, callback);
}

export {getSmartDeviceByUsers}

