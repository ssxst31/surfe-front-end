export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-[url('/123.png')] bg-no-repeat bg-cover max-h-screen w-screen"
      style={{
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
}
