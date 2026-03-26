"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertySchema, PropertyFormData } from "@/schemas/validationSchema";
import BasicDetails from "./BasicDetails";
import LocationDetails from "./LocationDetails";
import PropertyDetails from "./PropertyDetails";
import AmenitiesDetails from "./AmenitiesDetails";
import UploadMedia from "./UploadMedia";

// Amenity groupings — mirror the FE display groups for categorising on submit
const AMENITY_GROUPS = {
  lifestyle: [
    "Swimming Pool",
    "Gymnasium",
    "Playground",
    "BBQ Area",
    "Function Room",
    "Games Room",
    "Sky Garden",
    "Reading Room",
    "Lounge",
  ],
  facilities: [
    "Covered Parking",
    "Visitor Parking",
    "Service Lift",
    "Surau / Prayer Room",
    "Parcel Locker",
    "Laundry Room",
    "Cafeteria",
  ],
  security: [
    "24-hour Security",
    "CCTV Surveillance",
    "Access Card System",
    "Fire Alarm System",
    "Emergency Exit",
  ],
};

/** Map a flat amenities array to the grouped structure the BE expects */
function groupAmenities(flat: string[] = []) {
  const result: { lifestyle: string[]; facilities: string[]; security: string[] } = {
    lifestyle: [],
    facilities: [],
    security: [],
  };
  for (const amenity of flat) {
    if (AMENITY_GROUPS.lifestyle.includes(amenity)) {
      result.lifestyle.push(amenity);
    } else if (AMENITY_GROUPS.facilities.includes(amenity)) {
      result.facilities.push(amenity);
    } else if (AMENITY_GROUPS.security.includes(amenity)) {
      result.security.push(amenity);
    }
  }
  return result;
}

export default function AddPropertyPage() {
  const methods = useForm<PropertyFormData & { images?: File[] | FileList }>({
    resolver: yupResolver(propertySchema),
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<PropertyFormData & { images?: File[] | FileList }> = (data) => {
    (async () => {
      try {
      // assume images come from the form as `data.images` (FileList or File[])
      const files = data.images as File[] | FileList | undefined;
      let imageUrls: string[] = [];

      if (files && files.length) {
        const formData = new FormData();
        // Append under common keys — some backends expect "files", others "images"
        Array.from(files).forEach((file) => {
          formData.append("files", file as File);
          formData.append("images", file as File);
        });

        // Upload images to your server API which should upload to your "space"
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3008";
        const rawToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
        const uploadUrl = `${API_BASE}/api/uploads`;
        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          headers: rawToken ? { Authorization: `Bearer ${rawToken}` } : {},
          body: formData,
        });

        if (!uploadRes.ok) {
          const errText = await uploadRes.text().catch(() => uploadRes.statusText);
          console.error("Upload error:", errText);
          alert("Failed to upload images.");
          return;
        }
        console.log("Upload response:", uploadRes);

        const uploadResult = await uploadRes.json();
        console.log("Upload result:", uploadResult);

        // Use unknown + type guards instead of `any`
        const isRecord = (v: unknown): v is Record<string, unknown> =>
          typeof v === "object" && v !== null;

        const getUrlFromItem = (item: unknown): string | undefined => {
          if (typeof item === "string") return item;
          if (!isRecord(item)) return undefined;
          if (typeof item.url === "string") return item.url;
          if (typeof item.path === "string") return item.path;
          if (typeof item.location === "string") return item.location;
          return undefined;
        };

        const extractUrls = (res: unknown): string[] => {
          if (!res) return [];
          if (Array.isArray(res)) {
            return res.map(getUrlFromItem).filter(Boolean) as string[];
          }
          if (isRecord(res)) {
            if (Array.isArray(res.urls)) {
              return res.urls.map(getUrlFromItem).filter(Boolean) as string[];
            }
            if (Array.isArray(res.uploadedUrls)) {
              return res.uploadedUrls.filter((u): u is string => typeof u === "string");
            }
            // Handle backend response: { success, data: { imageUrls: [...] } }
            if (isRecord(res.data)) {
              if (Array.isArray((res.data as Record<string, unknown>).imageUrls)) {
                return ((res.data as Record<string, unknown>).imageUrls as unknown[])
                  .filter((u): u is string => typeof u === "string");
              }
            }
            if (Array.isArray(res.data)) {
              return res.data.map(getUrlFromItem).filter(Boolean) as string[];
            }
            if (isRecord(res.file)) {
              if (typeof res.file.url === "string") return [res.file.url];
              if (typeof res.file.path === "string") return [res.file.path];
            }
            if (typeof res.url === "string") return [res.url];
          }
          return [];
        };

        imageUrls = extractUrls(uploadResult);
      }

      // ---------------------------------------------------------------
      // Remap FE field names → BE field names before sending to the API
      // ---------------------------------------------------------------
      const flatAmenities = (data.amenities ?? []).filter(
        (a): a is string => typeof a === "string"
      );

      // Convert property age range to actual year of build
      const getYearFromAgeRange = (ageRange: string | number | undefined): number | undefined => {
        if (!ageRange) return undefined;
        const currentYear = new Date().getFullYear();
        const age = parseInt(String(ageRange), 10);
        
        switch (age) {
          case 1: // 1 to 3 years
            return currentYear - 2;
          case 2: // 3 to 5 years
            return currentYear - 4;
          case 3: // 5 to 10 years
            return currentYear - 7;
          case 4: // More than 10 years
            return currentYear - 15;
          default:
            return undefined;
        }
      };

      const payload = {
        // Pass-through fields that match between FE and BE
        listingType: data.listingType,
        propertyType: data.propertyType,
        propertyName: data.propertyName,
        tenure: data.tenure,
        title: data.title,
        description: data.description,
        streetName: data.streetName,
        cityName: data.cityName,
        landmark: data.landmark,
        furnishing: data.furnishing,
        availability: data.availability,
        floorLevel: data.floorLevel?.toString(),
        status: "active",

        // Remapped numeric fields (FE stores as string from input/select)
        price: parseFloat(data.price),
        buildupArea: data.builtUpArea ? parseFloat(data.builtUpArea) : undefined,
        bedrooms: data.bedRooms ? parseInt(data.bedRooms, 10) : undefined,
        bathrooms: data.bathRooms ? parseInt(data.bathRooms, 10) : undefined,
        yearOfBuild: getYearFromAgeRange(data.propertyAge),

        // Remapped name fields
        state: data.stateName,
        county: data.countryName,
        pincode: data.pinCode,

        // Convert "Yes"/"No" negotiable to boolean
        negotiable: data.negotiable === "Yes",

        // Group flat amenities array into {lifestyle, facilities, security}
        amenities: groupAmenities(flatAmenities),

        // Images from upload
        images: imageUrls,
      };


      const rawToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

      console.log(localStorage.getItem("authToken"));
      const authHeader = `Bearer ${rawToken ?? ""}`;
      const API_BASE2 = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3008";
      const propertyUrl = `${API_BASE2}/api/properties`;
      const res = await fetch(propertyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        console.error("API error:", err);
        alert("Failed to add property: " + (err.message || res.statusText));
        return;
      }

      const result = await res.json();
      console.log("Property created:", result);
      methods.reset();
      alert("Property added successfully!");
      if (typeof window !== "undefined") {
        // Redirect to home page (replace so user can't go back to the form)
        window.location.replace("/");
      }
      } catch (error) {
      console.error("Network error:", error);
      alert("Network error while submitting the form.");
      }
    })();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BasicDetails />
        <LocationDetails />
        <PropertyDetails />
        <AmenitiesDetails />
        <UploadMedia />
        <div className="tp-dashboard-new-btn">
          <button type="submit" className="add">
            Add Property
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
