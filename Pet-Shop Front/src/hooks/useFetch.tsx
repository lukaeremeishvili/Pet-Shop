import { useCallback, useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_CRUDAPI_KEY as string;

function useFetch<T extends object>(
  url: string,
  method: string,
  initialData: T
) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        if ("items" in data) setData(data.items as T);
        else setData(data as T);
      })
      .catch((err: Error) => setError(err.message || "Something went wrong!"))
      .finally(() => setLoading(false));
  }, [url, method]);

  useEffect(() => fetchData(), [fetchData]);

  return { data, loading, error, fetchData };
}

export default useFetch;
