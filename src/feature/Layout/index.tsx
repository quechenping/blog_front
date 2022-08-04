import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="mx-auto mt-16 lg:max-w-4xl md:max-w-3xl">{children}</div>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
