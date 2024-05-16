import { useEffect } from "react";
import useSuspenseFetch from "./useSuspenseFetch";

const useSuspenseRefetch = (url: string, ttl = 10000) => {
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
          throw new Error("Promise rejected");
        });
    }, ttl); // Refetch every 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [url, ttl]);

  // Return the data
  return data;
};

export default useSuspenseRefetch;
