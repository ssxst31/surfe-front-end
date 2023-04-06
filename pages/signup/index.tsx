import type { NextPage } from "next";
import SignUp from "components/SignUp";

const SignUpPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
