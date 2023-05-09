import Contestant from '../contestants/Contestant';
import getCountryCodeByName from '../countries/getCountryCodeByName';
import Contest from './Contest';

const contests: Contest[] = [
  {
    id: '2022-final',
    title: 'Final 2022',
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
  {
    // TODO: remove this
    id: '2022-semifinal',
    title: '1st Semifinal 2022',
    contestants: [
      { draw: 1, code: 'AL' },
      { draw: 2, code: 'LV' },
      { draw: 3, code: 'LT' },
      { draw: 4, code: 'CH' },
      { draw: 5, code: 'SI' },
      { draw: 6, code: 'UA' },
      { draw: 7, code: 'BG' },
      { draw: 8, code: 'NL' },
      { draw: 9, code: 'MD' },
      { draw: 10, code: 'PT' },
      { draw: 11, code: 'HR' },
      { draw: 12, code: 'DK' },
      { draw: 13, code: 'AT' },
      { draw: 14, code: 'IS' },
      { draw: 15, code: 'GR' },
      { draw: 16, code: 'NO' },
      { draw: 17, code: 'AM' },
    ],
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
