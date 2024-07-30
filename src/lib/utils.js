/* eslint-disable no-unused-vars */
import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import avatars from "../assets/avatars/index.js";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const handleHTTPError = (status, message) => {
  switch (status) {
    case 400:
      toast.error(`${status} | ${message || "Bad request..."}`);
      break;
    case 401:
      toast.error(`${status} | ${message || "Invalid Request..."}`);
      break;
    case 404:
      toast.error(`${status} | ${message || "Not found"}`);
      break;
    case 500:
      toast.error(
        `${status} | ${message || "An internal server error occurred..."}`
      );
      break;
    default:
      toast.error(
        `${status} | ${message || "An error occurred, please try again"}`
      );
  }
};

export const handleGenericError = (error) => {
  toast.error(error.message || "An error occurred, please try again");
};

export const funEmojis = [
  "👾",
  "⭐",
  "🌟",
  "🎉",
  "🎊",
  "🎈",
  "🎁",
  "🎂",
  "🎄",
  "🎃",
  "🎗",
  "🎟",
  "🎫",
  "🎖",
  "🏆",
  "🏅",
  "🥇",
  "🥈",
  "🥉",
  "⚽",
  "🏀",
  "🏈",
  "⚾",
  "🎾",
  "🏐",
  "🏉",
  "🎱",
  "🏓",
  "🏸",
  "🥅",
  "🏒",
  "🏑",
  "🏏",
  "⛳",
  "🏹",
  "🎣",
  "🥊",
  "🥋",
  "🎽",
  "⛸",
  "🥌",
  "🛷",
  "🎿",
  "⛷",
  "🏂",
  "🏋️",
  "🤼",
  "🤸",
  "🤺",
  "⛹️",
  "🤾",
  "🏌️",
  "🏇",
  "🧘",
];

export const getRandomEmoji = () => {
  return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};

export const getRandomAvatars = () => {
  return avatars[Math.floor(Math.random() * avatars.length)];
};

export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}

export const getTimestamp = (createdAt) => {
  // Convert ISO string to Date object
  const createdAtDate = new Date(createdAt);
  const now = new Date();
  const elapsedTimeInMilliseconds = now.getTime() - createdAtDate.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (elapsedTimeInMilliseconds < minute) {
    const seconds = Math.floor(elapsedTimeInMilliseconds / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (elapsedTimeInMilliseconds < hour) {
    const minutes = Math.floor(elapsedTimeInMilliseconds / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (elapsedTimeInMilliseconds < day) {
    const hours = Math.floor(elapsedTimeInMilliseconds / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (elapsedTimeInMilliseconds < week) {
    const days = Math.floor(elapsedTimeInMilliseconds / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (elapsedTimeInMilliseconds < month) {
    const weeks = Math.floor(elapsedTimeInMilliseconds / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (elapsedTimeInMilliseconds < year) {
    const months = Math.floor(elapsedTimeInMilliseconds / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(elapsedTimeInMilliseconds / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};
