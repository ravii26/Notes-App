import { v4 as uuidv4 } from "uuid";


export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${day}${suffix} ${month} ${year}`;
};
  
export const checkToken = () => {
  const token = localStorage.getItem('token');

  if (!token) {
      alert("Please login first");
      return false;
  }
  return true;
}

export const generateDeviceId = () => {
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Chrome")) {
      if (userAgent.includes("Edg")) {
        return "Microsoft Edge";
      }
      return "Google Chrome";
    }
    if (userAgent.includes("Firefox")) {
      return "Mozilla Firefox";
    }
    if (userAgent.includes("Safari")) {
      if (userAgent.includes("Chrome")) {
        return "Google Chrome";
      }
      return "Apple Safari";
    }
    if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
      return "Internet Explorer";
    }
    if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      return "Opera";
    }

    return "Unknown Browser";
  };

  let deviceId = localStorage.getItem("deviceId");
  const browserName = getBrowserName();

  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem("deviceId", deviceId);
  }

  return {deviceId, browserName};
};