import { Epilogue, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Bottom Frag's Skin Fund",
  description: "Help me whiff in style.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-val-dark text-val-light overflow-x-hidden selection:bg-val-red selection:text-white">
        <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-20"></div>
        {children}
      </body>
    </html>
  );
}
