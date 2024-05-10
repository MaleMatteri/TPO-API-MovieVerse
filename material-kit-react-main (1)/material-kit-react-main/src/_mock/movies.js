import { faker } from '@faker-js/faker';
//------------------------------------------------------------

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
  {
    name: 'Star Wars: The Force Awakens',
    mainActors: ['Daisy Ridley, ', 'John Boyega, ', 'Adam Driver'],
  },
  {
    name: 'Aladdin',
    mainActors: ['Will Smith, ', 'Mena Massoud, ', 'Naomi Scott'],
  },
  {
    name: 'Friends With Benefits',
    mainActors: ['Justin Timberlake, ', 'Mila Kunis, ', 'Patricia Clarkson'],
  },
  {
    name: 'Safe Haven',
    mainActors: ['Julianne Hough, ', 'Josh Duhamel, ', 'Cobie Smulders'],
  },
  {
    name: 'Star Wars: The Last Jedi',
    mainActors: ['Mark Hamill, ', 'Carrie Fisher, ', 'Adam Driver'],
  },
  {
    name: 'The Visitation',
    mainActors: ['Edward Furlong, ', 'Kelly Lynch, ', 'Randy Travis'],
  },
  {
    name: 'Harry Potter and the Half-Blood Prince',
    mainActors: ['Daniel Radcliffe, ', 'Emma Watson, ', 'Rupert Grint'],
  },
  {
    name: 'Anyone But You',
    mainActors: ['Joshua Garcia, ', 'Barbie Imperial, ', 'Mccoy De Leon'],
  },
  {
    name: 'Elements',
    mainActors: ['Charlie David, ', 'Brad Alphonso, ', 'Vincent Bilancio'],
  },
  {
    name: 'Interstellar',
    mainActors: ['Matthew McConaughey, ', 'Anne Hathaway, ', 'Jessica Chastain'],
  },
  {
    name: 'The Matrix',
    mainActors: ['Keanu Reeves, ', 'Laurence Fishburne, ', 'Carrie-Anne Moss'],
  },
  {
    name: 'The Princess Diaries',
    mainActors: ['Anne Hathaway, ', 'Julie Andrews, ', 'Heather Matarazzo'],
  },
  {
    name: 'Maleficent: Mistress of Evil',
    mainActors: ['Angelina Jolie, ', 'Elle Fanning, ', 'Michelle Pfeiffer'],
  },
  {
    name: 'Beauty and the Beast',
    mainActors: ['Emma Watson, ', 'Dan Stevens, ', 'Luke Evans'],
  },
  {
    name: 'Wish',
    mainActors: ['Joel Courtney, ', 'Danielle Rose Russell, ', 'Skyler Gisondo'],
  },
  {
    name: 'Matilda',
    mainActors: ['Mara Wilson, ', 'Danny DeVito, ', 'Rhea Perlman'],
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
