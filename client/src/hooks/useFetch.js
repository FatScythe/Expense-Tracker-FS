import { useUserContext } from "../context/userContext";
import useSWR from "swr";

const useFetch = (url) => {
  const { getUserFromLocalStorage } = useUserContext();
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getUserFromLocalStorage().user.token}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(url, fetcher);

  return { data, pending: isLoading, error };
};

export default useFetch;
