import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import baseurl from "../../../base";

const httpLink = createHttpLink({
  uri: `${baseurl}/fit/graphql`,
  headers: {
    Authorization: `JWT ${localStorage.getItem('token')}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
