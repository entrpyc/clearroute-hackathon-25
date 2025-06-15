import { API_ROUTES } from "@/app/config/constants";

export const getSnapshot = async (snap: number) => {
  let data;

  try {
    const res = await fetch(API_ROUTES.TELEMETRY, {
      method: 'POST',
      body: JSON.stringify({ snapshot: snap }),
    });
    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch telemetry:", error);
  }

  return data;
};