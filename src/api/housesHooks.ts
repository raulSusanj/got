import useSWR from "swr";

export function useHouses() {
  const { data, error } = useSWR("/houses");

  return {
    houses: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useHouse(id: string) {
  const { data, error } = useSWR(`/houses/${id}`);

  return {
    house: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}
