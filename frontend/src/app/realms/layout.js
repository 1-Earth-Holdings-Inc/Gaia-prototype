import { Geist, Geist_Mono, Playfair_Display, MedievalSharp, UnifrakturMaguntia, UnifrakturCook } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/shared/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-gaia-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const medievalSharp = MedievalSharp({
  variable: "--font-medieval",
  subsets: ["latin"],
  weight: ["400"],
});

const unifrakturMaguntia = UnifrakturMaguntia({
  variable: "--font-unifraktur-maguntia",
  subsets: ["latin"],
  weight: ["400"],
});

const unifrakturCook = UnifrakturCook({
  variable: "--font-unifraktur-cook",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata = {
  title: "Gaia - Realms Map",
  description: "WWF Terrestrial Biogeographic Realms - Environmental Stewardship and Sustainable Action",
  icons: {
    icon: '/planet-earth.png',
    shortcut: '/planet-earth.png',
    apple: '/planet-earth.png',
  },
};

export default function RealmsLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/planet-earth.png" type="image/png" />
        <link rel="shortcut icon" href="/planet-earth.png" type="image/png" />
        <link rel="apple-touch-icon" href="/planet-earth.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${medievalSharp.variable} ${unifrakturMaguntia.variable} ${unifrakturCook.variable} antialiased bg-[radial-gradient(1200px_600px_at_50%_-100px,rgba(56,189,248,0.15),transparent),radial-gradient(1000px_500px_at_10%_0px,rgba(16,185,129,0.10),transparent)]`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
