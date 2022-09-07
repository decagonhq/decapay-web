import moment from "moment";

export const ANNUAL = "ANNUAL";
export const MONTHLY = "MONTHLY";
export const WEEKLY = "WEEKLY";
export const DAILY = "DAILY";
export const CUSTOM = "CUSTOM";

export const Options = [
    {label: "ANNUAL", value: ANNUAL},
    {label: "MONTHLY", value: MONTHLY},
    {label: "WEEKLY", value: WEEKLY},
    {label: "DAILY", value: DAILY},
    {label: "CUSTOM", value: CUSTOM},
]

export const Months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

export const dateFormats = "DD/MM/YYYY";
export const dateFormats2 = "dd/MM/yyyy";
export const dateFormats3 = "yyyy-MM-dd";

export const hundredPercent = 100;

export const generateYearsFromCurrentYear = () => {
  let currentYear = new Date().getFullYear();
  let years = [];
  for (let i = currentYear; i < currentYear + 10; i++) {
    years.push({ value: i, label: i });
  }
  return years;
};

export const changeDateFormat = (date) => {
  return moment(date).format(dateFormats);
};
export const formatDate = (date) => {
  if (date === "" || date === null || date === undefined) {
    return "";
  } else {
    let splitDate = date.split("/");
    let joinDateFromBehind = splitDate.reverse().join("-");
    return joinDateFromBehind;
  }
};

// get user location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      }
    );
  });
};


export const country = localStorage.getItem("country") || "NG";
export const currency = localStorage.getItem("currency") || "NGN";
export const language = localStorage.getItem("language") || "en";





