import React from 'react'
import logo from './commons/images/img1.png';

import {
    Button,
    Nav,
    Navbar,
    NavbarBrand,
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const buttomStyle={
    color: 'white',
};


const NavigationBar = () => (
    <div>
        <Navbar color="dark" >
            {/*light expand="md">*/}
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav>
                <Button color="red" style={buttomStyle}><a href={"/Login"}>LogIn</a> </Button>
                <Button color="red" style={buttomStyle} onClick={()=>window.localStorage.clear()}><a href={"/"}>LogOut</a> </Button>

            </Nav>
        </Navbar>
    </div>
);

export default NavigationBar
