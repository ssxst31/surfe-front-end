import React from "react";

import Desktop from "components/layouts/Desktop";

interface DefaultLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return <Desktop>{children}</Desktop>;
}
