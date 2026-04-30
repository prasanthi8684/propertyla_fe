"use client";
import {
  BathroomsSvg,
  BedroomsSvg,
  DeleteIconSvg,
  LivingSvg,
  PropertyEditSvg,
} from "@/components/SVG";
import { IFeaturedPropertyDT } from "@/types/property-d-t";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  property: IFeaturedPropertyDT;
}

export default function DashboardPropertyItem({ property }: IProps) {

  return (
    <div className="tp-rent-item p-relative mb-30">
      <div className="tp-rent-thumb p-relative">
        <Link href={`/property-details/${property.id}`}>
          <Image
            src={property?.image}
            width={400}
            height={150}
            style={{ width: "100%", height: "150px", objectFit: "cover" }}
            alt="propery image"
            unoptimized
          />
        </Link>
        {property.showTags && (
          <div className="tp-rent-tags">
            {property.isForRent === true ? (
              <Link href="#">FOR RENT</Link>
            ) : (
              ""
            )}{" "}
            {property.isForSale === true ? (
              <Link href="#">FOR SALE</Link>
            ) : (
              ""
            )}
            {property.isFeatured === true ? (
              <Link className="two" href="#">
                FEATURED
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <div className="tp-rent-content">
        <h4 className="tp-rent-title">
          <Link className="textline" href={`/property-details/${property.id}`}>
            {property.title}
          </Link>
        </h4>
        <p>{property?.address}</p>
        <div className="tp-rent-meta-list d-flex justify-content-between align-items-center">
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <BedroomsSvg />
              </span>
              <p>{property.bedrooms}</p>
            </div>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <BathroomsSvg />
              </span>
              <p>{property.bathrooms}</p>
            </div>
          </div>
          <div className="tp-rent-meta-item">
            <div className="tp-rent-meta-content d-flex">
              <span>
                <LivingSvg />
              </span>
              <p>{property.livingArea}</p>
            </div>
          </div>
        </div>
        <div className="tp-rent-btn-box d-flex justify-content-between align-items-center">
          <div className="tp-rent-price">
            <span>{`$${property.price}.000`}</span>
          </div>
          <div className="tp-rent-action-btn d-flex">
            <div className="tp-action-btn">
              <Link href="#">
                <PropertyEditSvg />
              </Link>
            </div>
            <div className="tp-action-btn">
              <button
                className="click"
                onClick={() => console.log("Delete property:", property.id)}
                title="Delete Property"
              >
                <DeleteIconSvg />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
