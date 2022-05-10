import Contestant from './Contestant';

export default interface Contest {
  id: string;
  contestants: Contestant[];
}
