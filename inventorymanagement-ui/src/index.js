import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import InventoryManagementRouter from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <InventoryManagementRouter />
  </Provider>,
  document.getElementById('inventory')
)