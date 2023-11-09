import React from "react";
import { ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import client from "./components/app/utils/apollo.jsx";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./components/redux-store/store.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
