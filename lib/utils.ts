import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime(); // Difference in milliseconds

  // Calculate time units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
};

export const formatNumber = (n: number): string => {
  if (n >= 1e6) {
    return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (n >= 1e3) {
    return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return n.toString();
  }
};

export const getMonthAndYear = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const removeProtocol = (url: string): string => {
  return url.replace(/https?:\/\/|\/$/g, "").replace(/^www\./, "");
};

interface UrlQueryParams {
  params: string;
  Key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, Key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[Key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};

interface removeKeyParams {
  params: string;
  Key: string[];
}
export const removeKeyFromQuery = ({ params, Key }: removeKeyParams) => {
  const currentUrl = qs.parse(params);
  delete currentUrl[Key[0]];
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
