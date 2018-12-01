import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

export default class SupplierProductListItem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            quantity: this.props.item.quantity
        }
    }

    onUpdateQuantity() {
        this.setState({
            edit: true
        })
    }

    onSave() {
        const { item } = this.props;
        this.props.updateQuantity(item.id, { quantity: this.state.quantity });
        this.setState({
            edit: false,
        })
    }

    onQuantityChange(evt) {
        if(evt.target.value <= 0) {
            alert('You cannot enter 0 or a negative value')
            return;
        }
        this.setState({
            quantity: evt.target.value
        })
    }

    render() {
        const { item } = this.props;
        return (
            <Table.Row>
                <Table.Cell>{item.product.name}</Table.Cell>
                <Table.Cell>{item.product.brandName}</Table.Cell>
                <Table.Cell>
                    {
                        this.state.edit ? 
                        (<span>
                            <input 
                                name='quantity' 
                                type='number' 
                                value={this.state.quantity} 
                                onChange={this.onQuantityChange.bind(this)}
                            />
                            <Button 
                                floated='right' 
                                onClick={this.onSave.bind(this)}>Save</Button></span>)
                        : (
                            <span>{this.state.quantity} <Button floated='right' onClick={this.onUpdateQuantity.bind(this)}>Update Quantity</Button></span>
                        )
                    }
                </Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
            </Table.Row>
        )
    }
}