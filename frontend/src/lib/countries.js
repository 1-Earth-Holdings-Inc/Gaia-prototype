import { countries as countriesData } from 'countries-list';

export const countries = Object.entries(countriesData).map(([code, data]) => ({
  code,
  name: data.name,
})).sort((a, b) => a.name.localeCompare(b.name));
