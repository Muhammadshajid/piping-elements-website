import "./globals.css";

export const metadata = {
  title: {
    default: "Piping Elements | EPC Advisory & Supply Chain Experts",
    template: "%s | Piping Elements",
  },
  description:
    "Piping Elements specializes in EPC advisory, supply chain consulting, and senior expertise for oil & gas and energy developments.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Piping Elements",
    description:
      "EPC advisory, supply chain consulting, and expert engineering services.",
    url: "https://pipingelements.com",
    siteName: "Piping Elements",
    images: [
      {
        url: "https://pipingelements.com/favicon.ico",
        width: 512,
        height: 512,
        alt: "Piping Elements Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Organization schema for Google logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Piping Elements",
              url: "https://pipingelements.com",
              logo: "https://pipingelements.com/favicon.ico",
            }),
          }}
        />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  );
}

