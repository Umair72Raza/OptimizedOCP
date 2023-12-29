import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../src/App.css'
import  store  from './components/Store/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
    
  </React.StrictMode>,
)
