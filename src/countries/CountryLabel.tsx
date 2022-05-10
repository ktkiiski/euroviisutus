import useCountryByCode from './useCountryByCode';

interface CountryLabelProps {
  code: string;
}

export default function CountryLabel({ code }: CountryLabelProps) {
  const country = useCountryByCode(code);
  return <span>{`${country.flag} ${country.name}`}</span>;
}
