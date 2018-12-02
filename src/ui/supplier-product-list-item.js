import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

export default class SupplierProductListItem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            quantityEdit: false,
            priceEdit: false,
            quantity: this.props.item.quantity,
            price: this.props.item.price
        }
    }

    onUpdateQuantity() {
        this.setState({
            quantityEdit: true
        })
    }

    onUpdatePrice() {
        this.setState({
            priceEdit: true
        })
    }

    onSave() {
        const { item } = this.props;
        this.props.updateQuantity(item.id, { quantity: this.state.quantity });
        this.setState({
            quantityEdit: false,
        })
    }

    onPriceSave() {
        const { item } = this.props;
        console.log(item)
        this.props.updateQuantity(item.id, { price: this.state.price });
        this.setState({
            priceEdit: false,
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

    onPriceChange(evt) {
        if(evt.target.value <= 0) {
            alert('Price should not be less than zero')
            return;
        }
        this.setState({
            price: evt.target.value
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
                        this.state.quantityEdit
                            ? 
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
                <Table.Cell>
                    {
                        this.state.priceEdit
                            ? 
                        (<span>
                            <input 
                                name='price' 
                                type='double' 
                                value={this.state.price} 
                                onChange={this.onPriceChange.bind(this)}
                            />
                            <Button 
                                floated='right' 
                                onClick={this.onPriceSave.bind(this)}>Save</Button></span>)
                        : (
                            <span>{this.state.price} <Button floated='right' onClick={this.onUpdatePrice.bind(this)}>Update Price</Button></span>
                        )
                    }
                </Table.Cell>
            </Table.Row>
        )
    }
}