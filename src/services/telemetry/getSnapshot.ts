import { API_ROUTES, QUERY_PARAMS } from "@/app/config/constants";

export const getSnapshot = async (snap: number) => {
  let data;

  try {
    const res = await fetch(`${API_ROUTES.TELEMETRY}?${QUERY_PARAMS.SNAPSHOT}=${snap}`);
    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch telemetry:", error);
  }

  return data;
};