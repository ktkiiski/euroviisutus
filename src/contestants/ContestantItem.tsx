import classNames from 'classnames';
import { CSSProperties } from 'react';
import CountryLabel from '../countries/CountryLabel';
import Contestant from './Contestant';
import styles from './ContestantItem.module.css';

interface ContestantItemProps {
  contestant: Contestant;
  score?: number | null;
  className?: string;
  style?: CSSProperties;
}

export default function ContestantItem({ className, contestant, score, style }: ContestantItemProps) {
  return (
    <div className={classNames(styles.item, className)} style={style}>
      <div className={styles.draw}>{String(contestant.draw).padStart(2, '0')}</div>
      <div className={styles.label}>
        <CountryLabel code={contestant.code} />
      </div>
      {score != null && <div className={styles.score}>{score}</div>}
    </div>
  );
}
