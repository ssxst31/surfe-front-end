import type { NextPage } from "next";
import Explore from "components/page/explore/Explore";
import DefaultLayout from "components/layouts/DefaultLayout";

const ExplorePage: NextPage = () => {
  return (
    <DefaultLayout>
      <Explore />
    </DefaultLayout>
  );
};

export default ExplorePage;
