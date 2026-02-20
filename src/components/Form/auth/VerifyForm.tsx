"use client";
/*import {
  AuthLockSvg,
  AuthUserSvg,
  ClosedEyeSvg,
  OpenEyeSvg,
} from "@/components/SVG"; */
import { yupResolver } from "@hookform/resolvers/yup";
import { verifySchema } from "@/schemas/validationSchema";
import ErrorMessage from "../ErrorMassage";
import { useForm } from "react-hook-form";
import React, { useState, CSSProperties } from "react";
//import Link from "next/link";
//import { toast } from "sonner";
//import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  emailOtp: string;
}

export default function VerifyForm() {
  const router = useRouter();
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  //const [buttonStatus, setButtonStatus] = useState<boolean>(false);
 // const [verifiedStatus, setVerifiedStatus] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(verifySchema),
  });

  const styles: Record<string, CSSProperties> = {
    container: {
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "250px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontWeight: 600,
      marginBottom: "10px",
    },
    radioGroup: {
      display: "flex",
      gap: "10px",
    },
    radioOption: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      cursor: "pointer",
      color: "#333",
      fontSize: "14px",
    },
    radioInput: {
      width: "16px",
      height: "16px",
      accentColor: "#0070f3", // modern browsers support this
      cursor: "pointer",
      marginRight: "0px",
    },
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "Yes") {
      setShowEmailOtp(true);
    } else {
      router.push("/sign-up");
    }
    setSelectedValue(value);

    // Example API call (replace URL and payload later)
    // try {
    //   const response = await fetch("/api/your-endpoint", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ answer: value }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("API request failed");
    //   }

    //   const result = await response.json();
    //   console.log("API response:", result);
    // } catch (error) {
    //   console.error("Error calling API:", error);
    // }
  };

  const onSubmit = async (data: FormData) => {
    const value = selectedValue;
    if (value === "Yes") {
      setShowEmailOtp(true);

      // prefer using react-hook-form data instead of querying DOM
      const otp = data.emailOtp?.trim();

      if (otp) {
        try {
          // read the registered email saved at registration (fallback to the previous hardcoded email)
          const user_id = localStorage.getItem("user_id")
           

          const res = await fetch("http://159.203.68.169/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user_id, otp }),
          });

          if (!res.ok) {
            const errBody = await res.json().catch(() => ({ message: res.statusText }));
            console.error("OTP verification failed:", errBody);
            return;
          }

          const resData = await res.json();
          console.log("OTP verified:", resData);
          // on successful verification you can navigate or mark verified
          router.push("/sign-in");
        } catch (error) {
          console.error("Error verifying OTP:", error);
        }
      }
    } else {
      router.push("/sign-up");
    }
    setSelectedValue(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="tp-cart-coupon-input-box">
            <div className="tp-cart-coupon-input">
              <div className="row">
                <div className="col-lg-5 col-xs-12">
                  <label style={{ float: "left", marginRight: "20px" }}>
                    {(() => {
                  const email =
                    typeof window !== "undefined" ? localStorage.getItem("email") : null;
                  return email ;
                })()}
                  </label>
                </div>
                <div className="col-lg-7 col-xs-12">
                  <div style={styles.radioGroup}>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="yesNo"
                        value="Yes"
                        checked={selectedValue === "Yes"}
                        onChange={handleChange}
                        style={styles.radioInput}
                      />
                      <span>Yes</span>
                    </label>

                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="yesNo"
                        value="No"
                        checked={selectedValue === "No"}
                        onChange={handleChange}
                        style={styles.radioInput}
                      />
                      <span>No</span>
                    </label>
                    
                      <label>✅ Verified</label>
                    
                  </div>
                </div>
              </div>
            </div>
            {showEmailOtp === true ? (
              <div
                className="tp-cart-coupon-input"
                style={{ marginTop: "10px" }}
              >
                <input
                  {...register("emailOtp")}
                  type="text"
                  placeholder="Enter email otp"
                />

                <button type="submit" style={{ float: "right" }}>
                  Submit
                </button>
                <ErrorMessage message={errors?.emailOtp?.message || ""} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* <div className="col-12" style={{ marginTop: "30px" }}>
          <div className="tp-sign-in-from-btn mb-30">
            <button type="button" className="tp-btn w-100 text-center">
              Proceed
            </button>
          </div>
        </div> */}
      </div>
    </form>
  );
}
