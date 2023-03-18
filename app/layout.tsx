import RecoilProvider from "app/RecoilProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <RecoilProvider>
          <div className="max-w-4xl mx-auto ">{children}</div>
        </RecoilProvider>
      </body>
    </html>
  );
}
