import type { AppProps } from "next/app";
import { Layout } from "@/feature";
import "@/styles/index.css";

type CustomAppProps = {
  Component: AppProps["Component"] & {
    hiddenLayout?: boolean; // 是否隐藏layout
  };
  pageProps: AppProps["pageProps"];
};

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <>
      {Component.hiddenLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
};

export default MyApp;
