import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

export default class ProductListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item } = this.props;
        return (
            <Table.Row>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.brandName}</Table.Cell>
                <Table.Cell>{`${item.createdOn.dayOfMonth}-${item.createdOn.monthValue}-${item.createdOn.year}`}</Table.Cell>
            </Table.Row>
        )
    }
}