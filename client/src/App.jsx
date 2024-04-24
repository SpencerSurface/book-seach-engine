import './App.css';
import { Outlet } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from './components/Navbar';

// create the API endpoint
const httpLink = createHttpLink({
  uri: "/graphql"
});

// create the middleware to attach tokens to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

// create the Apollo client component
const client = new ApolloClient({
  // run the middleware then make the request to the API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
