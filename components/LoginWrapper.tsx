import React, { useEffect } from "react";
import { useRouter } from "next/router";

import useMe from "hooks/useMe";

export default function LoginWrapper({ children }: any) {
  const me = useMe();
  const router = useRouter();
  const currentPage = router.pathname;
  const notPublicPages = ["everyChat", "private"];
  const pageRootName = currentPage.slice(1).split("/")[0];
  const isPublicPage = !notPublicPages.includes(pageRootName);

  useEffect(() => {
    if (!me && isPublicPage) {
      router.push("/");
    }
  }, []);

  if (!isPublicPage && !me) {
    return <div />;
  }

  return <>{children}</>;
}
