import React from "react";
import * as API_USERS from "../displayuser/user-api";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../errorhandling/api-response-error-message";

class UpdateClientForm extends React.Component{
    constructor(props) {
        super(props);
        {
            console.log(props.user.id)
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,


            formControls: {

                devicename: {
                    value: '',
                    placeholder: 'devicename',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                descrition: {
                    value: '',
                    placeholder: 'description',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                addressofdevice: {
                    value: '',
                    placeholder: 'addressofdevice',
                    valid: false,
                    touched: false,
                    validationRules: {
                        emailValidator: true
                    }
                },

                maximumconsuption: {
                    value: '',
                    placeholder: 'maximumconsuption',
                    valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const userName = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[userName];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedControls[userName] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    updateSmartDevice(dto) {
        ////////////trebuie modificat
        // return API_USERS.updateUser(dto, (result, status, error) => {
        //     if (result !== null && (status === 200 || status === 201)) {
        //         console.log("Successfully inserted person with id: " + result);
        //         //this.reloadHandler();
        //     } else {
        //         this.setState(({
        //             errorStatus: status,
        //             error: error
        //         }));
        //     }
        // });
    }

    handleSubmit() {
        let user={
            username:localStorage.getItem("userName"),
        }
        let device = {
            nameOfDevice: this.state.formControls.devicename.value,
            addressOfDevice: this.state.formControls.addressofdevice.value,
            description: this.state.formControls.description.value,
            maximumConsumptionPerHour: this.state.formControls.maximumconsuption.value,
            userDTO: user,
        };
        this.updateSmartDevice(device);
    }

    render() {
        return (
            <div>
                <FormGroup id='devicename'>
                    <Label for='devicenameField'> Devicename: </Label>
                    <Input name='devicename' id='devicenameField' placeholder={this.state.formControls.devicename.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.props.device}
                           touched={this.state.formControls.fullname.touched? 1 : 0}
                        // valid={this.state.formControls.username.valid}
                           required
                    />
                    {/*{this.state.formControls.username.touched && !this.state.formControls.username.valid &&*/}
                    {/*    <div className={"error-message row"}> * Name must have at least 3 characters </div>}*/}
                </FormGroup>

                <FormGroup id='description'>
                    <Label for='descriptionField'> Description: </Label>
                    <Input name='description' id='descriptionField' placeholder={this.state.formControls.description.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.props.user.username}
                           touched={1}
                        // valid={this.state.formControls.username.valid}
                           required
                    />
                    {/*{this.state.formControls.username.touched && !this.state.formControls.username.valid &&*/}
                    {/*    <div className={"error-message row"}> * Name must have at least 3 characters </div>}*/}
                </FormGroup>

                <FormGroup id='password1'>
                    <Label for='password1Field'> Password: </Label>
                    <Input name='password1' id='password1Field' placeholder={this.state.formControls.password1.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password1.value}
                           touched={this.state.formControls.password1.touched? 1 : 0}
                           valid={this.state.formControls.password1.valid}
                           required
                    />
                    {/*{this.state.formControls.password1.touched && !this.state.formControls.password1.valid &&*/}
                    {/*    <div className={"error-message"}> * Invalid Password format</div>}*/}
                </FormGroup>

                <FormGroup id='password2'>
                    <Label for='password2Field'> Password: </Label>
                    <Input name='password2' id='password2Field' placeholder={this.state.formControls.password2.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password2.value}
                           touched={this.state.formControls.password2.touched? 1 : 0}
                           valid={this.state.formControls.password2.valid}
                           required
                    />
                    {/*{this.state.formControls.password2.touched && !this.state.formControls.password2.valid &&*/}
                    {/*    <div className={"error-message"}> * Invalid Password format</div>}*/}
                </FormGroup>

                <FormGroup id='role'>
                    <Label for='roleField'> Role: </Label>
                    <Input name='role' id='roleField' placeholder={this.state.formControls.role.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.props.user['roleSet[0].role']}
                           touched={this.state.formControls.role.touched? 1 : 0}
                           valid={this.state.formControls.role.valid}
                           required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        {/*disabled={!this.state.formIsValid}*/}
                        <Button type={"submit"}  disabled={false} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }

}

export default UpdateClientForm
