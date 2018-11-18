import React, { Component } from 'react';
import { Form, Header, Modal, Button, Dropdown, Label } from 'semantic-ui-react';
import SupplierList from './supplier-list';
import { connect } from 'react-redux';
import { getProducts, getBrands, createSupplier, getSuppliers, getSupplierProducts, createSupplierProducts, createSupplierProduct, updateQuantity } from '../redux/modules';
import SupplierProductList from './supplier-product-list';

export class SupplierDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            addProductsModal: false,
            disableButton: true
        }
    }

    componentDidMount() {
        this.props.getSuppliers();
        this.props.getProducts();
        this.props.getSupplierProducts(this.props.params.supplierId);
    }

    openAddProductModal() {
        this.setState({ addProductsModal: true })
    }

    closeAddProductModal() {
        this.setState({ addProductsModal: false, disableButton: true, supplierId: '', productId: '', quantity: 0 });
    }

    handleInputChange(evt) {
        const state = Object.assign({}, this.state, { [evt.target.name]: evt.target.value })
        this.setState(state);
        this.validate(state);
    }

    onProductChange(evt, data) {
        const state = Object.assign({}, this.state, { productId: data.value })
        this.setState(state);
        this.validate(state);
    }

    validate(state) {
        const { productId, quantity, price } = state;
        if(!productId || !quantity || !price) {
            this.setState({ disableButton: true });
        } else if(parseInt(quantity) < 25) {
            this.setState({ disableButton: true, error: 'Quantity should not be less than 25'})
        } else if(parseFloat(price) <= 0) {
            this.setState({ disableButton: true, error: 'Enter a valid price'})
        } else {
            this.setState({ disableButton: false, error: '' });
        }
    }

    addSupplierProduct() {
        console.log(this.state)
        this.props.createSupplierProduct({
            supplierId: parseInt(this.props.params.supplierId),
            productId: this.state.productId,
            quantity: this.state.quantity,
            price: this.state.price
        }, this.successCallback.bind(this))
    }

    successCallback() {
        this.setState({ addProductsModal: false, supplierId: '', productId: '', quantity: 0 })
    }

    updateQuantity(supplierProductId, body) {
        this.props.updateQuantity(parseInt(this.props.params.supplierId), supplierProductId, body)
    }

    render() {
        console.log(this.props)
        const supplierDetail = this.props.supplier.list.filter(supplier => {
            return supplier.id === parseInt(this.props.params.supplierId)
        }) || [{}];
        const existingProductIds = this.props.supplier.supplierProducts.map(supplierProduct => supplierProduct.product.id )
        const productOptions = this.props.product.list
        .filter(product => !existingProductIds.includes(product.id))
        .map(product => {
            return {
                key: product.id,
                value: product.id,
                text: product.name
            }
        })
        return (
            <div>
                <Header>{supplierDetail.length > 0 ? supplierDetail[0].name : ''}</Header>
                <Button 
                    primary 
                    onClick={this.openAddProductModal.bind(this)}>Add Products To Supplier</Button>
                <SupplierProductList 
                    list={this.props.supplier.supplierProducts}
                    updateQuantity={this.updateQuantity.bind(this)}
                />
                <Modal 
                    open={this.state.addProductsModal} 
                    size='small' 
                    onClose={this.closeAddProductModal.bind(this)}>
                    <Modal.Header>Add Products To Supplier</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Product<sup>*</sup></label>
                                <Dropdown 
                                    placeholder='Product' 
                                    search selection options={productOptions} 
                                    onChange={this.onProductChange.bind(this)}
                                    noResultsMessage='No more products to add.'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Quantity<sup>*</sup>(Minimum quantity is 25)</label>
                                <input 
                                    name='quantity' 
                                    value={this.state.quantity || ''} 
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Price per Item<sup>*</sup></label>
                                <input 
                                    name='price' 
                                    value={this.state.price || ''} 
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Field>
                        </Form>
                        <span><sup>*</sup> Please fill the mandatory fileds</span><br />
                        { this.state.error && <Label basic color='red'>{this.state.error}</Label>}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            negative 
                            onClick={this.closeAddProductModal.bind(this)}>Cancel</Button>
                        <Button 
                            disabled={this.state.disableButton} 
                            positive icon='checkmark' 
                            labelPosition='right' 
                            content='Add Supplier' 
                            onClick={this.addSupplierProduct.bind(this)}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        supplier: state.supplier
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
        getBrands: () => dispatch(getBrands()),
        getSuppliers: () => dispatch(getSuppliers()),
        getSupplierProducts: (supplierId) => dispatch(getSupplierProducts(supplierId)),
        createSupplierProduct: (supplierProduct, callback) => dispatch(createSupplierProduct(supplierProduct, callback)),
        updateQuantity: (supplierId, supplierProductId, data) => dispatch(updateQuantity(supplierId, supplierProductId, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetails);