
//nullable->true/false,default=?,comment=?
//int/smallint->unsigned->true/false,identity->true/false
//timestamp ->on_update->true/false, default->CURRENT_TIMESTAMP
//varchar/char/varbinary ->length->255
//decimal ->scale->4, precision->12
//
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
