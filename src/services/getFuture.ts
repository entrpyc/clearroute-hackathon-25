import { API_ROUTES } from "@/app/config/constants";

export const getFuture = async () => {
  let data;

  try {
    const res = await fetch(API_ROUTES.FUTURE);
    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch future telemetry:", error);
  }

  return data;
};