import Contestant from '../contestants/Contestant';
import getCountryCodeByName from '../countries/getCountryCodeByName';
import Contest from './Contest';

const contests: Contest[] = [
  {
    id: '2023-final',
    title: '2023 Final',
    contestants: makeContestants([
      'Austria',
      'Portugal',
      'Switzerland',
      'Poland',
      'Serbia',
      'France',
      'Cyprus',
      'Spain',
      'Sweden',
      'Albania',
      'Italy',
      'Estonia',
      'Finland',
      'Czech Republic',
      'Australia',
      'Belgium',
      'Armenia',
      'Moldova',
      'Ukraine',
      'Norway',
      'Germany',
      'Lithuania',
      'Israel',
      'Slovenia',
      'Croatia',
      'United Kingdom',
    ]),
  },
  {
    id: '2022-final',
    title: '2022 Final',
    contestants: makeContestants([
      'Czech Republic',
      'Romania',
      'Portugal',
      'Finland',
      'Switzerland',
      'France',
      'Norway',
      'Armenia',
      'Italy',
      'Spain',
      'Netherlands',
      'Ukraine',
      'Germany',
      'Lithuania',
      'Azerbaijan',
      'Belgium',
      'Greece',
      'Iceland',
      'Moldova',
      'Sweden',
      'Australia',
      'United Kingdom',
      'Poland',
      'Serbia',
      'Estonia',
    ]),
  },
];

export default contests;

function makeContestants(names: string[]): Contestant[] {
  return names
    .map((name, index) => {
      const code = getCountryCodeByName(name);
      return {
        code,
        draw: index + 1,
      };
    })
    .filter(({ code }) => code !== 'FI');
}
