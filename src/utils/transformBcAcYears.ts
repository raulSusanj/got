export function transformBcAcYears(yearData: string) {
  const regex = /\d|\s(AC|BC|ac|bc)/g;
  let year: string | Array<string> | number | null;
  year = yearData.match(regex);

  if (!year) {
    return null;
  }
  const lastElement = year[year?.length - 1];

  if (lastElement === " BC") {
    year.pop();
    year = `-${year.join("")}`;
  } else {
    year.pop();
    year = `${year.join("")}`;
  }

  year = parseInt(year, 10);
  return year;
}