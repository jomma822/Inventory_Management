import React, { Component } from 'react';
import validator from 'validator';
import { Form, Header, Modal, Button, Dropdown } from 'semantic-ui-react';
import ProductList from './product-list';
import { getProducts, createProduct, getBrands } from '../redux/modules';
import { connect } from 'react-redux';

export class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModal: false,
            error: false,
            buttonDisabled: true,
            name: '',
            sku:'',
        }
    }
    componentDidMount() {
        this.props.getProducts();
        if(this.props.brand.list.length === 0) {
            this.props.getBrands();
        }
    }

    openAddModal() {
        this.setState({ addModal: true });
    }

    closeAddModal() {
        this.setState({ addModal: false });
    }

    handleNameChange(evt) {
        const { list } = this.props.product;
        const state = Object.assign({}, this.state, { [evt.target.name]: evt.target.value });
        this.setState(state);
        this.validate(state)
    }

    validate(state) {
        const { name, sku } = state;
        if ((name.trim() === "") ||
         !name || 
         validator.isEmpty(name) ||
         (sku.trim() === "") ||
         !sku || 
         validator.isEmpty(sku)) {
            this.setState({ buttonDisabled: true });
        } else {
            this.setState({ buttonDisabled: false });
        }
    }

    addProduct() {
        console.log('print sku here')
        console.log(this.state.sku)
        this.props.createProduct({ name: this.state.name, brandId: this.state.brandId, sku: this.state.sku }, this.successCallback.bind(this), this.errorCallback.bind(this))
    }

    onBrandChange(evt, data) {
        this.setState({ brandId: data.value });
    }

    successCallback() {
        this.setState({ addModal: false, name: '', address: '', brandId: '', sku: '' })
    }

    errorCallback() {
        this.setState({ error: true });
    }
    render() {
        const brandsList = this.props.brand.list;
        let stateOptions = brandsList.map(brand => {
            return {
                key: brand.id,
                value: brand.id,
                text: brand.name
            }
        });
        let { list } = this.props.product;
        return (
            <div>
                <Header>Products</Header>
                    <Button primary 
                        onClick={this.openAddModal.bind(this)}>Add Product</Button>
                <ProductList list={list}/>
                <Modal open={this.state.addModal} size='small' onClose={this.closeAddModal.bind(this)}>
                    <Modal.Header>Add New Product</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name<sup>*</sup></label>
                                <input 
                                    name='name' 
                                    value={this.state.name || ''} 
                                    onChange={this.handleNameChange.bind(this)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>SKU<sup>*</sup></label>
                                <input 
                                    name='sku' 
                                    value={this.state.sku || ''} 
                                    onChange={this.handleNameChange.bind(this)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Brand<sup>*</sup></label>
                                <Dropdown 
                                    placeholder='Brand' 
                                    search selection options={stateOptions} 
                                    onChange={this.onBrandChange.bind(this)}
                                />
                            </Form.Field>
                        </Form>
                        {
                            this.state.error === true && 
                            <label>
                                This SKU already exists !!!
                            </label>
                        }
                        {
                            this.state.buttonDisabled === true &&
                            <label> <sup>*</sup> Please fill the mandatory fileds</label>
                        }
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            negative 
                            onClick={this.closeAddModal.bind(this)}>Cancel</Button>
                        <Button positive 
                            icon='checkmark' 
                            labelPosition='right' 
                            content='Add Product'  
                            disabled={this.state.buttonDisabled || !this.state.brandId} 
                            onClick={this.addProduct.bind(this)}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        brand: state.brand
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
        getBrands: () => dispatch(getBrands()),
        createProduct: (product, callback, errCallback) => dispatch(createProduct(product, callback, errCallback)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);