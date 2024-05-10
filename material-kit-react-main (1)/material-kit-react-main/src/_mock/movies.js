import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

// const MOVIE_NAME = [
//     'Mamma mia',
//     'Mamma mia: Here we go again',
//     'Tokyo Drift',
//     'One day',
//     'Star Wars: The Force Awakens',
//     'Aladdin',
//     'Friends With Benefits',
//     'Safe Heaven',
//     'Star Wars: The last Jedi',
//     'The Visitation',
//     'Harry Potter and the half-blood prince',
//     'Anyone but you',
//     'Elements',
//     'Interstellar',
//     'The Matrix',
//     'The Princess Diaries',
//     'Maleficent: Mistress of evil',
//     'Beauty and the Beast',
//     'Wish',
//     'Matilda',
// ];

const movies = [...Array(20)].map((_, index) => {
  const setIndex = index + 1;
const MOVIE_DATA = [
  {
    name: 'Mamma mia',
    mainActors: ['Meryl Streep, ', 'Pierce Brosnan, ', 'Colin Firth'],
  },
  {
    name: 'Mamma mia: Here we go again',
    mainActors: ['Lily James, ', 'Amanda Seyfried, ', 'Meryl Streep'],
  },
  {
    name: 'Tokyo Drift',
    mainActors: ['Lucas Black, ', 'Bow Wow, ', 'Nathalie Kelley'],
  },
  {
    name: 'One Day',
    mainActors: ['Leo Woodall, ', 'Ambika Mod, ', 'Amber Grappy'],
  },
];

const movies = MOVIE_DATA.map((movieData, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/movies/movie_${index + 1}.jpg`,
  name: movieData.name,
  stars: faker.datatype.number({ min: 1, max: 5 }),
  cast: movieData.mainActors,
}));

export default movies;
