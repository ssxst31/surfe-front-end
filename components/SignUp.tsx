import { useState } from "react";

import { createUser } from "pages/api/auth";

const INTERESTS = [
  { id: 1, content: "운동" },
  { id: 2, content: "산책" },
  { id: 3, content: "노래" },
  { id: 4, content: "술" },
  { id: 5, content: "헬스" },
  { id: 6, content: "패션" },
  { id: 7, content: "영화" },
  { id: 8, content: "공부" },
  { id: 9, content: "연극" },
  { id: 10, content: "화장" },
  { id: 11, content: "전시회" },
  { id: 12, content: "맛집투어" },
  { id: 13, content: "보드게임" },
  { id: 14, content: "자기관리" },
];

export default function SignUp() {
  const [inputs, setInputs] = useState<any>({
    email: "",
    password: "",
    checkPassword: "",
    nickname: "",
  });
  const [interestList, setInterestList] = useState<any>([]);

  const { email, password, checkPassword, nickname } = inputs;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();

    const res = await createUser(inputs, interestList).catch((err) => {
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
      const interestListFiltered = interestList.filter((el: any) => el !== interest);
      setInterestList(interestListFiltered);
    } else {
      const newInterestList = interestList.concat(interest);
      setInterestList(newInterestList);
    }
  };

  return (
    <div className="mx-auto mt-24 w-96">
      <img src="logo.png" width={96} height={96} className="mx-auto mb-2" />
      <div className="flex flex-col">
        <h1>
          <div className="text-5xl text-center">surfe</div>
          <div className="mb-5 text-sm text-center">주위의 다양한 사람들과 채팅해보세요</div>
        </h1>
      </div>
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <h2>
            <label htmlFor="email" className="font-bold">
              이메일
            </label>
          </h2>
          <input
            placeholder="이메일"
            className="w-full px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 -sm:w-64 -sm:mx-auto"
            value={email}
            name="email"
            onChange={onChange}
            type="email"
            id="email"
          />
        </div>
        <div>
          <h2>
            <label htmlFor="password" className="font-bold">
              비밀번호
            </label>
          </h2>
          <input
            placeholder="비밀번호"
            className="w-full px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 -sm:w-64 -sm:mx-auto"
            value={password}
            name="password"
            onChange={onChange}
            type="password"
            id="password"
          />
        </div>
        <div>
          <h2>
            <label htmlFor="checkPassword" className="font-bold">
              비밀번호 재확인
            </label>
          </h2>
          <input
            placeholder="비밀번호 재확인"
            className="w-full px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 -sm:w-64 -sm:mx-auto"
            value={checkPassword}
            name="checkPassword"
            onChange={onChange}
            type="password"
            id="checkPassword"
          />
        </div>
        <div>
          <h2>
            <label htmlFor="nickname" className="font-bold">
              닉네임
            </label>
          </h2>
          <input
            placeholder="닉네임"
            className="w-full px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 -sm:w-64 -sm:mx-auto"
            value={nickname}
            name="nickname"
            onChange={onChange}
            type="text"
            id="nickname"
          />
        </div>
        <div>
          <h2>
            <label className="font-bold">관심사(3개선택)</label>
          </h2>
          <div className="flex flex-wrap w-96">
            {INTERESTS.map((interest) => (
              <div
                key={interest.id}
                className={`h-10 px-4 py-2 mt-2 mr-2 rounded-lg cursor-pointer  ${
                  interestList.includes(interest.content) ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-500"
                }`}
                onClick={() => {
                  interestHandler(interest.content);
                }}
              >
                {interest.content}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={submit}
          className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-96 -sm:w-64 -sm:mx-auto"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
