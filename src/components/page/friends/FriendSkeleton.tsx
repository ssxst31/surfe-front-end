export default function FriendSkeleton() {
  return (
    <div className="animate-pulse flex justify-between py-3">
      <div className="flex">
        <div className="w-14 h-14 bg-gray-100 rounded-[50%] mr-2" />
        <div className="h-6 bg-gray-100 w-32 rounded-lg" />
      </div>
      <div className="bg-gray-100 w-20 rounded-lg h-8 px-4" />
    </div>
  );
}
