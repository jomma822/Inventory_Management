import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { Form, Header, Modal, Button, Dropdown } from 'semantic-ui-react';
import BrandList from './brand-list';
import { getBrands, createBrand } from '../redux/modules';

export class Brands extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            addModal: false,
            error: false,
            buttonDisabled: true
        }
    }

    componentDidMount() {
        this.props.getBrands();
    }

    openAddModal() {
        this.setState({ addModal: true });
    }

    closeAddModal() {
        this.setState({ addModal: false });
    }

    handleNameChange(evt) {
        const state = Object.assign({}, this.state, { [evt.target.name]: evt.target.value });
        this.setState(state);
        this.validate(state)
        console.log(state)
        // const existing = list.filter(brand => {
        //     return brand.name === value
        // });
        // this.setState({ name: value, error: existing.length > 0 });
    }

    validate(state) {
        const { addModal, error, name } = state;
        if (!name || (name.trim() === "") || validator.isEmpty(name)) {
            this.setState({ buttonDisabled: true })
        } else {
            this.setState({ buttonDisabled: false })
        }
    }

    addBrand() {
        console.log(this.state)
        this.props.createBrand({name: this.state.name}, this.successCallback.bind(this), this.errorCallback.bind(this))
    }

    successCallback() {
        this.setState({ addModal: false, name: '' })
    }

    errorCallback() {
        this.setState({ error: true });
    }

    render() {
        const { list } = this.props.brand;
        return (
            <div>
                <Header>Brands</Header>
                <Button 
                    primary 
                    onClick={this.openAddModal.bind(this)}>Add Brand</Button>
                <BrandList list={list}/>
                <Modal 
                    open={this.state.addModal} 
                    size='small' 
                    onClose={this.closeAddModal.bind(this)}>
                    <Modal.Header>Add New Brand</Modal.Header>
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
                        </Form>
                        {
                            this.state.buttonDisabled === true &&
                            <label> <sup>*</sup> Please fill the mandatory fileds</label>
                        }
                        {
                            this.state.error === true && 
                            <label>
                                This brand already exists
                            </label>
                        }
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            negative 
                            onClick={this.closeAddModal.bind(this)}>Cancel</Button>
                        <Button 
                            positive 
                            icon='checkmark' 
                            labelPosition='right' 
                            content='Add Brand' 
                            disabled={this.state.buttonDisabled} 
                            onClick={this.addBrand.bind(this)}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        brand: state.brand
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBrands: () => dispatch(getBrands()),
        createBrand: (brand, callback, errCallback) => dispatch(createBrand(brand, callback, errCallback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands);