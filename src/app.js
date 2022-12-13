import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import UserContainer from "./commons/displayuser/user-container";
import LoginContainer from "./commons/login/login-container";
// import {decode as base64_decode, encode as base64_encode} from 'base-64';
import base64 from 'react-native-base64'
import ClientContainer from "./commons/client/client-container";
import ApexChart from "./commons/chart/chart-component";
import { withRouter } from 'react-router-dom'

class App extends React.Component {

    render() {
        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/person'
                            render={() =><PersonContainer/>}
                        />

                        <Route
                            exact
                            path='/users'
                            render={() =>{
                                if("ADMIN"=== localStorage.getItem('rol')){
                                    return (<UserContainer/>);
                                }else if("CLIENT"=== localStorage.getItem('rol')){
                                    return (<ClientContainer/>);
                                }else{
                                    localStorage.clear();
                                    return (<Home/>);
                                }
                            }
                        }

                        />
                        <Route
                            exact
                            path='/client'
                            render={() => {
                                if("ADMIN"=== localStorage.getItem('rol')){
                                    return (<UserContainer/>);
                                }else if("CLIENT"=== localStorage.getItem('rol')){
                                    return (<ClientContainer/>);
                                }else{
                                    localStorage.clear();
                                    return (<Home/>);
                                }
                            }
                        }

                        />

                        <Route
                            exact
                            path='/login'
                            render={() => <LoginContainer/>}
                        />

                        <Route
                            exact
                            path='/chart'
                            render={(prop) => <ApexChart props={prop}/>}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>

        )
    };
}

export default  App
//withRouter(App)

