"use client";
import { useEffect, useState } from "react";
import {
  ActiveWishListSvg,
  BathroomsSvg,
  BedroomsSvg,
  CartSvg,
  LivingSvg,
  WishListSvg,
} from "@/components/SVG";
import { CompireSvgTwo } from "@/components/SVG/PropertySvg/CompireSvg";
import BookmarkSvg from "@/components/SVG/PropertySvg/BookmarkSvg";
import DetailsReusableArea from "./subComponents/DetailsReusableArea";
import PropertyDetailsSlider from "./subComponents/PropertySlider";
import { toggle_wishlist } from "@/redux/slices/wishlistSlice";
import { compire_product } from "@/redux/slices/compireSlice";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import { cart_product } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { IdProps } from "@/types/custom-interface";
import { RootState } from "@/redux/store";
import { formatPrice } from "@/components/Utils/formatPrice";

type ApiProperty = {
  id: string;
  title: string;
  description?: string;
  listingType?: string;
  propertyType?: string;
  propertyName?: string;
  streetName?: string;
  cityName?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  price?: number | string;
  buildupArea?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  images?: string[];
  status?: string;
  amenities?: {
    lifestyle?: string[];
    facilities?: string[];
    security?: string[];
  };
  furnishing?: string;
  availability?: string;
  negotiable?: boolean;
  yearOfBuild?: number;
  tenure?: string;
};

function mapToDisplay(item: ApiProperty): IFeaturedPropertyDT {
  const address = [item.streetName, item.cityName, item.state]
    .filter(Boolean)
    .join(", ");
  const beds = parseInt(String(item.bedrooms ?? 0), 10);
  const baths = parseInt(String(item.bathrooms ?? 0), 10);
  const area = parseFloat(String(item.buildupArea ?? 0));
  const livingArea =
    area > 0
      ? Number.isInteger(area)
        ? `${area} Sq Ft`
        : `${area.toFixed(1)} Sq Ft`
      : "N/A";
  return {
    id: 0,
    title: item.propertyName || item.title || "Property",
    address: address || "Address not available",
    linkUrl: "property-details",
    image: "" as unknown as IFeaturedPropertyDT["image"],
    showTags: true,
    isForRent: item.listingType === "rent",
    isFeatured: false,
    bedrooms: beds > 0 ? String(beds) : "0",
    bathrooms: baths > 0 ? String(baths) : "0",
    livingArea,
    price: parseFloat(String(item.price ?? 0)) || 0,
    description: item.description,
    quantity: 0,
  };
}

export default function PropertyDetailsOneArea({ id }: IdProps) {
  const dispatch = useDispatch();
  const [apiProperty, setApiProperty] = useState<ApiProperty | null>(null);
  const [display, setDisplay] = useState<IFeaturedPropertyDT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const base =
          process.env.NEXT_PUBLIC_API_BASE ?? "http://34.42.177.70:3008";
        const res = await fetch(`${base}/api/properties/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const item: ApiProperty = json?.data ?? json;
        setApiProperty(item);
        setDisplay(mapToDisplay(item));
      } catch {
        setError("Property not found.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const wishlist = useSelector((s: RootState) => s.wishlist.wishlistProducts);
  const isWishlisted = wishlist?.some((w) => w.id === display?.id);

  if (loading) {
    return (
      <section className="tp-property-details-area pt-80 pb-130">
        <div className="container text-center py-5">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#003B5C" }}
          />
          <p className="mt-3 text-muted">Loading property details…</p>
        </div>
      </section>
    );
  }

  if (error || !display || !apiProperty) {
    return (
      <section className="tp-property-details-area pt-80 pb-130">
        <div className="container text-center py-5">
          <p className="text-danger">{error || "Property not found."}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="tp-property-details-area pt-80 pb-130">
        <div className="container">
          <div className="row">
            {/* Left — title / address / meta */}
            <div className="col-lg-8">
              <div className="tp-property-details-heading mb-40">
                <div className="mb-2 d-flex gap-2 flex-wrap">
                  <span
                    style={{
                      background:
                        apiProperty.listingType === "rent"
                          ? "#e8f4fd"
                          : "#eefbee",
                      color:
                        apiProperty.listingType === "rent"
                          ? "#1a73e8"
                          : "#2e7d32",
                      borderRadius: "20px",
                      padding: "4px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    For {apiProperty.listingType === "rent" ? "Rent" : "Sale"}
                  </span>
                  {apiProperty.propertyType && (
                    <span
                      style={{
                        background: "#f5f5f5",
                        color: "#555",
                        borderRadius: "20px",
                        padding: "4px 14px",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {apiProperty.propertyType}
                    </span>
                  )}
                </div>

                <h4 className="tp-property-details-title">{display.title}</h4>
                <span style={{ color: "#777", fontSize: "15px" }}>
                  {display.address}
                </span>

                <div className="tp-property-details-info mt-3">
                  <span>
                    <BedroomsSvg /> {display.bedrooms} Bed
                  </span>
                  <span style={{ margin: "0 12px" }}>
                    <BathroomsSvg /> {display.bathrooms} Bath
                  </span>
                  <span>
                    <LivingSvg /> {display.livingArea}
                  </span>
                  {apiProperty.furnishing && (
                    <span
                      style={{
                        marginLeft: "12px",
                        color: "#888",
                        fontSize: "14px",
                      }}
                    >
                      · {apiProperty.furnishing}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right — price / actions */}
            <div className="col-lg-4">
              <div className="tp-property-details-right-side text-lg-end mb-40">
                <div className="tp-property-details-icon-box mb-3">
                  <button title="Bookmark">
                    <span>
                      <BookmarkSvg />
                    </span>
                  </button>
                  <button
                    title="Compare"
                    onClick={() => dispatch(compire_product(display))}
                  >
                    <span>
                      <CompireSvgTwo />
                    </span>
                  </button>
                  <button
                    title="Wishlist"
                    onClick={() => dispatch(toggle_wishlist(display))}
                  >
                    <span>
                      {isWishlisted ? (
                        <ActiveWishListSvg width="26" height="26" />
                      ) : (
                        <WishListSvg width="20" height="20" />
                      )}
                    </span>
                  </button>
                  <button
                    title="Add to cart"
                    onClick={() => dispatch(cart_product(display))}
                  >
                    <span>
                      <CartSvg width="24" height="24" />
                    </span>
                  </button>
                </div>

                <h4 className="tp-property-details-icon-price">
                  {formatPrice(display.price, true)}
                  {apiProperty.listingType === "rent" && (
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#888",
                      }}
                    >
                      /mo
                    </span>
                  )}
                </h4>

                {apiProperty.negotiable && (
                  <p
                    style={{
                      color: "#2e7d32",
                      fontSize: "13px",
                      fontWeight: 500,
                      marginTop: "6px",
                    }}
                  >
                    ✓ Negotiable
                  </p>
                )}
                {apiProperty.availability && (
                  <p
                    style={{
                      color: "#888",
                      fontSize: "13px",
                      marginTop: "4px",
                    }}
                  >
                    Available: {apiProperty.availability}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Image slider */}
        <div className="container-fluid gx-0">
          <PropertyDetailsSlider images={apiProperty.images} />
        </div>
      </section>

      {/* Description / Overview / Amenities / Address */}
      <DetailsReusableArea property={apiProperty} />
    </>
  );
}
