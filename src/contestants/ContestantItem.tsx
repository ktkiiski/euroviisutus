import CountryLabel from '../countries/CountryLabel';
import Contestant from './Contestant';
import styles from './ContestantItem.module.css';

interface ContestantItemProps {
  contestant: Contestant;
  score?: number | null;
}

export default function ContestantItem({ contestant, score }: ContestantItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.draw}>{`#${contestant.draw} `}</div>
      <div className={styles.label}>
        <CountryLabel code={contestant.code} />
      </div>
      {score != null && <div className={styles.score}>{score}</div>}
    </div>
  );
}
