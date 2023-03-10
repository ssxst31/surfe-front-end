import "./globals.css";

export const metadata = {
  title: "채팅웹",
  description: "채팅을 위한 웹입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className=" max-w-4xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
