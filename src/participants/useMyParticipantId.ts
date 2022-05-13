import { useStorage } from 'react-tidy';

export default function useMyParticipantId(): [string | null, (id: string) => void] {
  return useStorage<string>('participantId', null);
}
