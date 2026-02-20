"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertySchema, PropertyFormData } from "@/schemas/validationSchema";
import BasicDetails from "./BasicDetails";
import LocationDetails from "./LocationDetails";
import PropertyDetails from "./PropertyDetails";
import AmenitiesDetails from "./AmenitiesDetails";
import UploadMedia from "./UploadMedia";

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
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://159.203.68.169";
        const uploadUrl = `${API_BASE}/api/uploads`;
        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
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


      // Build payload: replace File objects with uploaded image URLs
      const payload = { ...data, images: imageUrls };

      const rawToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

      console.log(localStorage.getItem("authToken"));
      const authHeader = `Bearer ${rawToken ?? ""}`;
      const API_BASE2 = process.env.NEXT_PUBLIC_API_BASE ?? "http://159.203.68.169";
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
    return;
    alert("Form submitted successfully!");
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
