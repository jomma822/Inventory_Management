import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { hashHistory } from 'react-router';

export default class SupplierListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item } = this.props;
        return (
            <Table.Row>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{`${item.createdOn.dayOfMonth}-${item.createdOn.monthValue}-${item.createdOn.year}`}</Table.Cell>
                <Table.Cell><Button onClick={() => hashHistory.push(`/dashboard/suppliers/${item.id}`)}>View Details</Button></Table.Cell>
            </Table.Row>
        )
    }
}