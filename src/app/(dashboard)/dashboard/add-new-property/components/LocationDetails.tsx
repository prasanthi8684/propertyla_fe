"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";

export default function LocationDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyFormData>();

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
              {errors.propertyName && (
                <p className="err-msg">{errors.propertyName.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Street Name</label>
              <input
                className="textBox"
                type="text"
                {...register("streetName")}
                placeholder="Enter street name"
              />
              {errors.streetName && (
                <p className="err-msg">{errors.streetName.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>City Name</label>
              <input
                className="textBox"
                type="text"
                {...register("cityName")}
                placeholder="Enter city name"
              />
              {errors.cityName && (
                <p className="err-msg">{errors.cityName.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>State</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("stateName")} className="listDropDown">
                  <option value="">Select</option>
                  <option value="Kuala Lumpur">Kaula Lumpur</option>
                  <option value="Penang">Penang</option>
                  <option value="Penang">Ipoh</option>
                </select>
              </div>
              <div>
                {errors.stateName && (
                  <p className="err-msg">{errors.stateName.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Country</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("countryName")} className="listDropDown">
                  <option value="Kuala Lumpur">Malaysia</option>
                </select>
              </div>
              <div>
                {errors.countryName && (
                  <p className="err-msg">{errors.countryName.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Pin Code</label>
              <input
                className="textBox"
                type="text"
                {...register("pinCode")}
                placeholder="Enter property name"
              />
              {errors.pinCode && (
                <p className="err-msg">{errors.pinCode.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-dashboard-new-input">
              <label>Landmark</label>
              <input
                className="textBox"
                type="text"
                {...register("landmark")}
                placeholder="Near MRT"
              />
              {errors.landmark && (
                <p className="err-msg">{errors.landmark.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
