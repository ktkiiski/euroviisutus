import Vote from '../voting/Vote';

export default interface Participant {
  id: string;
  name: string;
  votes: Vote[];
}
