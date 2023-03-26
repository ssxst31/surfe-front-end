import localFont from "next/font/local";

import RecoilProvider from "app/RecoilProvider";
import "./globals.css";

const myFont = localFont({ src: "./NanumSquareR.woff2" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`bg-[#97DEFF] ${myFont.className}`}>
        <RecoilProvider>
          <div className="max-w-4xl mx-auto ">{children}</div>
        </RecoilProvider>
      </body>
    </html>
  );
}
