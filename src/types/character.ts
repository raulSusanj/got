export type Character = {
  url: string;
  name?: string;
  gender?: string;
  born: string;
  died: string;
  aliases: Array<string>;
  culture: string;
  allegiances: Array<string>;
  books: Array<string>;
}