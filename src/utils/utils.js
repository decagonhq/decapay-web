import moment from "moment";

export const formatPrice = (number) => {

    return new Intl.NumberFormat("en-NG", {
  
      style: "currency",
  
      currency: "NGN",
  
      //}).format(number / 100)
  
    }).format(number);
  
  };
  
  
  
  export const formatStringPrice = (number) => {
  
    return new Intl.NumberFormat("en-US", {
  
      minimumFractionDigits: 2,
  
      maximumFractionDigits: 2,
  
    }).format(number);
  
  };
  export const stripCommaAndConvertToNumber = (amount) => {
    if (amount === "" || amount === null || amount === undefined) {
      return "";
    } else if (typeof amount === "number") {
      return amount;
    } else {
      let splitAmount = amount.split(",");
      let joinBackAmount = splitAmount.join("");
      let splitByNairaSign = joinBackAmount.split("₦");
      let joinBackAmountByNairaSign = splitByNairaSign.join("");
      return parseInt(joinBackAmountByNairaSign);
    }
  };
  
  export const disableDateInputFieldBasedOnStartDateToCurrentDate = (date, startDate) => {
    if (date > moment(new Date().toISOString().substring(0, 10)).toDate()) {
      return true;
    } else if (date < startDate) {
      return true;
    }
    return false;
  };


  export const toNumber = (e) => {
    let regex = /[^0-9]/g;
    let newAmount = e.replace(regex, "");
    return newAmount
  };