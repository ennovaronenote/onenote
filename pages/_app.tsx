/**
 * @packageDocumentation
 * @hidden
 */

import type { AppProps } from "next/app";
import Head from "next/head";
import NavbarContainer from "../components/Navbar/Container";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OneNote Project</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <NavbarContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
