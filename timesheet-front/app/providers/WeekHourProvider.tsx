"use client";
import axios, { AxiosError } from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { BACKEND_URL } from "../lib/Constants";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

interface WeekHoursContextType {
  weekHours: WeekHours[];
  fetchWeekHours: () => void;
}
export const WeekHourContext = createContext<WeekHoursContextType>({
  weekHours: [],
  fetchWeekHours: () => {},
});

export interface WeekHours {
  _id: string;
  week: string;
  hours: string;
}

export const WeekHourProvider = ({ children }: PropsWithChildren) => {
  const [weekHours, setWeekHours] = useState<WeekHours[]>([]);
  const { status, data: session } = useSession();
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const fetchWeekHours = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/hours", {
        headers: { Authorization: `Bearer ${session?.backendToken.accessKey}` },
      });
      setWeekHours(response.data);
    } catch (error: AxiosError | any) {
      if (error.response) {
        if (error.response.status === 401) {
          signOut();
        }
      }
    }
  };

  useEffect(() => {
    if (session && session.backendToken && session.backendToken.accessKey) {
      fetchWeekHours();
    }
  }, [session]);

  return (
    <WeekHourContext.Provider value={{ weekHours, fetchWeekHours }}>
      {children}
    </WeekHourContext.Provider>
  );
};
