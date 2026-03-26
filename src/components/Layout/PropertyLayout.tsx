"use client";
import { ReactNode } from "react";
import propertyBg from "../../../public/assets/img/rent/property-bg.jpg";
import PropertyFilterWidget from "./subComponents/PropertyFilterWidget";
import SidebarPropertyItem from "./subComponents/SidebarPropertyItem";
import DiscountOfferCard from "./subComponents/DiscountOfferCard";
import SearchRefineBar from "@/components/RealEstate/PropertyStyleOne/SearchRefineBar";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export default function PropertyLayout({ children }: { children: ReactNode }) {
  const params = useSearchParams();

  // New params used by SearchRefineBar
  const q = params.get("q") || "";
  const type = params.get("type") || "";
  const city = params.get("city") || "";

  // Build a human-readable subtitle
  const subtitleParts: string[] = [];
  if (type) subtitleParts.push(type);
  if (city) subtitleParts.push(city);
  if (q) subtitleParts.push(`"${q}"`);
  const subtitle = subtitleParts.length
    ? subtitleParts.join(" · ")
    : "all locations";

  return (
    <>
      <section
        className="tp-property-ptb pt-20 pb-120"
        style={{ backgroundImage: `url(${propertyBg.src})` }}
      >
        <div className="container">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Search" }]}
          />
          <div className="row align-items-center gsrch">
            <div className="col-lg-12 padLR0">
              <div className="tp-property-heading mb-10 mlb">
                <div className="tp-property-list">
                  <span style={{ color: "#000" }}>
                    Property search{" "}
                    {subtitle !== "all locations" && (
                      <>
                        for{" "}
                        <span style={{ color: "#5758d6" }}>{subtitle}</span>
                      </>
                    )}
                    {subtitle === "all locations" && (
                      <span style={{ color: "#5758d6" }}>all locations</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Refine / Search Bar */}
              <SearchRefineBar />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="tp-property-list-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <PropertyFilterWidget />
              <SidebarPropertyItem />
              <DiscountOfferCard />
            </div>
            <div className="col-lg-9">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
