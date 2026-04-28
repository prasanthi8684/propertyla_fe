"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const truncateUsername = (value: string, maxLength: number) => {
    if (value.length <= maxLength) return value;
    return value.slice(0, maxLength) + "…";
  };

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
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginUser");
    setOpen(false);
    router.push("/sign-in");
  };

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
            {(() => {
              const username =
                typeof window !== "undefined"
                  ? localStorage.getItem("loginUser")
                  : null;

              return username ? (
                <p
                  style={{ margin: 0 }}
                >{`Hi, ${truncateUsername(username, 10)}`}</p>
              ) : (
                <p style={{ margin: 0 }}></p>
              );
            })()}
          </div>

          <span className={`arrow ${open ? "rotate" : ""}`}>
            <i className="far fa-chevron-down" style={{ color: "#fff" }}></i>
          </span>
        </div>
      </button>

      {/* ✅ Dropdown */}
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
};

export default ProfileDropdown;
