import useSWR from "swr";

interface ICharactersArgs {
  //TODO: Idea: replace wiht enum for gender
  gender?: string;
  culture?: string;
  page?: string;
  pageSize?: number;
}

export function useCharacters({
  gender,
  culture,
  page,
  pageSize,
}: ICharactersArgs) {
  const { data, error } = useSWR(
    `/characters?page=${page}&pageSize=${pageSize}&gender=${gender}&culture=${culture}`
  );
  return {
    characters: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
    link: data?.link,
  };
}

export function useCharacter(id: string) {
  const { data, error } = useSWR(`/characters/${id}`);

  return {
    character: data,
    isLoading: !error && !data,
    isError: error,
  };
}
