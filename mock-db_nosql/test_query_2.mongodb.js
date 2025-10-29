use("sample_mflix");

db.movies.aggregate([
  { $match: { year: { $gte: 2000, $lte: 2010 } } },
  { $group: { _id: "$year", totalMovies: { $sum: 1 } } },
  { $sort: { _id: 1 } },
  { $project: {_id: 0, year: "$_id", totalMovies: "$totalMovies"}}
]);

