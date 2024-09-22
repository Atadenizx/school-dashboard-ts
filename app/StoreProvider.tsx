"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/app/_lib/store";
import {
  setCurrentUserId,
  setWantedUserId,
} from "@/app/_lib/features/messaging/messagesSlice";

export default function StoreProvider({
  currentUserId,
  wantedUserId,
  children,
}: {
  currentUserId: string;
  wantedUserId: string;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();

    // Dispatch initial user IDs to the store
    storeRef.current.dispatch(setCurrentUserId(currentUserId));
    storeRef.current.dispatch(setWantedUserId(wantedUserId));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
