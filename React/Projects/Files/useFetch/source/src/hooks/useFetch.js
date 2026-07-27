import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setData([]);

    const fetchUsers = async () => {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
        });

        if (res.status === 200) {
          const data = await res.json();
          setData(data);
        } else {
          setError("خطایی وجود دارد");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  return { data, error, loading };
};

export default useFetch;
