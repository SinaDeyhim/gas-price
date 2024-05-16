import { LRUCache } from "lru-cache";
import md5 from "md5";

const CACHE_SIZE = 10;
const cache = new LRUCache({ max: CACHE_SIZE, ttl: 5000 });

type Value = {
  status: string;
  data?: Record<string, unknown>;
};

const useFetchSuspense = (url: string) => {
  const key = md5(url);
  const value: Value = (cache.get(key) as Value) || {
    status: "new",
    data: null,
  };

  if (value.status === "resolved") {
    return value.data;
  }

  if (value.status === "rejected") {
    throw new Error("Promise rejected");
  }

  const promise = fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      value.status = "rejected";
      cache.set(key, value);
      throw error;
    });

  promise.then((data) => {
    value.status = "resolved";
    value.data = data;
    cache.set(key, value);
  });

  throw promise;
};

export default useFetchSuspense;
