import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const MOVIE_NAME = [
    'Mamma mia',
    'Mamma mia: Here we go again',
    'Tokyo Drift',
    'One day',
    'Star Wars: The Force Awakens',
    'Aladdin',
    'Friends With Benefits',
    'Safe Heaven',
    'Star Wars: The last Jedi',
    'The Visitation',
    'Harry Potter and the half-blood prince',
    'Anyone but you',
    'Elements',
    'Interstellar',
    'The Matrix',
    'The Princess Diaries',
    'Maleficent: Mistress of evil',
    'Beauty and the Beast',
    'Wish',
    'Matilda',
    
];

const movies = [...Array(20)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/movies/movie_${setIndex}.jpg`,
    name: MOVIE_NAME[index],
    stars: faker.datatype.number({ min: 1, max: 5 }),
  };
});

export default movies;