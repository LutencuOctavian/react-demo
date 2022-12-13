import React from "react";
import Table from "../../commons/tables/table";
import {DeleteButton, UpdateButton} from "./button-delete-update";


const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'FullName',
        accessor: 'fullname',
    },
    {
        Header: 'UserName',
        accessor: 'username',
    },
    {
        Header: 'Role',
        accessor: 'roleSet[0].role',
    },
    {
        Header: 'Actions',
        Cell: ({ row }) => (<DeleteButton user={row}/>)

    },
    {
        Header: 'Actions',
        Cell: ({ row }) => (<UpdateButton user={row}/>)
    }
];



const filters = [
    {
        accessor: 'username',
    }
];


class UserTable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
        // handler(props);
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

export default UserTable;
