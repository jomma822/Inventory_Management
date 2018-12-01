import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Form, Dropdown, Button } from 'semantic-ui-react';
import { hashHistory } from 'react-router';
import { getProducts, getSuppliers, getSupplierProducts, checkout } from '../redux/modules';

export class Checkout extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            availableQuantity: 0
        }
    }

    componentDidMount() {
        this.props.getSuppliers();
    }

    onSupplierChange(evt, data) {
        this.props.getSupplierProducts(data.value);
        this.setState({ supplierId: data.value });
    }

    onProductChange(evt, data) {
        const selectedSupplierProduct = this.props.supplier.supplierProducts
            .filter(supplier => supplier.product.id === data.value)
        console.log('selected supplier product',selectedSupplierProduct)
        this.setState({ productId: data.value, availableQuantity: selectedSupplierProduct[0].quantity, supplierProductId: selectedSupplierProduct[0].id });
    }

    checkout(evt) {
        evt.preventDefault();
        this.props.checkout(this.state.supplierId, { selectedSupplierProductId: this.state.supplierProductId, quantity: this.state.quantity }, this.resetState.bind(this));
        hashHistory.push('/dashboard')
    }

    resetState() {
        this.setState({ })
    }

    handleQuantityChange(evt) {
        if(evt.target.value <= 0) {
            alert('You cannot enter 0 or a negative value')
            return;
        }
        if(evt.target.value > this.state.availableQuantity) {
            alert('You cannot enter a value greater than the available quantity')
            return;
        }
        this.setState({ quantity: evt.target.value });
    }

    render() {
        console.log(this.state)
        const supplierOptions = this.props.supplier.list.map(supplier => {
            return {
                key: supplier.id,
                value: supplier.id,
                text: supplier.name
            }
        })
        const productOptions = this.state.supplierId ? (this.props.supplier.supplierProducts
            .map(supplier => {
                return supplier.product
            }).map(sp => {
            return {
                key: sp.id,
                value: sp.id,
                text: sp.name
            }
        })) : []
        return (
            <div>
                <Header>Checkout Products From Suppliers</Header>
                <Form>
                    <Form.Field>
                        <label>Supplier</label>
                        <Dropdown 
                            placeholder='Supplier' 
                            search selection options={supplierOptions} 
                            onChange={this.onSupplierChange.bind(this)}
                        />
                    </Form.Field>
                    {
                        this.state.supplierId && (
                            <Form.Field>
                                <label>Product</label>
                                <Dropdown 
                                    placeholder='Product' 
                                    search selection options={productOptions} 
                                    onChange={this.onProductChange.bind(this)}
                                />
                            </Form.Field>
                        )
                    }
                    {
                        this.state.productId && (
                            <div>
                                Available Quantity: {this.state.availableQuantity} units
                                <Form.Field>
                                    <label>Quantity</label>
                                    <input 
                                        name='quantity' 
                                        type='number' 
                                        value={this.state.quantity} 
                                        onChange={this.handleQuantityChange.bind(this)}
                                    />
                                </Form.Field>
                                <br />
                                <Button 
                                    primary 
                                    disabled={!this.state.quantity || this.state.quantity === 0} 
                                    onClick={this.checkout.bind(this)}>Checkout</Button>
                            </div>
                        )
                    }
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        supplier: state.supplier
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSuppliers: () => dispatch(getSuppliers()),
        getSupplierProducts: (supplierId) => dispatch(getSupplierProducts(supplierId)),
        checkout: (supplierId, data, callback) => dispatch(checkout(supplierId, data, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);