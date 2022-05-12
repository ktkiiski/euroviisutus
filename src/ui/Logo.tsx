import logoUrl from '../images/logo.png';
import styles from './Logo.module.css';

export default function Logo() {
  return <img alt="Eurovision Song Contest" src={logoUrl} className={styles.logo} />;
}
