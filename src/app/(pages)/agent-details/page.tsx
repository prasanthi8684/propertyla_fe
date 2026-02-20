import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Details - Property-La Real Estate React NextJs Template",
};

export default async function AgentDetails() {
  return (
    <main>
      <>
        {/* breadcrumb area */}
        <BreadcrumbArea title="Agent Details" />
        {/* breadcrumb area end */}
      </>
    </main>
  );
}
