import React from "@types/react";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

class ViewConsumptionButton extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        console.log("ViewConsumptionButton==>");
        //console.log(device.device.id);
        const arr=[];
        //const data={id: device.device.id};
        //arr.push(data);
        return(
            <div>
                <Link to={{
                    pathname: '/chart',
                    state: {id: "Salut Octavian!"}
                }}><Button color="primary">View Consumption </Button></Link>
            </div>
        );
    }
}

export default ViewConsumptionButton
