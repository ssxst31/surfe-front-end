import Logo from "components/common/Logo";

interface SignUpFirstProps {
  action: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputs: {
    id: string;
    password: string;
    checkPassword: string;
  };
}

export default function SignUpFirst({ action, onChange, inputs }: SignUpFirstProps) {
  const { id, password, checkPassword } = inputs;

  const isActiveNext = id && password && checkPassword;

  return (
    <div className=" h-screen bg-gradient-to-t from-blue-500 to-indigo-500">
      <div className="flex flex-col items-center mx-3 text-center">
        <div className="flex flex-col">
          <h1>
            <div className="relative h-20 w-52">
              <Logo className="text-white text-[50px]" />
            </div>
            <div className="mb-5 text-sm text-center text-white">근처의 다양한 사람들과 채팅해보세요</div>
          </h1>
        </div>
        <form
          className="flex flex-col space-y-10 -sm:w-full text-left mt-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="-sm:w-full relative group">
            <input
              name="id"
              onChange={onChange}
              type="text"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={id}
              id="id"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              아이디
            </label>
            {id && (
              <ul className="text-xs mt-1">
                <li>· 최소 5자, 최대 12자까지 가능해요</li>
                <li>· 영문 대소문자와 숫자만 가능합니다.</li>
              </ul>
            )}
          </div>
          <div className="-sm:w-full relative group">
            <input
              name="password"
              onChange={onChange}
              type="password"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={password}
              id="password"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              비밀번호
            </label>
            {password && (
              <ul className="text-xs mt-1">
                <li>· 최소 8자, 최대 16자까지 가능해요</li>
                <li>· 영문 대소문자,숫자, 특수문자를 사용해주세요</li>
              </ul>
            )}
          </div>
          <div className="-sm:w-full relative group">
            <input
              name="checkPassword"
              onChange={onChange}
              type="password"
              required
              className="w-full h-10 px-4 text-sm peer outline-none bg-transparent border-0 border-b border-white"
              value={checkPassword}
              id="checkPassword"
            />
            <label
              htmlFor="username"
              className="text-white transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
            >
              비밀번호 재확인
            </label>
          </div>
          <button
            onClick={action}
            type="submit"
            className={`${
              !isActiveNext && "opacity-40"
            } text-white border-white border border-solid font-medium rounded-lg text-sm px-5 py-2.5 w-96 -sm:w-full -sm:mx-auto`}
            disabled={!isActiveNext}
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
