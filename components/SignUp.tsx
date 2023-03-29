import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useGeolocation from "hooks/useGeolocation";
import { createUser } from "pages/api/auth";

export default function Signup() {
  const location = useGeolocation();
  const router = useRouter();

  const [inputs, setInputs] = useState<any>({
    email: "",
    password: "",
    checkPassword: "",
    nickname: "",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    setInputs({ ...inputs, lat: location.coordinates?.lat, lng: location.coordinates?.lng });
  }, [location.loaded]);

  const { email, password, checkPassword, nickname, lat, lng } = inputs;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();

    const res = await createUser(inputs).catch((err) => {
      alert(err.response.data.message);
    });

    if (res) {
      if (confirm(res.message)) {
        router.push("/");
      }
    }
  };

  return (
    <div className="flex flex-col text-center">
      <img src="logo.png" width={96} height={96} className="mx-auto mb-2" />
      <div className="text-5xl">surfe</div>
      <div className="mb-5 text-sm">주위의 다양한 사람들과 채팅해보세요</div>
      <form className="flex flex-col items-center w-full space-y-4" onSubmit={submit}>
        <input
          placeholder="이메일"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={email}
          name="email"
          onChange={onChange}
          type="email"
        />
        <input
          placeholder="비밀번호"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={password}
          name="password"
          onChange={onChange}
          type="password"
        />
        <input
          placeholder="비밀번호 재확인"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={checkPassword}
          name="checkPassword"
          onChange={onChange}
          type="password"
        />
        <input
          placeholder="닉네임"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={nickname}
          name="nickname"
          onChange={onChange}
          type="text"
        />
        <input
          placeholder="위도"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={lat}
          name="lat"
          onChange={onChange}
          type="text"
        />
        <input
          placeholder="경도"
          className="px-2 py-3 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 w-96"
          value={lng}
          name="lng"
          onChange={onChange}
          type="text"
        />
        <button
          onClick={submit}
          className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 w-96"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
