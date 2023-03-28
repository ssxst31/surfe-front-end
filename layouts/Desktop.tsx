import React from "react";

interface ResponsiveContainerProps {
  children: JSX.Element | JSX.Element[];
}

export default function ResponsiveContainer({ children }: ResponsiveContainerProps) {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div>헤더</div>
        {children}
      </div>
      <div>푸터</div>
    </>
  );
}
