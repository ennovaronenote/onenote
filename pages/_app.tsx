/**
 * @packageDocumentation
 * @hidden
 */

import type { AppProps } from "next/app";
import "../styles/globals.css";
import NavbarContainer from "../components/Navbar/Container";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavbarContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
