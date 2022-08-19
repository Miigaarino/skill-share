import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { Topbar } from "components";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Topbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
