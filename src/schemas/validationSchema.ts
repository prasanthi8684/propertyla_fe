import * as yup from "yup";
//Sign Up form validation schema
export const signUpSchema = yup.object().shape({
  displayname: yup.string().required("Enter display name"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup.string().required("Phone number is required"),
  renNumber: yup.string(),
  password: yup
    .string()
    .required("Enter password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  remember: yup.boolean(),
});
//Sign in form validation schema
export const signInSchema = yup.object().shape({
  email: yup.string().required("Enter email or phone number"),
  password: yup
    .string()
    .required("Enter password")
    .min(6, "Password must be at least 6 characters"),
});

//Forgot form validation schema
export const forgotSchema = yup.object().shape({
  email: yup.string().required("Enter email"),
});

//Verify form validation schema
export const verifySchema = yup.object().shape({
  emailOtp: yup.string().required("Email OTP is required"),
});

//Add listing basic form validation schema
export const basicSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
});

export const propertySchema = yup.object({
  listingType: yup.string().required("Listing type is required"),
  propertyName: yup.string().required("Property name is required"),
  propertyType: yup.string().required("Property type is required"),
  tenure: yup.string().required("Tenureis required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  streetName: yup.string().required("Street name is required"),
  cityName: yup.string().required("City name is required"),
  stateName: yup.string().required("State is required"),
  countryName: yup.string().required("Country is required"),
  pinCode: yup.string().required("Pin Code is required"),
  landmark: yup.string().required("Land mark is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
  builtUpArea: yup.string().required("Built Up Area is required"),
  furnishing: yup.string().required("Furnishing type is required"),
  bedRooms: yup.string().required("Bed rooms are required"),
  bathRooms: yup.string().required("Bath rooms are required"),
  availability: yup.string().required("Availability is required"),
  negotiable: yup.string().required("Negotiable is required"),
  floorLevel: yup
    .number()
    .typeError("Floor Number must be a number")
    .positive("Floor Number must be greater than zero")
    .required("Floor Number is required"),
  yearBuilt: yup
    .number()
    .typeError("Year of build must be a number")
    .positive("Year of build must be greater than zero")
    .required("Year of build is required"),
  amenities: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one amenity.")
    .required("Please select at least one amenity."),
});

export type PropertyFormData = yup.InferType<typeof propertySchema>;

//Blog comment form validation schema
export const blogCommentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  number: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  message: yup.string().required("Message is required"),
});

//Contact form validation schema
export const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  number: yup.string().required("Phone number is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

//Contact form validation schema
export const contactTwoSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup.string().required("Phone number is required"),
  caseDetails: yup.string().required("Message is required"),
});

//Property Review validation schema
export const propertyReviewSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  number: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  message: yup.string().required("Message is required"),
});

//leave message validation schema
export const leaveMessageSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  message: yup.string().required("Message is required"),
});
