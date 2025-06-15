import { API_ROUTES } from "@/app/config/constants";
import { TelemetrySnapshot } from "@/app/config/types";

export const getFuture = async (dataset: TelemetrySnapshot[]) => {
  let data;

  try {
    const res = await fetch(API_ROUTES.FUTURE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dataset
    })
  })
    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch future telemetry:", error);
  }

  console.log(data)

  return data;
};