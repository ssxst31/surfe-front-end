import React, { useEffect } from "react";
import { useRouter } from "next/router";

import useMe from "hooks/useMe";

export default function UnLoginWrapper({ children }: any) {
  const me = useMe();
  const router = useRouter();
  const currentPage = router.pathname;
  const notPublicPages = ["/", "signup"];
  const pageRootName = currentPage.slice(1).split("/")[0] || "/";

  const isPublicPage = notPublicPages.includes(pageRootName);

  useEffect(() => {
    if (me && isPublicPage) {
      window.location.href = "/userList";
    }
  }, [router]);

  if (me && isPublicPage) {
    return <div />;
  }

  return <>{children}</>;
}
