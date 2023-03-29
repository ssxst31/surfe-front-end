import React from "react";
import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";

interface ResponsiveContainerProps {
  children: JSX.Element | JSX.Element[];
}

export default function ResponsiveContainer({ children }: ResponsiveContainerProps) {
  return (
    <div>
      <Header />
      <div className="w-full h-24" />
      <div className="max-w-4xl mx-auto">{children}</div>
      <Footer />
    </div>
  );
}
