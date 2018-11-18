import { combineReducers } from 'redux';
import { supplier } from './supplier';
import { brand } from './brand';
import { product } from './product';
import { dashboard } from './dashboard';
import { user } from './user';

export * from './supplier';
export * from './brand';
export * from './product';
export * from './dashboard';
export * from './user'

const appReducer = combineReducers({
    supplier,
    brand,
    product,
    dashboard,
    user
})

const reducer = (state, action) => {
    if(action.type === 'CLEAR_REDUX_DATA') {
        state = {};
    }
    return appReducer(state, action);
}

export default reducer;