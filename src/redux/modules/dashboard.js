import fetch from 'isomorphic-fetch';
import { API_URL } from '../../config';

const initialState = {
    stats: {}
};

const GET_STATS = 'GET_STATS';

export const getStats = () => {
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
        fetch(`${API_URL}dashboard/stats`, fetchOptions)
        .then(response => {
            return response.json()
        })
        .then(response => {
            dispatch({ type: GET_STATS, response })
        })
    }
}

export function dashboard(dashboard = initialState, action) {
    switch(action.type) {
        case GET_STATS:
            return {
                stats: action.response
            }
        default:
            return dashboard;
    }
}