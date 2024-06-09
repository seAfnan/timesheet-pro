import { useQuery } from "@tanstack/react-query";

const useWeekData = () =>
  useQuery({
    queryKey: ["weekdata"],
    queryFn: async () => {
      const response = await fetch("/api/week");
      return response.json();
    },
    // staleTime: 1000 * 60 * 60,
  });

export default useWeekData;
