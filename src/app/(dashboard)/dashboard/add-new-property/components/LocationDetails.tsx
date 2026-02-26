"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import PlaceSearch from "../../../../../components/HeroBanner/subComponents/PlaceSearch";

export default function LocationDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyFormData>();
  const [place, setPlace] = useState<string>("");

  const handleSelect = (selected: string) => {
    setPlace(selected);
    console.log("Your google location is ", place);
  };

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Location Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Property Name</label>
              <input
                className="textBox"
                type="text"
                {...register("propertyName")}
                placeholder="The Horizon Residences"
              />
              {errors?.propertyName && (
                <ErrorMessage message={errors?.propertyName?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Property Locality</label>
              <PlaceSearch
                onSelect={handleSelect}
                placeholder="Search location or property name"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Street Name</label>
              <input
                className="textBox"
                type="text"
                {...register("streetName")}
                placeholder="Enter street name"
              />
              {errors?.streetName && (
                <ErrorMessage message={errors?.streetName?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>City Name</label>
              <input
                className="textBox"
                type="text"
                {...register("cityName")}
                placeholder="Enter city name"
              />
              {errors?.cityName && (
                <ErrorMessage message={errors?.cityName?.message || ""} />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>State</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("stateName")} className="listDropDown">
                  <option value="">Select</option>
                  <option value="Johor">Johor</option>
                  <option value="Kedah">Kedah</option>
                  <option value="Kelantan">Kelantan</option>
                  <option value="Kuala Lumpur">Kuala Lumpur</option>
                  <option value="Melaka">Melaka</option>
                  <option value="Negeri Sembilan">Negeri Sembilan</option>
                  <option value="Pahang">Pahang</option>
                  <option value="Perak">Perak</option>
                  <option value="Perlis">Perlis</option>
                  <option value="Pulau Pinang">Pulau Pinang</option>
                  <option value="Sabah">Sabah</option>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Selangor">Selangor</option>
                  <option value="Terengganu">Terengganu</option>
                </select>
              </div>
              <div>
                {errors?.stateName && (
                  <ErrorMessage message={errors?.stateName?.message || ""} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Country</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("countryName")} className="listDropDown">
                  <option value="Kuala Lumpur">Malaysia</option>
                </select>
              </div>
              <div>
                {errors?.countryName && (
                  <ErrorMessage message={errors?.countryName?.message || ""} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Pin Code</label>
              <input
                className="textBox"
                type="text"
                inputMode="numeric"
                placeholder="Enter Pin Code"
                {...register("pinCode")}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    "",
                  );
                }}
              />
              {errors?.pinCode && (
                <ErrorMessage message={errors?.pinCode?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Landmark</label>
              <input
                className="textBox"
                type="text"
                {...register("landmark")}
                placeholder="Near MRT"
              />
              {errors?.landmark && (
                <ErrorMessage message={errors?.landmark?.message || ""} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
