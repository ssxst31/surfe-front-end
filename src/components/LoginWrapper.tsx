import React, { useEffect } from "react";
import { useRouter } from "next/router";

import useMe from "hooks/useMe";

interface LoginWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export default function LoginWrapper({ children }: LoginWrapperProps) {
  const me = useMe();
  const router = useRouter();
  const currentPage = router.pathname;
  const notPublicPages = ["everyChat", "privateChat", "userList"];
  const pageRootName = currentPage.slice(1).split("/")[0];
  const isPublicPage = !notPublicPages.includes(pageRootName);

  useEffect(() => {
    if (!me && !isPublicPage) {
      router.push("/");
    }
  }, [router]);

  if (!isPublicPage && !me) {
    return <div />;
  }

  return <>{children}</>;
}
