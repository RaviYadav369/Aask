/* eslint-disable camelcase */
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./globals.css";
import "../styles/prism.css";
import { Inter, Space_Grotesk } from "next/font/google";

import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ToasterProvider } from "@/context/toaster-provider";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotext = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotext",
});

export const metadata: Metadata = {
  title: "Aask",
  description: "Aask is a platform for asking questions and getting answers",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotext.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>
            <ToasterProvider />
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
