import type { NextPage } from "next";
import SignUp from "components/SignUp";

interface SignUpPageProps {
  token: string;
}

const SignUpPage: NextPage<SignUpPageProps> = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
