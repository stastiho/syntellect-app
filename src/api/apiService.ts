import countries from "./countries.json";

export interface CountryInfo {
  name: string;
  fullName: string;
  flag: string;
}

export function getCountryByName(countryName: string): Promise<CountryInfo[]> {
  return new Promise((resolve) => {
    setTimeout(resolve, getRandom(100, 800));
  }).then(() => {
    if (typeof countryName !== "string" || !countryName) {
      return [];
    }

    const searchText = countryName.toLocaleLowerCase();

    return countries.filter(
      (x) =>
        x.name.toLocaleLowerCase().startsWith(searchText) ||
        x.fullName.toLocaleLowerCase().startsWith(searchText)
    );
  });
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
