import React from "react";
import Table from "../tables/table";
import {
    DeleteDeviceButton,
    UpdateDeviceButton,
    ViewConsumptionButton
} from "../displayuser/button-delete-update";



const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Device Name',
        accessor: 'nameOfDevice',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Address Of Device',
        accessor: 'addressOfDevice',
    },
    {
        Header: 'Maximum Consumption',
        accessor: 'maximumConsumptionPerHour',
    },
    {
        Header: 'Actions',
        Cell: ({ row }) => (<DeleteDeviceButton user={row}/>)

    },
    {
        Header: 'Actions',
        Cell: ({ row }) => (<UpdateDeviceButton device={row}/>)
    },
    {
        Header: 'Actions',
        Cell: ({ row }) => (<ViewConsumptionButton device={row}/>)
    },
]

const filters = [
    {
        accessor: 'nameOfDevice',
    }
];

class ClientTable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default ClientTable
