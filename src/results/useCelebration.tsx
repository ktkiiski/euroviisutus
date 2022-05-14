import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function useCelebration(enabled: boolean) {
  const [runAnimation, setRunAnimation] = useState(enabled);

  useEffect(() => {
    setRunAnimation(enabled);
    if (!enabled) return undefined;
    const stopTimeout = setTimeout(() => setRunAnimation(false), 15000);
    return () => clearTimeout(stopTimeout);
  }, [enabled]);

  return runAnimation ? <Confetti run={runAnimation} /> : null;
}
