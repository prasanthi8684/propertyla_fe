"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import "../property.css";

export default function BasicDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyFormData>();

  const [listingType, setListingType] = useState<string>("");

  useEffect(() => {
    const updateValue = () => {
      const value = sessionStorage.getItem("listingType") || "";
      setListingType(value);
    };

    // initial load
    updateValue();

    // listen for updates
    window.addEventListener("listingTypeChanged", updateValue);

    return () => window.removeEventListener("listingTypeChanged", updateValue);
  }, []);

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Property Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              {listingType === "rent" && <label>Monthly Rent</label>}
              {listingType === "sale" && <label>Selling Price</label>}
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                {...register("price")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
              {errors?.price && (
                <ErrorMessage message={errors?.price?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Built Up Area (sq.ft)</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Enter build up area"
                {...register("builtUpArea")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
              {errors?.builtUpArea && (
                <ErrorMessage message={errors?.builtUpArea?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Furnishing</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("furnishing")} className="listDropDown">
                  <option value="Fully">Fully Furnished</option>
                  <option value="Partially">Partially Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
              <div>
                {errors?.furnishing && (
                  <ErrorMessage message={errors?.furnishing?.message || ""} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Bed Rooms</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("bedRooms")} className="listDropDown">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="2">3</option>
                  <option value="2">4</option>
                  <option value="2">5</option>
                  <option value="2">6</option>
                </select>
              </div>
              <div>
                {errors?.bedRooms && (
                  <ErrorMessage message={errors?.bedRooms?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Bath Rooms</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("bathRooms")} className="listDropDown">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="2">3</option>
                  <option value="2">4</option>
                  <option value="2">5</option>
                  <option value="2">6</option>
                </select>
              </div>
              <div>
                {errors?.bathRooms && (
                  <ErrorMessage message={errors?.bathRooms?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Availability</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("availability")} className="listDropDown">
                  <option value="Immediate">Immediate</option>
                  <option value="Next Month">Next Month</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>
              <div>
                {errors?.availability && (
                  <ErrorMessage message={errors?.availability?.message || ""} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Floor</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("floorLevel")} className="listDropDown">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="Above25">Above 25</option>
                </select>
              </div>
              <div>
                {errors?.floorLevel && (
                  <ErrorMessage message={errors?.floorLevel?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Property Age</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("propertyAge")} className="listDropDown">
                  <option value="1">1 to 3 years</option>
                  <option value="2">3 to 5 years</option>
                  <option value="2">5 to 10 years</option>
                  <option value="2">More than 10 years</option>
                </select>
              </div>
              <div>
                {errors?.propertyAge && (
                  <ErrorMessage message={errors?.propertyAge?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Negotiable</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("negotiable")} className="listDropDown">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                {errors?.negotiable && (
                  <ErrorMessage message={errors?.negotiable?.message || ""} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
