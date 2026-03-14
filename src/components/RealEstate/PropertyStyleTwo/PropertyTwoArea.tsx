"use client";
import { propertyData } from "@/data/propertyData";
import PropertyListCardItem from "../PropertyStyleOne/subComponents/PropertyListCardItem";
import PropertySingleCardTwo from "@/components/Common/PropertySingleCardTwo";

export default function PropertyTwoArea() {
  // Access wishlist from Redux store
  return (
    <>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="row">
            {propertyData.slice(47, 55).map((item) => {
              return (
                <div className="col-xl-6 col-sm-12" key={item.id}>
                  <PropertySingleCardTwo item={item} />
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {propertyData.slice(20, 25).map((item) => (
            <div className="co-lg-12" key={item.id}>
              <PropertyListCardItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
