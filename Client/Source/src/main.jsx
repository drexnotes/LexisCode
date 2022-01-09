import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import LandingJK from './Landing JK'
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <LandingJK />
    </React.StrictMode></Provider>,
  document.getElementById('root')
)
