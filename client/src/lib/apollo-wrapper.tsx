"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  // Get the token from local storage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Add the authorization header to the request
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
