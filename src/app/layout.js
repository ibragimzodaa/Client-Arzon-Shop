import Header from "@/components/header/header";
import "./globals.css";
import Footer from "@/components/footer/footer";
import { useLoginRegister } from "@/store/login";

export const metadata = {
  title: "Arzonshop - онлайн магазин",
  description: "Arzonshop was created by Ibragimov Usmon",
};



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
