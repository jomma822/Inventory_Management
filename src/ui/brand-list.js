import React, { Component } from 'react';
import { Form, Header, Table } from 'semantic-ui-react';
import BrandListItem from './brand-list-item';

export default class BrandList extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        const { list } = this.props;
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Created On</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        list.map(item => {
                            return (<BrandListItem item={item} key={item.id}/>)
                        })
                    }
                </Table.Body>
            </Table>
            
        )
    }
}