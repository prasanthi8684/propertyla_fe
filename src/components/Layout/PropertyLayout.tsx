"use client";
import { ReactNode, useState } from "react";
import propertyBg from "../../../public/assets/img/rent/property-bg.jpg";
import PropertyFilterWidget from "./subComponents/PropertyFilterWidget";
import SidebarPropertyItem from "./subComponents/SidebarPropertyItem";
import DiscountOfferCard from "./subComponents/DiscountOfferCard";
import { propertyStates } from "@/data/dropdownData";
import NiceSelect from "../UI/NiceSelect";
import PlaceSearch from "../../components/HeroBanner/subComponents/PlaceSearch";
import { useSearchParams } from "next/navigation";

export default function PropertyLayout({ children }: { children: ReactNode }) {
  const params = useSearchParams();
  console.log("params", params);
  const address = params.get("address") || "";
  const type = params.get("type");
  const selectedCity = params.get("city");
  let defaultCity: number = 0;
  if (selectedCity === "Selangor") {
    defaultCity = 1;
  } else if (selectedCity === "Kuala Lumpur") {
    defaultCity = 2;
  } else if (selectedCity === "Johor") {
    defaultCity = 3;
  }
  const handleSorting = () => {};

  const [place, setPlace] = useState<string>("");
  const getProperties = () => {
    if (!place.trim()) {
      alert("Please enter a location before searching.");
      return;
    }
    //call get list API and update the list
    console.log("updated place ", place);
  };

  const handleSelect = (selected: string) => {
    setPlace(selected);
  };
  return (
    <>
      <section
        className="tp-property-ptb pt-35 pb-120"
        style={{ backgroundImage: `url(${propertyBg.src})` }}
      >
        <div className="container">
          <div className="row align-items-center gsrch">
            <div className="col-lg-12">
              <div className="tp-property-heading mb-30">
                <div className="tp-property-list">
                  <span style={{ color: "#000" }}>
                    <span style={{ color: "#E9455BC7" }}>5</span> results |
                    Property for{" "}
                    <span style={{ color: "#E9455BC7" }}>{type}</span> in{" "}
                    {address?.substring(0, 100)}..
                  </span>
                </div>
              </div>
              <div className="row" style={{ width: "100%" }}>
                <div className="col-xs-12 col-xl-3 col-lg-3">
                  <div className="tp-hero-tab-select tp-select">
                    <NiceSelect
                      options={propertyStates}
                      defaultCurrent={defaultCity}
                      onChange={handleSorting}
                      name="Sorting"
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-xl-7 col-lg-7 marTop20">
                  <div className="tp-hero-tab-input p-relative">
                    <PlaceSearch
                      onSelect={handleSelect}
                      placeholder="Search location or property name"
                      defaultValue={address}
                    />
                  </div>
                </div>
                <div
                  className="col-xs-6 col-xl-2 col-lg-2"
                  style={{ paddingRight: "0px" }}
                >
                  <div className="tp-hero-tab-search">
                    <button
                      style={{ width: "100%" }}
                      onClick={() => getProperties()}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              {/* Main content section */}
              {children}
            </div>
            <div className="col-lg-4">
              <PropertyFilterWidget />
              <SidebarPropertyItem customClass="tp-team-details-item" />
              <DiscountOfferCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
