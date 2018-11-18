import fetch from 'isomorphic-fetch';
import { API_URL } from '../../config';
import { getStats } from './dashboard';

const initialState = {
    list: [],
    supplierProducts: [],
    reports: []
};

const GET_SUPPLIERS = 'GET_SUPPLIERS';
const GET_SUPPLIER_PRODUCTS = 'GET_SUPPLIER_PRODUCTS';
const GET_REPORTS = 'GET_REPORTS';

export const getSuppliers = () => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
        fetch(`${API_URL}supplier`, fetchOptions)
        .then(response => {
            return response.json()
        })
        .then(response => {
            dispatch({ type: GET_SUPPLIERS, response })
        })
    }
}

export const createSupplier = (product, callback, errCallback) => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(product)
        }
        fetch(`${API_URL}supplier`, fetchOptions)
        .then(response => {
            if(response.status === 400) {
                errCallback();
            } else {
                dispatch(getSuppliers())
                callback()
            }
        })
    }
}

export const createSupplierProduct = (supplierProduct, callback) => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(supplierProduct)
        }
        fetch(`${API_URL}supplier/${supplierProduct.supplierId}/products`, fetchOptions)
        .then(response => {
            dispatch(getSupplierProducts(supplierProduct.supplierId))  
            callback()
        })
    }
}

export const getSupplierProducts = (supplierId) => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
        fetch(`${API_URL}supplier/${supplierId}/products`, fetchOptions)
        .then(response => {
            return response.json();
        })
        .then(response => {
            dispatch({ type: GET_SUPPLIER_PRODUCTS, response })
        })
    }
}

export const checkout = (supplierId, data, callback) => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(data)
        }
        fetch(`${API_URL}supplier/${supplierId}/products/checkout`, fetchOptions)
        .then(response => {
            callback();
            dispatch(getStats())
            dispatch(getSupplierProducts(supplierId))
        })
    }
}

export const updateQuantity = (supplierId, supplierProductId, data) => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(data)
        }
        fetch(`${API_URL}supplier/${supplierId}/products/${supplierProductId}`, fetchOptions)
        .then(response => {
            dispatch(getSupplierProducts(supplierId))
            dispatch(getStats())
        })
    }
}

export const getReports = (startDate, endDate) => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
        fetch(`${API_URL}supplier/report?startDate=${startDate}&endDate=${endDate}`, fetchOptions)
        .then(response => response.json())
        .then(response => {
            dispatch({ type: GET_REPORTS, response })
        })
    }
}



export function supplier(supplier = initialState, action) {
    switch(action.type) {
        case GET_SUPPLIERS:
            return Object.assign({}, supplier, { list: action.response })
        case GET_SUPPLIER_PRODUCTS: 
            return Object.assign({}, supplier, { supplierProducts: action.response })
        case GET_REPORTS:
            console.log(action)
            return Object.assign({}, supplier, { reports: action.response })
        default:
            return supplier;
    }
}