import React, {useState} from "react";
import {Button} from "reactstrap";
import * as API_USERS from "../../commons/displayuser/user-api"
import * as API_DEVICE from "../../commons/client/client-api"
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import UpdateUserForm from "./updateUserForm";
import ClientSmartDeviceForm from "../client/client-smartDevice_form";
import { Link } from "react-router-dom";
import * as API_DEVICEE from "../displayuser/display-user-api";


function DeleteDeviceButton(user){
    return(
        <div>
            <Button color="primary" onClick={() => {
                 let aux=user['user'];
                 let aux2=JSON.stringify(aux['_original']);
                 let aux1=JSON.parse( aux2);

                API_DEVICE.deleteDevice(aux1['id'], (result, status, err) => {

                    if (result !== null && status === 200) {
                       console.log("User was deleted!");
                    } else {
                        console.log("Error when delete user!");
                        console.log(err);
                    }
                });
            }
            }>Delete </Button>
        </div>
    );
}

function DeleteButton(user){
    return(
        <div>
            <Button color="primary" onClick={() => {
                let aux=user['user'];
                let aux2=JSON.stringify(aux['_original']);
                let aux1=JSON.parse( aux2);

                API_USERS.deleteUser(aux1['id'], (result, status, err) => {

                    if (result !== null && status === 200) {
                        console.log("User was deleted!");
                    } else {
                        console.log("Error when delete user!");
                        console.log(err);
                    }
                });
            }
            }>Delete </Button>
        </div>
    );
}

function ViewConsumptionButton(device){
    console.log("ViewConsumptionButton==>");
    console.log(device.device.id);
    return(
        <div>
            <Link to={{
                pathname: '/chart',
                state: {id: device.device.id} ,
            }}><Button color="primary">View Consumption </Button></Link>
        </div>
    );
}

function UpdateButton(user){
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return(
        <div>
            <Button color="primary" onClick={openModal} >Update </Button>

            <Modal isOpen={modalIsOpen}
                   toggle={closeModal}
                   size="lg">
                <ModalHeader toggle={closeModal} > Update User</ModalHeader>
                <ModalBody>
                    <UpdateUserForm  user={user.user}/>
                </ModalBody>
            </Modal>
        </div>
    );
}

function UpdateDeviceButton(device){
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return(
        <div>
            <Button color="primary" onClick={openModal} >Update </Button>

            <Modal isOpen={modalIsOpen}
                   toggle={closeModal}
                   size="lg">
                <ModalHeader toggle={closeModal} > Update User</ModalHeader>
                <ModalBody>
                    <ClientSmartDeviceForm  device={device.device}/>
                </ModalBody>
            </Modal>
        </div>
    );
}

export {
    DeleteButton,
    DeleteDeviceButton,
    UpdateButton,
    UpdateDeviceButton,
   ViewConsumptionButton
}
