import React from "react";
import { DefaultSeo } from "next-seo";

const DefaultSEO = () => {
  return (
    <DefaultSeo
      title="서피"
      description="서피에서 주위의 다양한 사람들과 소통해 보세요."
      openGraph={{
        type: "website",
        title: "서피",
        description: "서피에서 주위의 다양한 사람들과 소통해 보세요.",
        siteName: "서피",
      }}
      twitter={{
        site: "서피",
        cardType: "summary",
      }}
    />
  );
};

export default DefaultSEO;
