import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Card.css';
import TopTabs from './components/TopTabs';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
    uri:'https://api.devcdc.com/cricket'
});

function App() {
  return (
   <ApolloProvider client={client}>
      <div className="flex w-100 flex-column pt5-l ">
      <div className="min-vh-100">
          <div className="ph3 ph7-l relative">
            <div className="pt3-ns pr0 pr3-ns">
              <div className="f3 db black-70 b pt3 pt0-ns pb2">
                Schedules
              </div>
              <div className="bg-white">
              <TopTabs/>
              </div>
               
            </div>
          </div>
      </div>
    </div>
   </ApolloProvider>
  );
}

export default App;
