import type { NextPage } from "next";

const UserPage: NextPage = () => {
  return (
    <div>
      <div className="flex -sm:flex-col ">
        <img
          src="https://i.pinimg.com/236x/70/be/b2/70beb2f42ae1c4cfe7a32ec61a93c2f5.jpg"
          className="mr-2 shadow-2xl w-96 h-96 -sm:w-full"
          alt="profile"
        />
        <div className="flex flex-col p-3">
          <div className="text-3xl">짱구</div>
          <div className="text-2xl">ISTJ</div>
          <div className="flex mt-2 space-x-2">
            {["축구", "야구", "배구"].map((el) => (
              <div className="px-2 py-1 text-white bg-red-200 rounded-lg">{el}</div>
            ))}
          </div>
          <div className="mt-2">안녕하세요 잘부탁드립니다람쥐~~</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
