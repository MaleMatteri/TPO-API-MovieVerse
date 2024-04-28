import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const MOVIE_NAME = [
    'Mamma mia',
    'Mamma mia: Here we go again',
    'Tokyo Drift',
    'One day',
];

const movies = [...Array(4)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/movies/movie_${setIndex}.jpg`,
    name: MOVIE_NAME[index],
    stars: faker.datatype.number({ min: 1, max: 5 }),
  };
});

export default movies;