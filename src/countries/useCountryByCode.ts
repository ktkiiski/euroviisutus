import Country from './Country';
import countries from './countries';

export default function useCountryByCode(code: string): Country {
  const uppercaseCode = code.toUpperCase();
  const country = countries.find((c) => c.code === uppercaseCode);
  if (!country) {
    throw new Error(`Country with code ${code} not found`);
  }
  return country;
}
