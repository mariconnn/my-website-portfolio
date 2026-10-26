import type { Metadata } from "next";
import "./globals.css";
import "./styles/opening.css";
import "./styles/feature.css";
import "./styles/credits.css";

export const metadata: Metadata = {
  title: "Maricon Landicho Pictures",
  description: "Maricon Landicho — Junior Web Developer portfolio, now showing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hide the intro leader before first paint for returning visitors (same browser session) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("intro-seen")==="1")document.documentElement.classList.add("intro-seen")}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`.op-intro{display:none}`}</style>
        </noscript>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Work+Sans:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
