import { useSyncExternalStore } from "react";
import { getAppData, getServerAppData, subscribeToData } from "@/services/content";

export function useAppData() {
  return useSyncExternalStore(subscribeToData, getAppData, getServerAppData);
}
