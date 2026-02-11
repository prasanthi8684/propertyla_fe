"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import "../property.css";

export default function BasicDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyFormData>();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Basic Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-dashboard-new-input">
              <label>Listing Title</label>
              <input
                className="textBox"
                type="text"
                {...register("title")}
                placeholder="Spacious 3-Bedroom Condo in Mont Kiara"
              />
              {errors.title && (
                <p className="err-msg">{errors.title.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tp-dashboard-new-input">
              <label>Description</label>
              <textarea
                placeholder="Describe features, nearby schools, shopping malls, transportation, etc."
                {...register("description")}
              ></textarea>
              {errors.description && (
                <p className="err-msg">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label> Listing Type </label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("listingType")} className="listDropDown">
                  <option value="">Select</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
              <div>
                {errors.listingType && (
                  <p className="err-msg">{errors.listingType.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Property Type </label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("propertyType")} className="listDropDown">
                  <option value="">Select</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condominium">Condominium</option>
                  <option value="Landed House">Landed House</option>
                  <option value="Landed House">Bungalow</option>
                  <option value="Landed House">Serviced Residence</option>
                  <option value="Landed House">Office</option>
                  <option value="Landed House">Shop Lot</option>
                  <option value="Landed House">Land</option>
                </select>
              </div>
              <div>
                {errors.propertyType && (
                  <p className="err-msg">{errors.propertyType.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Tenure</label>
              <div className="tp-property-tabs-select tp-select">
                <select {...register("tenure")} className="listDropDown">
                  <option value="">Select</option>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                </select>
              </div>
              <div>
                {errors.tenure && (
                  <p className="err-msg">{errors.tenure.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
