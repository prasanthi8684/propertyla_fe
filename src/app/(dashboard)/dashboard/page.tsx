import DashboardInsights from "./components/DashboardInsights";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCardGrid from "./components/StatsCardGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Rent in Malaysia | Condos, Apartments & Houses",
  description:
    "Explore properties for rent in Malaysia including condos, apartments and landed houses. Find rental homes in Kuala Lumpur, Selangor, Penang and other cities.",
};

export default function Dashboard() {
  return (
    <>
      <DashboardLayout>
        <StatsCardGrid />
        <DashboardInsights />
      </DashboardLayout>
    </>
  );
}
