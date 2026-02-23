"use client";
import logoBlack from "../../../public/assets/img/logo/logo-black.png";
import userImg from "../../../public/assets/img/shop/user-1.jpg";
import OffcanvasArea from "../../components/OffCanvas/OffcanvasArea";
//import WishlistIconSvg from "@/components/SVG/WishlistIconSvg";
//import useShoppingCartMetrics from "@/hooks/useCart";
import useGlobalContext from "@/hooks/useContext";
import NavMenus from "../subComponents/NavMenus";
import useSticky from "@/hooks/useSticky";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CommonHeader({ wrapClass = "" }) {
  //const { useWishlstQuantity } = useShoppingCartMetrics();
  const { toggleOffcanvas } = useGlobalContext();
  const { sticky } = useSticky();
  //const TotalWishlistQuantity = useWishlstQuantity();

  // Header Content Component
  const renderHeaderContent = ({
    toggleOffcanvas,
  }: {
    toggleOffcanvas: () => void;
  }) => (
    <div className="container container-large">
      <div className="row align-items-center">
        <div className="col-xl-2 col-lg-4 col-md-3 col-6">
          <div className="tp-header-logo">
            <Link href="/">
              <Image className="logo-header" src={logoBlack} alt="image" />
            </Link>
          </div>
        </div>
        <div className="col-xl-6 col-lg-4 d-none d-lg-block">
          <div className="tp-header-2-menu">
            <div className="tp-main-menu d-none d-xl-block">
              <nav className="tp-mobile-menu-active">
                <NavMenus />
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-9 col-6">
          <div className="tp-header-5-main-right d-flex align-items-center justify-content-end">
            {/* <div className="tp-header-right-wishlist color-black mr-30 d-none d-xxl-block">
              <Link href="/wishlist">
                <span>
                  <WishlistIconSvg color="#000" />
                </span>
                <em>{TotalWishlistQuantity}</em>
              </Link>
            </div> */}
            {/* <div className="tp-header-5-btn d-none d-md-block">
              <Link className="tp-btn" href="/search">
                <span className="btn-wrap">
                  <b className="text-1">Find Property</b>
                  <b className="text-2">Find Property</b>
                </span>
              </Link>
            </div> */}
            <div className="tp-header-dashboard-user ml-20">
              <Image src={userImg} alt="user image" />
            </div>
            <div className="tp-header-hamburger d-xl-none offcanvas-open-btn">
              <button onClick={toggleOffcanvas} className="hamburger-btn">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Header */}
      <header className={`tp-header-5-ptb p-relative ${wrapClass}`}>
        <div className="tp-header-main-sticky p-relative">
          {renderHeaderContent({ toggleOffcanvas })}
        </div>
      </header>

      {/* Sticky Header */}
      <header
        className={`tp-header-5-ptb p-relative tp-int-menu tp-header-sticky-cloned ${
          sticky ? "tp-header-pinned" : ""
        }`}
      >
        <div className="tp-header-main-sticky tp-header-5-main p-relative">
          {renderHeaderContent({ toggleOffcanvas })}
        </div>
      </header>

      {/* Offcanvas Area */}
      <OffcanvasArea />
    </>
  );
}
