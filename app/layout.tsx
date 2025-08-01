import { Nunito, Arsenal } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import type { Metadata } from "next";

const nunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const arsenal = Arsenal({
  variable: "--font-arsenal-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pi Platform",
  description: "Advanced analytics and payment processing platform",
  icons: {
    icon: "/Pi.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${arsenal.variable} antialiased overflow-x-hidden`}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
