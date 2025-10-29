use("chrome-burger-db");

// Challenge 10: Write a query that lists all the ingredients and their quantities needed for the 'Bacon Cheeseburger'.
db.menu_items.aggregate([
	{ $match: { name: "Bacon Cheeseburger" } },
	{ $unwind: "$recipe" },
	{ $project: { _id: 0, ingredient_name: "$recipe.name", quantity_needed: "$recipe.quantity_needed" } }
]);

