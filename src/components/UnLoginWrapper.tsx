import React, { useEffect } from "react";
import { useRouter } from "next/router";

import useMe from "hooks/useMe";

interface UnLoginWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export default function UnLoginWrapper({ children }: UnLoginWrapperProps) {
  const me = useMe();
  const router = useRouter();
  const currentPage = router.pathname;
  const notPublicPages = ["/", "signup"];
  const pageRootName = currentPage.slice(1).split("/")[0] || "/";

  const isPublicPage = notPublicPages.includes(pageRootName);

  useEffect(() => {
    if (me && isPublicPage) {
      router.push("/userList");
    }
  }, [router]);

  if (me && isPublicPage) {
    return <div />;
  }

  return <>{children}</>;
}
