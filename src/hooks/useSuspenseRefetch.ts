import { useEffect } from "react";
import useSuspenseFetch, { Value } from "./useSuspenseFetch";

const useSuspenseRefetch = (url: string) => {
  // Fetch the data using useFetchSuspense
  const data = useSuspenseFetch(url);

  // Effect to refetch data every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch the data again
      fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          // Handle errors
          console.error("Error fetching data:", error);
        });
    }, 10000); // Refetch every 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [url]);

  // Return the data
  return data;
};

export default useSuspenseRefetch;
