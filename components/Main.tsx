import Total from "components/NonMain";
import Main2 from "components/Main2";

export default function Main({ profile }: any) {
  return 0 ? (
    <div>
      {`${profile.nickname}(${profile.email})님 안녕하세요`}
      <Main2 profile={profile} />
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <Total />
    </div>
  );
}
