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
    case 404:
      toast.error(`${status} | ${message || "Not found"}`);
      break;
    case 500:
      toast.error(
        `${status} | ${message || "An internal server error occurred"}`
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
