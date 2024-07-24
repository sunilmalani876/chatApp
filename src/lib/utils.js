import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const handleHTTPError = (status, message) => {
  switch (status) {
    case 400:
      toast.error(`${status} | ${message}` || `${status} | Bad request...`);
      break;
    case 404:
      toast.error(`${status} | ${message}` || `${status} | User not found`);
      break;
    case 500:
      toast.error(
        `${status} | ${message}` ||
          `${status} | Internal server error, please try again later`
      );
      break;
    default:
      toast.error(
        `${status} | ${message}` || `${status} | An unknown error occurred`
      );
  }
};

export const handleGenericError = (
  error
  // setLoading: (value: boolean) => void
) => {
  // setLoading(false);
  toast.error(error.message || "An error occurred, please try again");
};
