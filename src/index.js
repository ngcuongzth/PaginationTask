import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import GlobalProvider from './store/GlobalContext';
// react version 17
// ReactDOM.render(
//   <GlobalProvider>
//     <App />
//   </GlobalProvider>,
//   document.getElementById('root')
// );

const container = document.getElementById("root")

// create a root 
const root = ReactDOM.createRoot(container);

// render app to root 
root.render(
    <GlobalProvider>
        <App />
    </GlobalProvider>
)