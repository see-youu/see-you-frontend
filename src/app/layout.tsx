import type { Metadata } from "next";
import { Inter, Gaegu } from "next/font/google";
import "../styles/reset.css";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Providers } from "./providers";
import Script from "next/script";
import dynamic from "next/dynamic";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });
const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-gaegu",
});

export const metadata: Metadata = {
  title: "SeeYou",
  description: "SeeYou",
  applicationName: "SeeYou",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SeeYou",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#000000",
  twitter: {
    card: "summary",
    site: "",
    title: "SeeYou",
    description: "SeeYou",
    images: "",
  },
  openGraph: {
    type: "website",
    siteName: "SeeYou",
    title: "SeeYou",
    description: "SeeYou",
    url: "",
    images: "",
  },
  icons: {},
  keywords: ["SeeYou"],
};

const ModalsContainer = dynamic(
  () => import("@/components/modal/ModalsContainer"),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=wn6b2vfwot`}
      />
      <body className={`${inter.className} ${gaegu.variable}`}>
        <Providers>
          {children}
          <ModalsContainer />
        </Providers>
      </body>
    </html>
  );
}
