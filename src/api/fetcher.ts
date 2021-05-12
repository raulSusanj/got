const BASE_URL = "https://www.anapioficeandfire.com/api";

// export const fetcher = (url: string) => {
//   return fetch(`${BASE_URL + url}`).then(async (res) => res.json())
// };

export const fetcher = async (url: string) => {
  const response = await fetch(`${BASE_URL + url}`);
  const data = await response.json();
  const link = await response.headers.get("Link");
  // return data;
  return { data, link };
};
