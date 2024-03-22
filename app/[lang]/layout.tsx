import { i18n, type Locale } from "../../i18n-config";
import Navbar from "./components/navbar";
import "./globals.css";

export const metadata = {
  title: "i18n app",
  description: "How to do i18n in Next.js 13 within app directory",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body>
        <Navbar lang={params.lang} />
        {children}
      </body>
    </html>
  );
}
