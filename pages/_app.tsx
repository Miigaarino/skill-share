import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { Topbar } from "components";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Topbar />
        <Toaster />
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
