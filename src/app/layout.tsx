import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/product/QuickViewModal";
import WhatsAppFloating from "@/components/ui/WhatsAppFloating";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WOVENAIR · Woven Stories. Made for Now.",
    template: "%s · WOVENAIR",
  },
  description:
    "A contemporary Indian textile house creating sarees that carry traditional craft into modern wardrobes. Woven stories. Made for now.",
  keywords: [
    "WOVENAIR",
    "contemporary Indian sarees",
    "handwoven sarees",
    "Chanderi silk",
    "Jamdani saree",
    "Kanjeevaram",
    "Tussar silk",
    "handloom sarees",
    "Indian textile house",
  ],
  openGraph: {
    title: "WOVENAIR · Contemporary Indian Textile House",
    description: "Sarees carrying traditional craft into modern wardrobes.",
    url: "https://wovenair.com",
    siteName: "WOVENAIR",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-ivory text-ink selection:bg-sand/60">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
