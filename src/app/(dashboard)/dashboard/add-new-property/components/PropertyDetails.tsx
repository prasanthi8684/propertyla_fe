"use client";

import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "@/schemas/validationSchema";
import ErrorMessage from "../../../../../components/Form/ErrorMassage";
import "../property.css";

export default function BasicDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PropertyFormData>();

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Property Details</h5>
      <div className="tp-dashboard-new-property-box">
        <div className="row">
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Price</label>
              <input
                className="textBox"
                type="number"
                {...register("price")}
                placeholder="Enter price"
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
                {...register("builtUpArea")}
                placeholder="Enter build up area"
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
              <label>Floor Level</label>
              <input
                className="textBox"
                type="number"
                {...register("floorLevel")}
                placeholder="Enter floor number"
              />
              {errors?.floorLevel && (
                <ErrorMessage message={errors?.floorLevel?.message || ""} />
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-dashboard-new-input">
              <label>Year Of Built</label>
              <input
                className="textBox"
                type="number"
                {...register("yearBuilt")}
                placeholder="Enter built year"
              />
              {errors?.yearBuilt && (
                <ErrorMessage message={errors?.yearBuilt?.message || ""} />
              )}
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
