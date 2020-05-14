const AZERBAIJAN = { id: 'AZ', name: 'Azerbaijan' };
const UNITED_KINGDOM = { id: 'GB', name: 'United Kingdom' };
const RUSSIA = { id: 'RU', name: 'Russia' };
const SWITZERLAND = { id: 'CH', name: 'Switzerland' };
const BULGARIA = { id: 'BG', name: 'Bulgaria' };
const ITALY = { id: 'IT', name: 'Italy' };
const LITHUANIA = { id: 'LT', name: 'Lithuania' };
const NORWAY = { id: 'NO', name: 'Norway' };
const SWEDEN = { id: 'SE', name: 'Sweden' };
const ROMANIA = { id: 'RO', name: 'Romania' };
const ICELAND = { id: 'IS', name: 'Iceland' };
const MALTA = { id: 'MT', name: 'Malta' };
const GERMANY = { id: 'DE', name: 'Germany' };
const ISRAEL = { id: 'IL', name: 'Israel' };
const AUSTRALIA = { id: 'AU', name: 'Australia' };
const NETHERLANDS = { id: 'NL', name: 'Netherlands' };
const GEORGIA = { id: 'GL', name: 'Georgia' };
const DENMARK = { id: 'DK', name: 'Denmark' };
const BELGIUM = { id: 'BE', name: 'Belgium' };
const SPAIN = { id: 'ES', name: 'Spain' };
const GREECE = { id: 'GR', name: 'Greece' };
const FRANCE = { id: 'FR', name: 'France' };
const POLAND = { id: 'PL', name: 'Poland' };
const ARMENIA = { id: 'AM', name: 'Armenia' };
const SERBIA = { id: 'RS', name: 'Serbia' };
const FINLAND = { id: 'FI', name: 'Finland' };

const groups = [{
  title: 'Group 1',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    AZERBAIJAN,
    UNITED_KINGDOM,
    RUSSIA,
    SWITZERLAND,
    BULGARIA,
  ],
}, {
  title: 'Group 2',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    ITALY,
    LITHUANIA,
    NORWAY,
    SWEDEN,
    ROMANIA,
  ],
}, {
  title: 'Group 3',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    ICELAND,
    MALTA,
    GERMANY,
    ISRAEL,
    AUSTRALIA,
  ],
}, {
  title: 'Group 4',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    NETHERLANDS,
    GEORGIA,
    DENMARK,
    BELGIUM,
    SPAIN,
  ],
}, {
  title: 'Group 5',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    GREECE,
    FRANCE,
    POLAND,
    ARMENIA,
    SERBIA,
    FINLAND,
  ],
}];

const countries = [].concat(...groups.map((group) => group.countries));

groups.push({
  title: 'Your overall favorites',
  description: 'Choose your top 5 from all the countries!',
  points: [12, 10, 8, 6, 4],
  countries,
});

export { groups, countries };
