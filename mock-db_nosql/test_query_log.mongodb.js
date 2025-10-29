use("sample_mflix");

db.movies.aggregate([
	{$match: {directors: "Christopher Nolan"}},
	{$sort: {year: -1}},
	{$limit: 5},
	{$project: {_id: 0, title: 1, year: 1}}
]);


db.movies.aggregate([
  { $match: { year: { $gte: 2000, $lte: 2010 } } },
  { $group: { _id: "$year", totalMovies: { $sum: 1 } } },
  { $sort: { _id: 1 } },
  { $project: {_id: 0, year: "$_id", totalMovies: "$totalMovies"}}
]);

