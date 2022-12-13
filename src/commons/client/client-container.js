import React from "react";
import * as API_USERS from "../client/client-api";
import {Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import APIResponseErrorMessage from "../errorhandling/api-response-error-message";
import UserForm from "../displayuser/user-form";
import base64 from "react-native-base64";
import ClientTable from "./client-table";
import ClientSmartDeviceForm from "./client-smartDevice_form";

class ClientContainer extends React.Component{
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchUserDevices();
    }

    fetchUserDevices() {
        console.log("client ", localStorage.getItem("userName"));
        let userName= localStorage.getItem("userName");
        while(userName===null){
            userName= localStorage.getItem("userName");
        }
        userName= localStorage.getItem("userName");
        return API_USERS.getSmartDeviceByUsers(userName, (result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.fetchUserDevices();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Smart Devices Of User: {localStorage.getItem("userName")} </strong>
                </CardHeader>
                <br/>
                <Row>
                    <Col sm={{size: '5', offset: 1}}>
                        <Button color="primary" onClick={this.toggleForm}>Add Smart Device </Button>
                    </Col>
                </Row>
                <br/>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <ClientTable tableData = {this.state.tableData} columns={this.state.columns} />}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add New Smart Device</ModalHeader>
                    <ModalBody>
                        <ClientSmartDeviceForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }

}

export default ClientContainer
