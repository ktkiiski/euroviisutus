import styles from './CountryLabel.module.css';
import useCountryByCode from './useCountryByCode';

interface CountryLabelProps {
  code: string;
}

export default function CountryLabel({ code }: CountryLabelProps) {
  const country = useCountryByCode(code);
  return (
    <>
      <span className={styles.flag}>{country.flag}</span>
      {` ${country.name}`}
    </>
  );
}
