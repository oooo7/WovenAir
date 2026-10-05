import { Suspense } from "react";
import { CommerceProvider } from "@/lib/commerce";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Sarees · Catalogue Archive",
  description:
    "Explore handwoven Indian sarees: Chanderi, Kanjeevaram, Jamdani, Ikat, Maheshwari, Kota, Banarasi, and Linen.",
};

export default async function ShopPage() {
  const products = await CommerceProvider.getProducts();

  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-[#666158] font-serif text-[20px]">
          Opening the textile archive...
        </div>
      }
    >
      <ShopClient initialProducts={products} />
    </Suspense>
  );
}
