import { Geist, Geist_Mono } from "next/font/google";
import 'react-csv-importer/dist/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EffiPay",
  description: "Send muitlple payments in one transcation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
     
       
        {children}
      </body>
    </html>
  );
}
