export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${1}`, { cache: "no-store" });
  const data = (await res.json()) as { title: string; body: string };
  console.log(data);
  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      d
      <div className="space-y-3 col-span-full lg:col-span-4">
        <h1 className="text-2xl font-medium text-gray-200 capitalize truncate">{data.title}</h1>
        <p className="font-medium text-gray-500">{data.body}</p>
      </div>
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2"></div>
    </div>
  );
}
