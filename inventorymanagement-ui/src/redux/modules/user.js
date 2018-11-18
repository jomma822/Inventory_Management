import fetch from 'isomorphic-fetch';
import { API_URL } from '../../config';
import { hashHistory } from 'react-router';

const initialState = {
    user: ''
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const login = (user, errorCallback) => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(user)
        }
        fetch(`${API_URL}user/login`, fetchOptions)
        .then(response => {
            if(response.status == 401) {
                errorCallback()
            } else {
                dispatch({ type: LOGIN, username: user.username})
                hashHistory.push('/dashboard')
            }
        })
    }
}

export const logout = () => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
        fetch(`${API_URL}user/logout`, fetchOptions)
        .then(response => {
            hashHistory.push('/')
            dispatch({ type: LOGOUT });
        })
    }
}

export const ping = () => {
    return (dispatch, state) => {
        let fetchOptions = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
        fetch(`${API_URL}user/ping`, fetchOptions)
        .then(response => {
            console.log(response.status)
            if(response.status == 401) {
                hashHistory.push('/')
            }
            return response.json();
        })
        .then(response => {
            console.log(response)
                dispatch({ type: LOGIN, username: response.username })
            }
        )
    }
}

export function user(user = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                user: action.username
            }
        case LOGOUT:
            return {
                user: ''
            }
        default:
            return user;
    }
}