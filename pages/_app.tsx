/**
 * @packageDocumentation
 * @hidden
 */

import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import NavbarContainer from "../components/Navbar/Container";
import PageTitle from "../components/PageTitle";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Head>
            <title>OneNote Project</title>
            <link rel="shortcut icon" href="/favicon.png" />
          </Head>
          <NavbarContainer />

          <PageTitle title="Please wait while we load your data" />
        </>
      ) : (
        <>
          <Head>
            <title>OneNote Project</title>
            <link rel="shortcut icon" href="/favicon.png" />
          </Head>
          <NavbarContainer />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default MyApp;
