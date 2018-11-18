import React, { Component } from 'react';
import { Form, Header, Table } from 'semantic-ui-react';
import SupplierProductListItem from './supplier-product-list-item';

export default class SupplierProductList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Price per Item</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        this.props.list.map(item => {
                            return (
                                <SupplierProductListItem {...this.props} item={item} key={item.id}/>
                            )
                        })
                    }
                </Table.Body>
            </Table>
            
        )
    }
}