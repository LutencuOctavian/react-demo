import React from "react";
import * as API_USERS from "../../commons/displayuser/user-api"
import {Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import APIResponseErrorMessage from "../errorhandling/api-response-error-message";
import UserTable from "./user-table";
import UserForm from "./user-form";
import {DeleteButton} from "./button-delete-update";


class UserContainer extends React.Component {

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
        this.fetchUser();
    }

    fetchUser() {
        return API_USERS.getUsers((result, status, err) => {

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
        this.fetchUser();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> User In DB </strong>
                </CardHeader>
                <br/>
                <Row>
                    <Col sm={{size: '5', offset: 1}}>
                        <Button color="primary" onClick={this.toggleForm}>Add User </Button>
                    </Col>
                </Row>
                <br/>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <UserTable tableData = {this.state.tableData} columns={this.state.columns} />}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add New User</ModalHeader>
                    <ModalBody>
                        <UserForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}

export default UserContainer;
