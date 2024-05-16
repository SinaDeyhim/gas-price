import { useEffect, useState } from "react";
import useSuspenseFetch from "./useSuspenseFetch";

const useSuspenseRefetch = (url: string, ttl = 10000) => {
  // Fetch the data using useFetchSuspense
  const res = useSuspenseFetch(url);
  const [data, setData] = useState(res);

  // Effect to refetch data every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch the data again
      fetch(url)
        .then(async (response) => {
          const res = await response.json();
          setData(res);
        })
        .catch((error) => {
          // Handle errors
          throw new Error("Promise rejected");
        });
    }, ttl); // Refetch every 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [url, ttl]);

  // Return the data
  console.log(">>>> data", data);
  return data;
};

export default useSuspenseRefetch;
