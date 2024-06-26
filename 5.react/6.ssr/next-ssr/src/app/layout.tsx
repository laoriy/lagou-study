// app/layout.tsx
import { Providers } from "./providers";
import "./globals.scss";

export const metadata = {
  title: "Laor Movie",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
