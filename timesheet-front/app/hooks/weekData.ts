import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "../lib/Constants";

const useWeekData = () =>
  useQuery({
    queryKey: ["weekdata"],
    queryFn: async () => {
      const response = await fetch(BACKEND_URL + "/api/record");
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

export default useWeekData;
