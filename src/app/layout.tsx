import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { Header } from "@/components/Header";
import { ClientLayout } from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Little Moments | 童画记 - Preserve Your Child's Precious Memories",
  description: "This is not about NFTs. It's about preserving emotions. Create lasting memories of your child's artwork on the Solana blockchain.",
  keywords: ["solana", "nft", "memories", "children", "artwork", "blockchain", "parenting"],
  openGraph: {
    title: "Little Moments | 童画记",
    description: "Preserve your child's precious memories forever on the blockchain",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${inter.variable} ${nunito.variable} font-body`}>
        <WalletContextProvider>
          <I18nProvider>
            <Header />
            <main className="pt-16 min-h-screen">
              <ClientLayout>
                {children}
              </ClientLayout>
            </main>
            <footer className="bg-warm-100 py-8 mt-16">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-primary-600 text-sm">
                  Built with 💝 for the Solana Hackathon 2026
                </p>
              </div>
            </footer>
          </I18nProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
