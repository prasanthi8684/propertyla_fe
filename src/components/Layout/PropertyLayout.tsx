"use client";
import { ReactNode, useState, useRef, useEffect } from "react";
import propertyBg from "../../../public/assets/img/rent/property-bg.jpg";
import PropertyFilterWidget from "./subComponents/PropertyFilterWidget";
import SidebarPropertyItem from "./subComponents/SidebarPropertyItem";
import DiscountOfferCard from "./subComponents/DiscountOfferCard";
import { propertyStates } from "@/data/dropdownData";
import NiceSelect from "../UI/NiceSelect";
import PlaceSearch from "../../components/HeroBanner/subComponents/PlaceSearch";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

type SearchItem = {
  objectId: string;
  objectType: "PROPERTY" | "AREA";
  displayText: string;
  displayType: string;
  displayDescription: string;
};

const MOCK_RESULTS: SearchItem[] = [
  {
    objectId: "21794",
    objectType: "PROPERTY",
    displayText: "Palma",
    displayType: "Apartment",
    displayDescription: "Jalan Desa Ria, Bandar Country Homes 48000, Selangor",
  },
  {
    objectId: "1239",
    objectType: "PROPERTY",
    displayText: "Palm Spring @ Damansara",
    displayType: "Condominium",
    displayDescription: "1 Jalan PJU 3/29 41050, Selangor",
  },
  {
    objectId: "9egrz",
    objectType: "AREA",
    displayText: "Palm Beach Villas",
    displayType: "Township",
    displayDescription: "Papar, Sabah",
  },
];

export default function PropertyLayout({ children }: { children: ReactNode }) {
  const params = useSearchParams();
  console.log("params", params);
  const address = params.get("address") || "";
  const type = params.get("type");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  //const selectedCity = params.get("city");
  // let defaultCity: number = 0;
  // if (selectedCity === "Selangor") {
  //   defaultCity = 1;
  // } else if (selectedCity === "Kuala Lumpur") {
  //   defaultCity = 2;
  // } else if (selectedCity === "Johor") {
  //   defaultCity = 3;
  // }
  //const handleSorting = () => {};

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
  useEffect(() => {
    if (!query) return setResults([]);
    setResults(
      MOCK_RESULTS.filter(
        (i) =>
          i.displayText.toLowerCase().includes(query.toLowerCase()) ||
          i.displayDescription.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
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
                    <span style={{ color: "#BD2228" }}>5</span> results |
                    Property for{" "}
                    <span style={{ color: "#BD2228" }}>{type}</span> in{" "}
                    {address?.substring(0, 100)}..
                  </span>
                </div>
              </div>
              <div className="row" style={{ width: "100%" }}>
                <div className="col-xs-12 col-xl-10 col-lg-10 marTop20">
                  <div className="tp-hero-tab-input1 p-relative">
                    <div
                      ref={wrapperRef}
                      className="relative flex w-full flex-col gap-3 sm:flex-row"
                    >
                      <div className="relative w-full max-w-md">
                        <input
                          value={query}
                          onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                          }}
                          placeholder={`Search property`}
                          className="
          srchUpdate w-full rounded-full border border-gray-300
          py-3 pl-4 pr-10
          focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {query && (
                          <button
                            onClick={() => setQuery("")}
                            style={{ marginLeft: "-30px" }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-600"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      {open && results.length > 0 && (
                        <div
                          style={{
                            borderRadius: "8px",
                            width: "102%",
                            marginBottom: "8px",
                          }}
                          className="absolute left-0 top-[72px] z-50 w-full rounded-2xl border bg-white shadow-2xl"
                        >
                          {results.map((item) => (
                            <div
                              style={{
                                borderBottom: "1px solid #ddd",
                                cursor: "pointer",
                              }}
                              key={item.objectId}
                              className="cursor-pointer border-b px-3 py-2 hover:bg-gray-50 last:border-none"
                              onClick={() => {
                                setQuery(item.displayText);
                                setOpen(false);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-lg font-semibold text-blue-600"
                                  style={{ color: "#000" }}
                                >
                                  {item.displayText}
                                </span>
                                <span
                                  className="rounded-full border px-3 py-1 text-sm text-gray-600"
                                  style={{ float: "right" }}
                                >
                                  {item.displayType}
                                </span>
                              </div>
                              <p className="mt-1 text-gray-600">
                                {item.displayDescription}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
