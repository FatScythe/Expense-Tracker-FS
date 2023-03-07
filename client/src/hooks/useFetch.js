import { useEffect, useState } from "react";

const useFetch = async (uri) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          setPending(false);
          setError(true);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setPending(false);
      })
      .catch((err) => {
        setPending(false);
        setError(true);
      });
  }, [uri]);

  return { data, pending, error };
};

export default useFetch;
