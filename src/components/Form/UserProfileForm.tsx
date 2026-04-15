"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ClosedEyeSvg, OpenEyeSvg } from "../SVG";
import ErrorMessage from "./ErrorMassage";
import { toast } from "sonner";
import apiClient from "@/config/axios";

const profileSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  aboutYou: yup.string(),
  companyName: yup.string(),
  icPassport: yup.string(),
  designation: yup.string(),
  experience: yup.number().typeError("Must be a number").min(0, "Must be 0 or more"),
});

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required").min(6, "At least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

interface ProfileFormData {
  fullName: string;
  aboutYou?: string;
  companyName?: string;
  icPassport?: string;
  designation?: string;
  experience?: number;
}

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserProfile {
  fullName?: string;
  username?: string;
  aboutYou?: string;
  companyName?: string;
  icPassport?: string;
  designation?: string;
  experience?: number;
  profileImage?: string;
  email?: string;
  phone?: string;
}

export default function UserProfileForm() {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("My Profile");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get<{ data: UserProfile }>("/users/profile");
        const profile = res.data?.data ?? (res.data as unknown as UserProfile);

        resetProfile({
          fullName: profile.fullName ?? profile.username ?? "",
          aboutYou: profile.aboutYou ?? "",
          companyName: profile.companyName ?? "",
          icPassport: profile.icPassport ?? "",
          designation: profile.designation ?? "",
          experience: profile.experience ?? undefined,
        });

        if (profile.profileImage) {
          setProfileImageUrl(profile.profileImage);
        }

        setDisplayName(profile.fullName ?? profile.username ?? "My Profile");
      } catch (err: unknown) {
        const error = err as { response?: { status?: number } };
        if (error?.response?.status !== 401) {
          toast.error("Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [resetProfile]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImageUrl(URL.createObjectURL(file));
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      await apiClient.post("/users/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile image updated!");
    } catch {
      toast.error("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      await apiClient.patch("/users/profile", {
        fullName: data.fullName,
        aboutYou: data.aboutYou,
        companyName: data.companyName,
        icPassport: data.icPassport,
        designation: data.designation,
        experience: data.experience,
      });
      setDisplayName(data.fullName);
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      toast.error(error?.response?.data?.message || error?.message || "Failed to update profile");
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      await apiClient.post("/auth/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully!");
      resetPassword();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      toast.error(error?.response?.data?.message || error?.message || "Failed to change password");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center", color: "#888" }}>
        Loading profile...
      </div>
    );
  }

  return (
    <>
      {/* Profile Image + Name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          paddingBottom: 24,
          marginBottom: 24,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}>
          <span
            style={{
              display: "block",
              width: 90,
              height: 90,
              borderRadius: "50%",
              backgroundImage: profileImageUrl
                ? `url('${profileImageUrl}')`
                : "url('/assets/img/shop/user-1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {uploadingImage
              ? <span style={{ fontSize: 9 }}>...</span>
              : <i className="fa-light fa-camera" style={{ fontSize: 12 }} />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h4 style={{ margin: "0 0 4px" }}>{displayName}</h4>
          <p style={{ margin: 0, color: "#888", fontSize: 14 }}>
            Update your personal details below
          </p>
        </div>
      </div>

      {/* Profile Information Form */}
      <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
        <div className="tp-dashboard-profile-information pb-50">
          <h5 className="tp-dashboard-new-title">Personal Information</h5>
          <div className="tp-dashboard-profile-info">
            <div className="row g-3">

              <div className="col-lg-12">
                <div className="tp-dashboard-new-input">
                  <label>Full Name <span style={{ color: "red" }}>*</span></label>
                  <input
                    {...registerProfile("fullName")}
                    type="text"
                    placeholder="Enter full name"
                  />
                  <ErrorMessage message={profileErrors.fullName?.message || ""} />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="tp-dashboard-new-input">
                  <label>About You</label>
                  <textarea
                    {...registerProfile("aboutYou")}
                    rows={4}
                    placeholder="Tell us about yourself"
                    style={{ width: "100%", resize: "vertical" }}
                  />
                  <ErrorMessage message={profileErrors.aboutYou?.message || ""} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Company Name</label>
                  <input
                    {...registerProfile("companyName")}
                    type="text"
                    placeholder="Enter your company name"
                  />
                  <ErrorMessage message={profileErrors.companyName?.message || ""} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>IC / Passport</label>
                  <input
                    {...registerProfile("icPassport")}
                    type="text"
                    placeholder="Enter your identification number"
                  />
                  <ErrorMessage message={profileErrors.icPassport?.message || ""} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Designation</label>
                  <input
                    {...registerProfile("designation")}
                    type="text"
                    placeholder="Enter your designation"
                  />
                  <ErrorMessage message={profileErrors.designation?.message || ""} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Experience (years)</label>
                  <input
                    {...registerProfile("experience")}
                    type="number"
                    min={0}
                    placeholder="Years of experience"
                  />
                  <ErrorMessage message={profileErrors.experience?.message || ""} />
                </div>
              </div>

              <div className="col-12">
                <div className="tp-dashboard-new-btn" style={{ marginTop: 8 }}>
                  <button type="submit" disabled={isProfileSubmitting}>
                    {isProfileSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
        <div className="tp-dashboard-profile-information mb-40">
          <h5 className="tp-dashboard-new-title">Change Password</h5>
          <div className="tp-dashboard-profile-info">
            <div className="row g-3">

              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Old Password <span style={{ color: "red" }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <input
                      {...registerPassword("oldPassword")}
                      type={oldPasswordVisible ? "text" : "password"}
                      placeholder="Old password"
                      style={{ paddingRight: 40 }}
                    />
                    <span
                      onClick={() => setOldPasswordVisible((v) => !v)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      {oldPasswordVisible ? <OpenEyeSvg /> : <ClosedEyeSvg />}
                    </span>
                  </div>
                  <ErrorMessage message={passwordErrors.oldPassword?.message || ""} />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>New Password <span style={{ color: "red" }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <input
                      {...registerPassword("newPassword")}
                      type={newPasswordVisible ? "text" : "password"}
                      placeholder="New password"
                      style={{ paddingRight: 40 }}
                    />
                    <span
                      onClick={() => setNewPasswordVisible((v) => !v)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      {newPasswordVisible ? <OpenEyeSvg /> : <ClosedEyeSvg />}
                    </span>
                  </div>
                  <ErrorMessage message={passwordErrors.newPassword?.message || ""} />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="tp-dashboard-new-input">
                  <label>Confirm Password <span style={{ color: "red" }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <input
                      {...registerPassword("confirmPassword")}
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm new password"
                      style={{ paddingRight: 40 }}
                    />
                    <span
                      onClick={() => setConfirmPasswordVisible((v) => !v)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer", display: "flex", alignItems: "center" }}
                    >
                      {confirmPasswordVisible ? <OpenEyeSvg /> : <ClosedEyeSvg />}
                    </span>
                  </div>
                  <ErrorMessage message={passwordErrors.confirmPassword?.message || ""} />
                </div>
              </div>

              <div className="col-12">
                <div className="tp-dashboard-new-btn" style={{ marginTop: 8 }}>
                  <button type="submit" disabled={isPasswordSubmitting}>
                    {isPasswordSubmitting ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    </>
  );
}
