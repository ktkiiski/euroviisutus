import Contestant from '../contestants/Contestant';

export default interface Contest {
  id: string;
  title: string;
  contestants: Contestant[];
}
