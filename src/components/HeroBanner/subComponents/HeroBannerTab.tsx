import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
//import FilterBtnSvg from "@/components/SVG/BannerSvg/FilterBtnSvg";
//import { propertyStates } from "@/data/dropdownData";
//import NiceSelect from "@/components/UI/NiceSelect";
import { ITabContentProps } from "@/types/banner-d-t";
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

// TabContent Component
export default function HeroBannerTabContent({
  id,
  isActive,
  //onSortChange,
  //toggleFilter,
}: ITabContentProps) {
  const router = useRouter();
  const [place, setPlace] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getProperties = () => {
    console.log("place", place);
    const query = new URLSearchParams({
      address: place,
      city: city,
      type: id,
    });
    router.push(`/search?${query.toString()}`);
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
    <div
      className={`tab-pane fade ${isActive ? "show active" : ""}`}
      id={id}
      role="tabpanel"
    >
      <div className="tp-hero-tab-box d-flex align-items-center">
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
                    style={{
                      width: "103%",
                      border: "1px solid #000",
                      borderRadius: "8px",
                      paddingLeft: "15px",
                      height: "50px",
                      marginBottom: "10px",
                    }}
                    className="
          w-full rounded-full border border-gray-300
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

                {/* Search Button */}
                {/* <button className="flex h-[56px] shrink-0 items-center justify-center rounded-full bg-blue-600 px-8 text-lg font-semibold text-white hover:bg-blue-700">
                  Search
                </button> */}

                {/* Dropdown */}
                {open && results.length > 0 && (
                  <div
                    style={{
                      borderRadius: "8px",
                      width: "104%",
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
          {/* <div className="col-xs-6 col-xl-1 col-lg-1">
            <div className="tp-hero-tab-filter">
              <button
                className="tp-hero-filter-btn filter-btn"
                onClick={toggleFilter}
              >
                <span>
                  <FilterBtnSvg />
                </span>
              </button>
            </div>
          </div> */}
          <div
            className="col-xs-6 col-xl-2 col-lg-2"
            style={{ paddingRight: "0px" }}
          >
            <div className="tp-hero-tab-search">
              <button style={{ width: "100%" }} onClick={() => getProperties()}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
