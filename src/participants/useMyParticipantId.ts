import { v4 as uuid } from 'uuid';

const localstorageKey = 'participantId';

function getMyParticipantId(): string {
  let id: string | null = null;
  try {
    const json = localStorage.getItem(localstorageKey);
    if (json) {
      id = JSON.parse(json);
    }
  } catch {
    // Cannot read the participant ID
  }
  if (!id) {
    id = uuid();
    localStorage.setItem(localstorageKey, JSON.stringify(id));
  }
  return id;
}

export default function useMyParticipantId(): string {
  return getMyParticipantId();
}
