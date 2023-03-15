import useSWR from "swr";

// context
import { useUserContext } from "../context/userContext";

const useFetch = (url) => {
  const { getUserFromLocalStorage } = useUserContext();
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getUserFromLocalStorage().user.token}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 3000,
  });

  return { data, pending: isLoading, error };
};

export default useFetch;
