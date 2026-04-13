"use client";
import React, { useState } from "react";
import HeroBannerTabContent from "./subComponents/HeroBannerTab";
//import BannerFromFilter from "../Form/BannerFromFilter";
//import SearchAutocomplete from "./subComponents/SearchAutocomplete";
import { SocialLinks } from "../UI/SocialLinks";

export default function HeroBannerOne() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeTab] = useState("rent");
  const toggleFilter = () => setIsFilterVisible((prev) => !prev);
  const handleSorting = () => {};

  return (
    <>
      {/* -- hero area start -- */}
      <section
        className="tp-hero-ptb tp-hero-hight pt-325 p-relative"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(212, 175, 55, 0.18) 0%, rgba(0, 59, 92, 0) 45%), linear-gradient(135deg, #003B5C 0%, #0B4A6F 45%, #021526 100%)",
          padding: "154px 0 258px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="tp-hero-content" style={{ marginTop: "15%" }}>
                {/* <section className="mx-auto max-w-6xl px-4 py-12">
                  <SearchAutocomplete />
                </section> */}

                <div
                  className="tp-hero-tab p-relative wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".7s"
                >
                  <div className="row">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                          className="nav-link active"
                          id="nav-rent-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#rent"
                          type="button"
                          role="tab"
                          aria-controls="nav-rent"
                          aria-selected="false"
                          style={{ borderRadius: "8px 0px 0px 0px" }}
                        >
                          Rent
                        </button>
                        <button
                          className="nav-link"
                          id="nav-buy-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#buy"
                          type="button"
                          role="tab"
                          aria-controls="nav-buy"
                          aria-selected="true"
                          style={{ borderRadius: "0px 8px 0px 0px" }}
                        >
                          Buy
                        </button>

                        {/* <button
                          className="nav-link"
                          id="nav-new-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#new-launch"
                          type="button"
                          role="tab"
                          aria-controls="nav-new"
                          aria-selected="false"
                        >
                          New Launch
                        </button> */}
                        {/* <button
                          className="nav-link"
                          id="nav-commercial-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#commercial"
                          type="button"
                          role="tab"
                          aria-controls="nav-commercial"
                          aria-selected="false"
                        >
                          Commercial
                        </button> */}
                        {/* <button
                          className="nav-link"
                          id="nav-land-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#land"
                          type="button"
                          role="tab"
                          aria-controls="nav-land"
                          aria-selected="false"
                        >
                          Plots/Land
                        </button> */}
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <HeroBannerTabContent
                        id="buy"
                        isActive={activeTab === "buy"}
                        onSortChange={handleSorting}
                        toggleFilter={toggleFilter}
                      />
                      <HeroBannerTabContent
                        id="rent"
                        isActive={activeTab === "rent"}
                        onSortChange={handleSorting}
                        toggleFilter={toggleFilter}
                      />
                      {/* <HeroBannerTabContent
                        id="new-launch"
                        isActive={activeTab === "new-launch"}
                        onSortChange={handleSorting}
                        toggleFilter={toggleFilter}
                      />
                      <HeroBannerTabContent
                        id="commercial"
                        isActive={activeTab === "commercial"}
                        onSortChange={handleSorting}
                        toggleFilter={toggleFilter}
                      />
                      <HeroBannerTabContent
                        id="land"
                        isActive={activeTab === "land"}
                        onSortChange={handleSorting}
                        toggleFilter={toggleFilter}
                      /> */}
                    </div>
                  </div>
                  <section
                    className={`tp-from-filter ${
                      isFilterVisible ? "show" : "hidden"
                    }`}
                  >
                    {/* <BannerFromFilter /> */}
                  </section>
                </div>
                <SocialLinks />
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </section>
      {/* -- hero area end -- */}
    </>
  );
}
