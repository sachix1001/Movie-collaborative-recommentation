let allData = require("../data/allData.json");
let ratings = require("../data/ratings.json");
const _ = require('lodash')
ratings = ratings.map(rating => rating.movieId)
ratings = Array.from(new Set(ratings))

allData = _.uniqBy(allData, 'movie_id'); 
allData = allData
.filter(data => data.popularity > 8 && data.popularity < 10)
.filter(data => ratings.includes(String(data.movie_id)))
  .map(data => {
    return {
      movie_id: data.movie_id,
      genres: data.genres,
      imdb_id: data.imdb_id,
      popularity: data.popularity,
      overview: data.overview,
      title: data.title,
      poster: data.poster,
      keywords: data.keywords
    };
  });


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("movies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("movies").insert(allData);
    });
};
