import classNames from 'classnames';
import { CSSProperties } from 'react';
import CountryLabel from '../countries/CountryLabel';
import styles from './ContestantItem.module.css';

interface ContestantItemProps {
  ranking: number;
  code: string;
  score?: number | null;
  highlight?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function ContestantItem({ className, ranking, code, highlight, score, style }: ContestantItemProps) {
  return (
    <div className={classNames(styles.item, className, highlight && styles.highlight)} style={style}>
      <div className={styles.draw}>{String(ranking).padStart(2, '0')}</div>
      <div className={styles.label}>
        <CountryLabel code={code} />
      </div>
      {score != null && <div className={styles.score}>{score}</div>}
    </div>
  );
}
