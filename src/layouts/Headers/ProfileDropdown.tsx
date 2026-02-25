"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import userImg from "../../../public/assets/img/shop/user-1.jpg";
import { truncateText } from "../../data/truncateText";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Close only when clicking OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // ⭐ IMPORTANT FIX
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button type="button" className="profile-btn" onClick={handleToggle}>
        <div className="tp-header-dashboard-user ml-20">
          <Image src={userImg} alt="user image" />
        </div>
        <div
          style={{
            paddingLeft: "15px",
            paddingRight: "5px",
            paddingTop: "10px",
          }}
        >
          <div className="tp-header-right-user-content">
            {(() => {
              const username =
                typeof window !== "undefined"
                  ? localStorage.getItem("loginUser")
                  : null;
              return username ? <p>{truncateText(username, 4)}</p> : <p></p>;
            })()}
          </div>

          <span className={`arrow ${open ? "rotate" : ""}`}>
            {" "}
            <i className="far fa-chevron-down" style={{ color: "#fff" }}></i>
          </span>
        </div>
      </button>

      {/* ✅ Dropdown */}
      {open && (
        <div className="profile-dropdown-menu">
          <Link href="/profile" className="dropdown-item">
            My Profile
          </Link>

          <button
            type="button"
            className="dropdown-item logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
