import React, { useState } from "react";

import { MBTIS } from "consts";
import { createUser } from "pages/api/auth";

import SignUpFirst from "components/page/signup/SignUpFirst";
import SignUpSecond from "components/page/signup/SignUpSecond";
import {
  isIdValid,
  isPasswordValid,
  arePasswordsMatched,
  isNicknameValid,
  isInterestListValid,
} from "components/page/signup/utils/inputValid";

type PageIndex = "first" | "second";

export default function SignUp() {
  const [pageIndex, setPageIndex] = useState<PageIndex>("first");
  const [mbti, setMbti] = useState(MBTIS[0].content);
  const [statusMessage, setStatusMessage] = useState("");
  const [interestList, setInterestList] = useState<string[]>([]);
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
    checkPassword: "",
    nickname: "",
  });

  const { id, password, checkPassword, nickname } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    if (!isNicknameValid(nickname)) return alert("닉네임 형식이 잘못되었습니다.");
    if (!isInterestListValid(interestList.length)) return alert("관심사는 3개를 입력해야합니다.");

    const res = await createUser(inputs, interestList, mbti, statusMessage).catch((err) => {
      alert(err.response.data.message);
    });

    if (res) {
      if (process.env.NEXT_PUBLIC_ENV === "development") {
        window.location.assign(`http://localhost:3000/completed/signup`);
      } else {
        window.location.assign(`https://www.surfe.store/completed/signup`);
      }
    }
  };

  const interestHandler = (interest: string) => {
    if (interestList.length >= 3 && !interestList.includes(interest)) return alert("최대 3개 까지만 선택가능합니다.");

    if (interestList.includes(interest)) {
      const interestListFiltered = interestList.filter((el) => el !== interest);
      setInterestList(interestListFiltered);
    } else {
      const newInterestList = interestList.concat(interest);
      setInterestList(newInterestList);
    }
  };

  const firstAction = () => {
    if (!isIdValid(id)) return alert("아이디 형식을 확인해주세요");
    if (!isPasswordValid(password)) return alert("비밀번호 형식을 확인해주세요");
    if (!arePasswordsMatched(password, checkPassword)) return alert("비밀번호가 서로 틀립니다.");

    setPageIndex("second");
  };

  const signUpPageList: Record<PageIndex, JSX.Element> = {
    first: <SignUpFirst action={firstAction} onChange={onChange} inputs={inputs} />,
    second: (
      <SignUpSecond
        interestHandler={interestHandler}
        action={submit}
        onChange={onChange}
        inputs={inputs}
        mbti={mbti}
        statusMessage={statusMessage}
        interestList={interestList}
        setMbti={setMbti}
        setStatusMessage={setStatusMessage}
      />
    ),
  };

  return <div>{signUpPageList[pageIndex]}</div>;
}
