"use client";
import {
  AuthEmailSvg,
  //AuthFacebookSvg,
  //AuthGoogleSvg,
  AuthLockSvg,
  AuthUserSvg,
  ClosedEyeSvg,
  OpenEyeSvg,
  CallThreeSvg,
} from "@/components/SVG";
import { ISignUpFormData } from "@/types/custom-interface";
import { signUpSchema } from "@/schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../ErrorMassage";
import { useForm } from "react-hook-form";
import { useState, CSSProperties } from "react";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRen, setShowRen] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("Owner");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    resolver: yupResolver(signUpSchema),
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
    setSelectedValue(value);
    if (value === "Agent") {
      setShowRen(true);
    } else {
      setShowRen(false);
    }
  };

  const onSubmit = async (data: ISignUpFormData) => {
    const requestBody = {
      displayname: data.displayname,
      email: data.email,
      phone: data.phone,
      renNumber: data.renNumber,
      password: data.password,
      confirmPassword: data.confirmPassword,
      remember: data.remember,
    };
    const headers = {
      "Content-Type": "application/json",
      "X-Request-Source": "react-client",
    };
    try {
      const response = await axios.post(
        "https://example.com/api/login",
        requestBody,
        { headers }
      );
      console.log("Sign-up response", response);
      toast.success("Sign-up successful! Welcome aboard!");
      router.push("/verify");
      return;
    } catch (error: unknown) {
      let message = "Sign-up failed";
      if (axios.isAxiosError(error)) {
        message =
          (error.response &&
            (error.response as { data?: { message?: string } }).data
              ?.message) ||
          error.message ||
          message;
      } else if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div
            className="tp-cart-coupon-input"
            style={{ marginBottom: "10px" }}
          >
            <label style={{ float: "left", marginRight: "20px" }}>
              Are you ?
            </label>

            <div style={styles.radioGroup}>
              <label style={styles.radioOption}>
                <input
                  type="radio"
                  name="userType"
                  value="Owner"
                  checked={selectedValue === "Owner"}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <span>Owner</span>
              </label>
              <label style={styles.radioOption}>
                <input
                  type="radio"
                  name="userType"
                  value="Agent"
                  checked={selectedValue === "Agent"}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <span>Agent</span>
              </label>
            </div>
          </div>
        </div>
        {}
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <input
                type="text"
                placeholder="Enter display name"
                {...register("displayname")}
              />
              <i>
                <AuthUserSvg />
              </i>
            </div>
            <ErrorMessage message={errors?.displayname?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <i>
                <AuthEmailSvg />
              </i>
            </div>
            <ErrorMessage message={errors?.email?.message || ""} />
          </div>
        </div>
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <input
                type="text"
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid number format",
                  },
                })}
              />
              <i>
                <CallThreeSvg />
              </i>
            </div>
            <ErrorMessage message={errors?.phone?.message || ""} />
          </div>
        </div>
        {showRen === true ? (
          <div>
            <div className="col-12">
              <div className="tp-sign-in-input-box">
                <div className="tp-sign-in-input p-relative">
                  <input
                    type="text"
                    placeholder="Enter REN number"
                    {...register("renNumber")}
                  />
                  <i>
                    <AuthUserSvg />
                  </i>
                </div>
                <ErrorMessage message={errors?.renNumber?.message || ""} />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <div className="password-input p-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <div
                  className="tp-sign-in-input-eye password-show-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i>
                    <AuthLockSvg />
                  </i>
                  <span
                    id="open-eye"
                    className="open-eye open-eye-icon"
                    style={{ display: showPassword ? "block" : "none" }}
                  >
                    <OpenEyeSvg />
                  </span>

                  <span
                    id="close-eye"
                    className="open-close close-eye-icon"
                    style={{ display: showPassword ? "none" : "block" }}
                  >
                    <ClosedEyeSvg />
                  </span>
                </div>
              </div>
            </div>
            <ErrorMessage message={errors?.password?.message || ""} />
          </div>
        </div>

        <div className="col-12">
          <div className="tp-sign-in-input-box">
            <div className="tp-sign-in-input p-relative">
              <div className="password-input p-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                />
                <div
                  className="tp-sign-in-input-eye password-show-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <i>
                    <AuthLockSvg />
                  </i>
                  <span
                    id="open-eye"
                    className="open-eye open-eye-icon"
                    style={{ display: showConfirmPassword ? "block" : "none" }}
                  >
                    <OpenEyeSvg />
                  </span>

                  <span
                    id="close-eye"
                    className="open-close close-eye-icon"
                    style={{ display: showConfirmPassword ? "none" : "block" }}
                  >
                    <ClosedEyeSvg />
                  </span>
                </div>
              </div>
            </div>
            <ErrorMessage message={errors?.confirmPassword?.message || ""} />
          </div>
        </div>

        <div className="col-12">
          <div className="tp-sign-in-from-remeber">
            <div className="row">
              <div className="col-6">
                <div className="tp-contact-input-remeber">
                  <input
                    id="remember"
                    type="checkbox"
                    {...register("remember")}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
              </div>
              <div className="col-6 text-end">
                <div className="tp-sign-in-input-remeber text-end">
                  <Link href="/forget">Forgot Password?</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-sign-in-from-btn mb-30">
            <button type="submit" className="tp-btn w-100 text-center">
              Sign Up
            </button>
          </div>
          {/* <div className="tp-sign-in-from-subtitle-heading">
            <h5 className="tp-sign-in-from-subtitle">Or Sign In with</h5>
          </div>
          <div className="tp-sign-in-from-btn mb-30">
            <Link href="https://google.com" target="_blank">
              <span>
                <AuthGoogleSvg />
              </span>{" "}
              Google
            </Link>{" "}
            <Link href="https://facebook.com" target="_blank">
              <span>
                <AuthFacebookSvg />
              </span>{" "}
              Facebook
            </Link>{" "}
            <Link href="https://apple.com" target="_blank">
              <span>
                <i className="fa-brands fa-apple"></i>
              </span>{" "}
              Apple
            </Link>
          </div> */}
          <div className="tp-sign-in-from-register">
            <p>
              Already have an account?{" "}
              <Link className="textline" href="/sign-in">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
