import { cookies } from "next/headers";

import Total from "app/components/NonMain";
import Main from "app/components/Main";
import { fetchProfile } from "app/api/user";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const res = await fetchProfile(token).catch((error) => {
    return null;
  });

  return res ? (
    <div>
      {`${res.data.nickname}(${res.data.email})님 안녕하세요`}
      <Main profile={res.data} />
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <Total />
    </div>
  );
}
