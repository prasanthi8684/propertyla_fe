"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserSvg from "@/components/SVG/UserSvg";

interface HeaderUserSectionProps {
  isCompact?: boolean;
}

const HeaderUserSection = ({ isCompact = false }: HeaderUserSectionProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const truncateUsername = (value: string, maxLength: number) => {
    if (value.length <= maxLength) return value;
    return value.slice(0, maxLength) + "…";
  };

  // Close dropdown when clicking outside
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
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginUser");
    setOpen(false);
    router.push("/sign-in");
  };

  const username =
    typeof window !== "undefined" ? localStorage.getItem("loginUser") : null;

  if (username) {
    // Logged in state - show dropdown
    return (
      <div className="profile-dropdown" ref={dropdownRef}>
        <button type="button" className="profile-btn" onClick={handleToggle}>
          <div
            style={{
              paddingLeft: "0px",
              paddingRight: "5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div className="tp-header-right-user-content" style={{ margin: 0 }}>
              <p
                style={{ margin: 0 }}
              >{`Hi, ${truncateUsername(username, 10)}`}</p>
            </div>
            <span className={`arrow ${open ? "rotate" : ""}`}>
              <i className="far fa-chevron-down" style={{ color: "#fff" }}></i>
            </span>
          </div>
        </button>

        {open && (
          <ul className="sub-menu">
            <li>
              <Link href="/dashboard/my-profile" onClick={() => setOpen(false)}>
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <button type="button" onClick={handleLogout}>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    );
  }

  return (
    <Link href="/sign-in" style={{ textDecoration: "none" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <div
          className="tp-header-right-user-icon"
          style={{
            background: "var(--tp-theme-primary)",
            color: "#fff",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserSvg />
        </div>
        <div className="tp-header-right-user-content" style={{ margin: 0 }}>
          <p style={{ margin: 0, color: "#fff", fontSize: "14px" }}>Hello</p>
        </div>
      </div>
    </Link>
  );
};

export default HeaderUserSection;
