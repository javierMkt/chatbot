import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'
import { Provider } from 'react-redux';
import store from './store/store.js';

const firebaseConfig = {
  apiKey: "AIzaSyC77vnCOKB5ldTfIzxbNOi5w94_80NRYFc",
  databaseURL: "",
  authDomain: "zly-chat.firebaseapp.com",
  projectId: "zly-chat",
  storageBucket: "zly-chat.appspot.com",
  messagingSenderId: "490589673528",
  appId: "1:490589673528:web:fb1afc211c68df67bd2ecd",
  measurementId: ""
};

firebase.initializeApp(firebaseConfig);

declare global {
  interface Window {
    store?: any;
  }
}
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
