import React from "react";
//import validate from "./validators/person-validators";
import * as API_LOGIN from "../../person/api/login-api";
import * as API_USER from "../../commons/displayuser/user-api";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../errorhandling/api-response-error-message";
import base64 from "react-native-base64";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                userName: {
                    value: '',
                    placeholder: 'What is your userName?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Password...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        emailValidator: true
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = true;//validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    loginUser(login) {
        window.localStorage.clear();
        return API_LOGIN.postLogin(login, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                 let dataJWT1=JSON.stringify(result);
                let dataJWT=JSON.parse(dataJWT1);
                const jwt=dataJWT['jwt'];
                localStorage.setItem("jwt",jwt);
                console.log("Successfully inserted person with id: " + JSON.stringify(result));
                const [headerB64, payloadB64] = jwt.split('.');
                const aux=base64.decode(payloadB64);
                const finalStr0 = aux.trim();
                const finalStr01 = finalStr0.replaceAll('\u0000','');
                const a1 =JSON.stringify(finalStr01);
                const a2 =JSON.parse(finalStr01);
                const a3=a2['roles'];
                const a4=a3[0];
                const user=JSON.stringify(a4['authority']);
                const user1=user.replaceAll('"', '');
                const userName1=a2['sub'];
                const userName=userName1.replaceAll('"', '');
                localStorage.setItem('userName', userName );
                localStorage.setItem("rol",user1);
                if(user1==="ADMIN"){
                    window.location.replace('/users')
                }else if(user1==="CLIENT"){
                    window.location.replace('/client')
                }else{
                  window.location.replace('/login')
                }
                //this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    // setUserDataInLocalStorage(){
    //     let jwt= localStorage.getItem("jwt");
    //     const [headerB64, payloadB64] = jwt.split('.');
    //     const aux=base64.decode(payloadB64);
    //     const finalStr0 = aux.trim();
    //     const finalStr01 = finalStr0.replaceAll('\u0000','');
    //     const a1 =JSON.stringify(finalStr01);
    //     const a2 =JSON.parse(finalStr01);
    //     const a3=a2['sub'];
    //     const user=JSON.stringify(a3);
    //     const userName=user.replaceAll('"', '');
    //     console.log(userName);
    //     localStorage.setItem("userName", userName);
    //     API_USER.getUserByName(userName, (result, status, error) => {
    //         if (result !== null && (status === 200 || status === 201)) {
    //             console.log(result['id']);
    //             localStorage.setItem('idUser', result['id']);
    //             console.log(result['id']);
    //             //this.reloadHandler();
    //         } else {
    //             this.setState(({
    //                 errorStatus: status,
    //                 error: error
    //             }));
    //         }
    //     });
    //
    // }

    handleSubmit() {
        let login = {
            userName: this.state.formControls.userName.value,
            password: this.state.formControls.password.value,
        };

        this.loginUser(login);
       // this.setUserDataInLocalStorage();
    }

    render() {
        return (
            <div>

                <FormGroup id='userName'>
                    <Label for='userNameField'> Username: </Label>
                    <Input name='userName' id='userNameField' placeholder={this.state.formControls.userName.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.userName.value}
                           touched={this.state.formControls.userName.touched? 1 : 0}
                           valid={this.state.formControls.userName.valid}
                           required
                    />
                    {this.state.formControls.userName.touched && !this.state.formControls.userName.valid &&
                        <div className={"error-message row"}> * UserName must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password </Label>
                    <Input name='password' id='passwordFieldField' placeholder={this.state.formControls.password.placeholder}
                           type={'password'}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                        <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
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

export default LoginForm;

