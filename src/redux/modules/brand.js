import fetch from 'isomorphic-fetch';
import { API_URL } from '../../config';

const initialState = {
    list: []
};

const GET_BRANDS = 'GET_BRANDS';

export const getBrands = () => {
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
        fetch(`${API_URL}brand`, fetchOptions)
        .then(response => {
            return response.json()
        })
        .then(response => {
            dispatch({ type: GET_BRANDS, response })
        })
    }
}

export const createBrand = (brand, callback, errCallback) => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(brand)
        }
        fetch(`${API_URL}brand`, fetchOptions)
        .then(response => {
            if(response.status === 400) {
                errCallback();
            } else {
                callback()
                dispatch(getBrands())
            }
        })
    }
}
export function brand(brand = initialState, action) {
    switch(action.type) {
        case GET_BRANDS:
            return {
                list: action.response
            }
        default:
            return brand;
    }
}