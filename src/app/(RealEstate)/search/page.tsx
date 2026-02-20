import PropertyLayout from "@/components/Layout/PropertyLayout";
import PropertyListing from "@/components/RealEstate/PropertyStyleOne/PropertyListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Style 1 - Property-La Real Estate React NextJs Template",
};

export default function PropertyOne() {
  return (
    <>
      {/* property area start */}
      <PropertyLayout>
        <PropertyListing />
      </PropertyLayout>
      {/* property area end */}
    </>
  );
}
