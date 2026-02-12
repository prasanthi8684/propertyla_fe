// import MenuOne from "../../public/assets/img/menu/img-1.jpg";
// import MenuTwo from "../../public/assets/img/menu/img-2.jpg";
// import MenuThree from "../../public/assets/img/menu/img-3.jpg";
// import MenuFour from "../../public/assets/img/menu/img-4.jpg";
// import MenuFive from "../../public/assets/img/menu/img-5.jpg";

const menu_data_one = [
  {
    id: 1,
    label: "Buy",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 1,
        label: "Kuala Lumpur",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "Penang",
        url: "/search",
        img: "",
      },
      {
        id: 3,
        label: "Johor",
        url: "/search",
        img: "",
      },
      {
        id: 4,
        label: "Ipoh",
        url: "/search",
        img: "",
      },
      {
        id: 5,
        label: "Malacca",
        url: "/search",
        img: "",
      },
    ],
  },
  {
    id: 2,
    label: "Rent",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 1,
        label: "Kuala Lumpur",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "Penang",
        url: "/search",
        img: "",
      },
      {
        id: 3,
        label: "Johor",
        url: "/search",
        img: "",
      },
      {
        id: 4,
        label: "Ipoh",
        url: "/search",
        img: "",
      },
      {
        id: 5,
        label: "Malacca",
        url: "/search",
        img: "",
      },
    ],
  },
  {
    id: 3,
    label: "New Projects",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 1,
        label: "Kuala Lumpur",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "Penang",
        url: "/search",
        img: "",
      },
      {
        id: 3,
        label: "Johor",
        url: "/search",
        img: "",
      },
      {
        id: 4,
        label: "Ipoh",
        url: "/search",
        img: "",
      },
      {
        id: 5,
        label: "Malacca",
        url: "/search",
        img: "",
      },
    ],
  },
  // {
  //   id: 3,
  //   label: "New Projects",
  //   url: "/search",
  //   submenu: [
  //     { id: 1, label: "Property Style 1", url: "/search" },
  //     { id: 2, label: "Property Style 2", url: "/search" },
  //     { id: 3, label: "Property Style 3", url: "/property-style-3" },
  //     { id: 4, label: "Property Details 1", url: "/property-details" },
  //     { id: 5, label: "Property Details 2", url: "/property-details-2" },
  //     { id: 6, label: "Property Details 3", url: "/property-details-3" },
  //   ],
  // },
  {
    id: 4,
    label: "Dashboard",
    url: "/dashboard",
    submenu: [
      { id: 1, label: "Add New Listing", url: "/dashboard/add-new-property" },
      { id: 2, label: "My Profile", url: "/dashboard/my-profile" },
      { id: 3, label: "My Properties", url: "/dashboard/property" },
      { id: 4, label: "Favourites", url: "/dashboard/favourite" },
      { id: 5, label: "Reviews", url: "/dashboard/review" },
    ],
  },
  {
    id: 5,
    label: "More",
    url: "#",
    submenu: [
      { id: 1, label: "About", url: "/about" },
      { id: 2, label: "Agency", url: "/agency" },
      { id: 3, label: "Agency Details", url: "/agency-details" },
      { id: 4, label: "Faq", url: "/faq" },
      { id: 5, label: "Pricing", url: "/pricing" },
      { id: 6, label: "Agent", url: "/agent" },
      { id: 7, label: "Agent Details", url: "/agent-details" },
      { id: 10, label: "Sign up", url: "/sign-up" },
      { id: 11, label: "Sign In", url: "/sign-in" },
      { id: 12, label: "Error", url: "/error" },
      { id: 13, label: "Contact", url: "/contact" },
    ],
  },
];

export default menu_data_one;
