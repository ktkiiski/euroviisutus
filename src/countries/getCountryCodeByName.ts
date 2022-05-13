import countries from './countries';

export default function getCountryCodeByName(name: string): string {
  const matchingCountries = countries.filter((country) => country.name.toLowerCase() === name.toLowerCase());
  if (!matchingCountries.length) {
    throw new Error(`Cannot find a country by name "${name}"`);
  }
  if (matchingCountries.length > 1) {
    throw new Error(`Ambiguous country name "${name}"`);
  }
  return matchingCountries[0].code;
}
