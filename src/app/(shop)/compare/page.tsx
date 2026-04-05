import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import CompareArea from "@/components/shop/CompareArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landed property Malaysia",
  description: "KL Property Listings – Buy & Rent Homes in Kuala Lumpur",
};

export default function Compare() {
  return (
    <main>
      {/* -- Breadcrumb start -- */}
      <BreadcrumbArea title="Compare" />
      {/* -- Breadcrumb end -- */}

      {/* -- Compare Area start -- */}
      <CompareArea />
      {/* -- Compare Area end -- */}
    </main>
  );
}
