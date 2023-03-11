import { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";

const useFetch = async (uri) => {
  const { getUserFromLocalStorage } = useUserContext();
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getUserFromLocalStorage().user.token}`,
      },
    })
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
  const h = "hello";
  console.log(data, pending, error, h, "useFetch hook");
  return { data, pending, error, h };
};

export default useFetch;
