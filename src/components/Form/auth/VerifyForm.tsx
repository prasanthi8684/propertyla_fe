"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifySchema } from "@/schemas/validationSchema";
import ErrorMessage from "../ErrorMassage";
import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from "next/navigation";

interface FormData {
  emailOtp: string;
}

export default function VerifyForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(verifySchema),
  });

  const onSubmit = async (data: FormData) => {
    // prefer using react-hook-form data instead of querying DOM
    const otp = data.emailOtp?.trim();

    if (otp) {
      try {
        // read the registered email saved at registration (fallback to the previous hardcoded email)
        const user_id = localStorage.getItem("user_id");

        const res = await fetch("http://159.203.68.169/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user_id, otp }),
        });

        if (!res.ok) {
          const errBody = await res
            .json()
            .catch(() => ({ message: res.statusText }));
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="tp-cart-coupon-input-box">
            <div className="tp-cart-coupon-input">
              <div className="row">
                <div>
                  <label>
                    {(() => {
                      const email =
                        typeof window !== "undefined"
                          ? localStorage.getItem("email")
                          : null;
                      return email;
                    })()}
                    Registered Email: {localStorage.getItem("registeredEmail")}
                  </label>
                </div>
              </div>
            </div>
            <div className="tp-cart-coupon-input" style={{ marginTop: "10px" }}>
              <div className="row">
                <div className="col-8">
                  <input
                    {...register("emailOtp")}
                    type="text"
                    placeholder="Enter email OTP"
                  />
                </div>
                <div className="col-4">
                  <button type="submit" style={{ float: "right" }}>
                    Submit
                  </button>
                </div>
              </div>

              <ErrorMessage message={errors?.emailOtp?.message || ""} />
            </div>
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
