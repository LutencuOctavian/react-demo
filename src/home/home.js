import React from 'react';

import BackgroundImg from '../commons/images/img2.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>Energy Management System Platform for Home</h1>
                        <p style={textStyle}><b> An energy management system (EMS) is a system of computer-aided tools used by operators of electric utility
                        grids to monitor, control, and optimize the performance of the generation or transmission system. </b></p>

                    </Container>
                </Jumbotron>

            </div>
        )
    };
}

export default Home
