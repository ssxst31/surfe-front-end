export default function UserSkeleton() {
  return (
    <div className="animate-pulse flex justify-between">
      <div className="flex">
        <div className="w-12 h-12 bg-gray-100 rounded-[50%] mr-2" />
        <div className="h-6 bg-gray-100 w-16 rounded-lg" />
      </div>
      <div className="bg-gray-100 w-20 rounded-lg h-8 px-4" />
    </div>
  );
}
