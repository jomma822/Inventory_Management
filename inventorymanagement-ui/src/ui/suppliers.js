import React, { Component } from 'react';
import validator from 'validator';
import { Form, Header, Modal, Button, Label } from 'semantic-ui-react';
import SupplierList from './supplier-list';
import { connect } from 'react-redux';
import { getProducts, getBrands, createSupplier, getSuppliers } from '../redux/modules';

export class Suppliers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModal: false,
            buttonDisabled: true
        }
    }
    componentDidMount() {
        this.props.getSuppliers();
    }
    openAddModal() {
        this.setState({ addModal: true }, { name: ''});
    }
    closeAddModal() {
        this.setState({ addModal: false });
    }
    handleInputChange(evt) {
        const state = Object.assign({}, this.state, { [evt.target.name]: evt.target.value });
        this.setState(state);
        this.validate(state)
    }
    isValidEmail(email) {
        let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return pattern.test(email);
    }
    validate(state) {
        const { name, email, address } = state;
        if(!name || 
            !email || 
            !address || 
            (name.trim() === "") ||
            (email.trim() === "") ||
            (address.trim() === "") ||
            validator.isEmpty(name) || 
            validator.isEmpty(email) || 
            validator.isEmpty(address)) {
            this.setState({ buttonDisabled: true, error: 'Please enter all the mandatory fields' })
        } else if(!this.isValidEmail(email)) {
            this.setState({ buttonDisabled: true, error: 'Please enter a valid email' })
        } else {
            this.setState({ buttonDisabled: false, error: undefined })
        }
    }
    addSupplier() {
        console.log(this.state)
        this.props.createSupplier({
            name: this.state.name,
            email: this.state.email,
            address: this.state.address
        }, this.successCallback.bind(this),
        this.errorCallback.bind(this))
    }
    successCallback() {
        this.setState({ addModal: false, email: '', name: '', address: '', error: undefined, buttonDisabled: true })
    }
    errorCallback() {
        this.setState({ error: 'Supplier with this name already exists' });
    }
    render() {
        const { list } =this.props.supplier;
        return (
            <div>
                <Header>Suppliers</Header>
                <Button 
                    primary 
                    onClick={this.openAddModal.bind(this)}>Add Supplier</Button>
                <SupplierList list={list}/>
                <Modal open={this.state.addModal} size='small' onClose={this.closeAddModal.bind(this)}>
                    <Modal.Header>Add New Supplier</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name<sup>*</sup></label>
                                <input name='name' value={this.state.name || ''} onChange={this.handleInputChange.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Email<sup>*</sup></label>
                                <input type='email' name='email' value={this.state.email || ''} onChange={this.handleInputChange.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Address<sup>*</sup></label>
                                <input name='address' value={this.state.address || ''} onChange={this.handleInputChange.bind(this)}/>
                            </Form.Field>
                            <span><sup>*</sup> Please fill all the mandatory fields</span><br />
                            { this.state.error && <Label basic color='red'>{this.state.error}</Label> }
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.closeAddModal.bind(this)}>Cancel</Button>
                        <Button positive 
                            icon='checkmark'
                            labelPosition='right'
                            content='Add Supplier'
                            onClick={this.addSupplier.bind(this)}
                            disabled={this.state.buttonDisabled}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        brand: state.brand,
        supplier: state.supplier
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
        getBrands: () => dispatch(getBrands()),
        getSuppliers: () => dispatch(getSuppliers()),
        createSupplier: (supplier, callback, errCallback) => dispatch(createSupplier(supplier, callback, errCallback)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers);