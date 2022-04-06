import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import client from './apollo'
import 'antd/dist/antd.css'

import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
        <App />
     </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);