import { API_ROUTES } from "@/app/config/constants";
import { TelemetrySnapshot } from "@/app/config/types";

export const getStrategy = async (dataset: TelemetrySnapshot[]) => {
  let data;

  try {
    const res = await fetch(API_ROUTES.STRATEGY, {
      method: 'POST',
      body: JSON.stringify({ dataset }),
    });

    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch strategy:", error);
  }

  return data.strategy;
};