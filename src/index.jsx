import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase/app';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyDIRK1lcVM_SRov9SHYVkBLLkrUQm5DTe8',
  authDomain: 'euroviisutus.firebaseapp.com',
  databaseURL: 'https://euroviisutus.firebaseio.com',
  projectId: 'euroviisutus',
  storageBucket: 'euroviisutus.appspot.com',
  messagingSenderId: '535056031434',
  appId: '1:535056031434:web:acbe1686d1028bf9155e33',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();