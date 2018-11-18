import React, { Component } from 'react';
import { Form, Header, Table } from 'semantic-ui-react';
import SupplierListItem from './supplier-list-item';

export default class SupplierList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Created On</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        this.props.list.map(item => {
                            return (
                                <SupplierListItem item={item} key={item.id}/>
                            )
                        })
                    }
                </Table.Body>
            </Table>
            
        )
    }
}