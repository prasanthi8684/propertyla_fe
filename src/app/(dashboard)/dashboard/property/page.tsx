"use client";

import DashboardPropertyItem from "./components/DashboardPropertyItem";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import FilterByProperty from "./components/FilterByProperty";

// API Property interface
interface ApiProperty {
  id: string;
  title?: string;
  propertyName?: string;
  price?: number;
  monthlyRent?: number;
  images?: string[];
  imageUrl?: string;
  listingType?: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  livingArea?: number;
  cityName?: string;
  stateName?: string;
}

export default function DashboardProperty() {
  const [properties, setProperties] = useState<IFeaturedPropertyDT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";
        const res = await fetch(`${API_BASE}/api/properties`);

        if (!res.ok) {
          throw new Error(`Failed to fetch properties: ${res.status}`);
        }

        const data = await res.json();
        const apiProperties: ApiProperty[] = data?.data || [];

        // Transform API data to match IFeaturedPropertyDT interface
        const transformedProperties: IFeaturedPropertyDT[] = apiProperties.map(
          (property, index) => {
            const title = property.propertyName || property.title || "Property";
            const price = property.price || property.monthlyRent || 0;
            const image =
              property.imageUrl ||
              property.images?.[0] ||
              "/assets/img/rent/property/property-1.jpg";

            return {
              id: property.id || String(index + 1),
              title: title,
              address: property.address || "Address not available",
              image: image,
              price: price,
              quantity: 1,
              bedrooms: String(property.bedrooms || 0),
              bathrooms: String(property.bathrooms || 0),
              livingArea: String(property.livingArea || 0),
              city: property.cityName || "",
              state: property.stateName || "",
              isForRent: property.listingType === "rent",
              isForSale: property.listingType === "sale",
              showTags: true,
              userName: "Property Owner",
              userRole: "Agent",
            };
          },
        );

        setProperties(transformedProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <DashboardLayout>
      {/* Filter by property */}
      <div className="tp-dashboard-property-wrap">
        <FilterByProperty />
      </div>

      {/* My Property */}
      <div className="tp-dashboard-property-wrapper">
        <div className="row">
          {loading && (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading properties...</p>
            </div>
          )}

          {error && (
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}

          {!loading && !error && properties.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No properties found</p>
            </div>
          )}

          {!loading &&
            !error &&
            properties.map((property) => (
              <div
                className="col-xxl-3 col-xl-4 col-md-6 col-12"
                key={property.id}
              >
                <DashboardPropertyItem property={property} />
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
