import React, { Component } from 'react';
import { Form, Header, Table } from 'semantic-ui-react';
import ProductListItem from './product-list-item';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Brand</Table.HeaderCell>
                        <Table.HeaderCell>Created On</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        this.props.list.map(item => {
                            return <ProductListItem item={item} key={item.id}/>
                        })
                    } 
                </Table.Body>
            </Table>
            
        )
    }
}