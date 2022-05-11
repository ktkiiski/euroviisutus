import Contestant from '../contestants/Contestant';

export default interface Contest {
  id: string;
  contestants: Contestant[];
}
