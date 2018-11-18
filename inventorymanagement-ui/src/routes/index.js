import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../ui/app';
import Suppliers from '../ui/suppliers';
import Brands from '../ui/brands';
import Products from '../ui/products';
import Home from '../ui/home';
import Login from '../ui/login';
import Dashboard from '../ui/dashboard';
import SupplierDetails from '../ui/supplier-details';
import Checkout from '../ui/checkout';
import { ping } from '../redux/modules';
import { connect } from 'react-redux';
import Report from '../ui/report';
class InventoryManagementRouter extends Component {
    
    constructor(props) {
        super(props)
    }

    checkSession() {
        this.props.ping();
    }
    
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Login}/>
                    <Route path='/dashboard' onEnter={this.checkSession.bind(this)}>
                        <IndexRoute component={Dashboard}/>
                        <Route path="/dashboard/home" component={Home} onEnter={this.checkSession.bind(this)}/>
                        <Route path="/dashboard/suppliers">
                        <IndexRoute component={Suppliers} onEnter={this.checkSession.bind(this)}/>
                            <Route path="/dashboard/suppliers/:supplierId" component={SupplierDetails} onEnter={this.checkSession.bind(this)}/>
                        </Route>
                        <Route path="/dashboard/brands" component={Brands} onEnter={this.checkSession.bind(this)}/>
                        <Route path="/dashboard/products" component={Products} onEnter={this.checkSession.bind(this)}/>
                        <Route path="/dashboard/checkout" component={Checkout} onEnter={this.checkSession.bind(this)}/>
                        <Route path="/dashboard/report" component={Report} onEnter={this.checkSession.bind(this)}/>
                    </Route>
                </Route>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        ping: () => dispatch(ping())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(InventoryManagementRouter);

