use("chrome-burger-db");

// Challenge 1: Write a query to see a list of all employees working at Chrome & Burger.
db.staff.find();

// Challenge 2: Write a query to find all menu items that fall under the 'Burger' category.
db.menu_items.find({ category: "Burger" });

// Challenge 3: Write a query to show all menu items, but list them from the most expensive to the least expensive.
db.menu_items.find().sort({ price: -1 }).projection({ name: 1, price: 1, _id: 0 });

// Challenge 4: Write a query to find the three cheapest items available on the menu.
db.menu_items.find({}, { name: 1, price: 1, _id: 0 }).sort({ price: 1 }).limit(3);

// Challenge 5: Write a query to find all the ingredients supplied by 'Patty''s Premium Meats'.
db.suppliers.aggregate([
	{ $lookup: {
		from: "ingredients",
		localField: "_id",
		foreignField: "supplier_id",
		as: "supplier_info"
		}
	},
	{ $match: { name: "Patty's Premium Meats" } },
	// { $unwind: "$supplier_info" },
	{ $project: { _id: 0, ingredient_name: "$supplier_info.name" } }
]);

// Challenge 6: Write a query to see all orders processed by the staff member Jane Doe.
db.staff.aggregate([
	{ $lookup: {
		from: "orders",
		localField: "_id",
		foreignField: "staff.staff_id",
		as: "staff_orders"
		}
	},
	{ $match: { first_name: "Jane", last_name: "Doe" } },
	// { $unwind: "$staff_orders" },
	{ $project: { _id: 0, first_name: 1, last_name: 1, order_date: "$staff_orders.order_date"} }
]);

// Challenge 7: Write a query to find out how many orders each staff member has processed. Show the staff member's first name, last_name, and their total order count.
db.orders.aggregate([
	{ $group: {
		_id: "$staff.staff_id",
		full_name: { $first: { $concat: [ "$staff.first_name", " ", "$staff.last_name" ] } },
		total_orders: { $sum: 1 }
		}
	},
	{ $project: { _id: 0, full_name: 1, total_orders: 1 } }
]);

// Challenge 8: Write a query to calculate the total revenue for each day of sales.
db.orders.aggregate([
	{ $group: {
		_id: { $dateToString: { format: "%Y-%m-%d", date: "$order_date" } },
		daily_revenue: { $sum: "$total_price" }
		}
	},
	{ $project: { _id: 0, daily_date: "$_id", daily_revenue: "$daily_revenue" } },
	{ $sort: { daily_date: 1 } }
]);

// Challenge 9: Write a query to find out which menu item has been ordered the most.
db.orders.aggregate([
	{ $unwind: "$items" },
	{ $group: {
		_id: "$items.name",
		total_ordered: { $sum: "$items.quantity" }
		}
	},
	{ $project: { _id: 0, menu_name: "$_id", total_ordered: "$total_ordered" } },
	{ $sort: { total_ordered: -1 } },
	{ $limit: 1 }
]);

// Challenge 10: Write a query that lists all the ingredients and their quantities needed for the 'Bacon Cheeseburger'.
db.menu_items.aggregate([
	{ $match: { name: "Bacon Cheeseburger" } },
	{ $unwind: "$recipe" },
	{ $project: { _id: 0, ingredient_name: "$recipe.name", quantity_needed: "$recipe.quantity_needed" } }
]);

