import "../styles/globals.scss";
import type { AppProps } from "next/app";

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
};

export default MyApp;
