import {HOST} from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    getUsers:'/api/user/all',
    addNewUser:'/api/user/add',
    deleteUser: '/api/user/delete',
    updateUser: '/api/user/update',
    findByUserName: '/api/user/usrnm/'
};

function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.getUsers, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        }
    });
    RestApiClient.performRequest(request, callback);
}

function addUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.addNewUser , {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify(user)
    });

    RestApiClient.performRequest(request, callback);
}

function deleteUser(idUser, callback){
    let request = new Request(HOST.backend_api + endpoint.deleteUser , {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify(idUser)
    });

    RestApiClient.performRequest(request, callback);
}

function updateUser(dto, callback){
    let request = new Request(HOST.backend_api + endpoint.updateUser , {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify( dto)
    });

    RestApiClient.performRequest(request, callback);
}

function getUserByName(userName, callback){
    let request = new Request(HOST.backend_api + endpoint.findByUserName+userName , {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        },
    });

    RestApiClient.performRequest(request, callback);

}

export {
    getUsers,
    addUser,
    deleteUser,
    updateUser,
    getUserByName,
};
