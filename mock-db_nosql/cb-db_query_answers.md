# MongoDB Learning Questions: The Chrome & Burger Database

This document provides a series of questions to help you learn how to query a MongoDB database using the Chrome & Burger dataset. The questions are designed to progress from beginner to intermediate concepts.

---

## Beginner Level Questions

### Question 1: View All Staff Members

**Task:** Write a query to see a list of all employees working at Chrome & Burger.

**Answer:**
```javascript
db.staff.find({});
```
**Concept:** This is the most basic use of `find`. An empty query document `{}` matches all documents in the collection. It's the equivalent of `SELECT *`.

### Question 2: Find All Burgers on the Menu

**Task:** Write a query to find all menu items that fall under the 'Burger' category.

**Answer:**
```javascript
db.menu_items.find({ category: 'Burger' });
```
**Concept:** The query document `{ category: 'Burger' }` is used to filter for documents where the `category` field has the exact value 'Burger'. This is analogous to a `WHERE` clause.

### Question 3: List Menu Items by Price

**Task:** Write a query to show all menu items, but list them from the most expensive to the least expensive.

**Answer:**
```javascript
db.menu_items.find({}, { name: 1, price: 1, _id: 0 }).sort({ price: -1 });
```
**Concept:**
- **`sort({ price: -1 })`:** Used to sort the results. `-1` specifies a descending order.
- **Projection (`{ name: 1, price: 1, _id: 0 }`):** The second argument in `find` is for projection. `1` includes a field, and `0` excludes it. Here, we explicitly include `name` and `price` and exclude the default `_id`.

### Question 4: Find the 3 Cheapest Items on the Menu

**Task:** Write a query to find the three cheapest items available on the menu.

**Answer:**
```javascript
db.menu_items.find({}, { name: 1, price: 1, _id: 0 }).sort({ price: 1 }).limit(3);
```
**Concept:**
- **`limit(3)`:** Restricts the number of documents returned to 3.
- **`sort({ price: 1 })`:** `1` specifies an ascending order. This query sorts by price from lowest to highest and returns only the top 3.

### Question 5: Find Ingredients from a Specific Supplier

**Task:** Write a query to find all the ingredients supplied by 'Patty''s Premium Meats'.

**Answer:**
```javascript
db.suppliers.aggregate([
    {
        $match: { name: "Patty's Premium Meats" }
    },
    {
        $lookup: {
            from: "ingredients",
            localField: "_id",
            foreignField: "supplier_id",
            as: "supplied_ingredients"
        }
    },
    {
        $unwind: "$supplied_ingredients"
    },
    {
        $project: {
            _id: 0,
            ingredient_name: "$supplied_ingredients.name"
        }
    }
]);
```
**Concept:** This introduces the aggregation framework.
- **`$lookup`:** Performs a left outer join to another collection. It's MongoDB's equivalent of a `JOIN`.
- **`$match`:** Filters documents, similar to `find`.
- **`$unwind`:** Deconstructs an array field to output a document for each element.
- **`$project`:** Reshapes the documents, similar to projection in `find`.

### Question 6: See All Orders Processed by a Specific Staff Member

**Task:** Write a query to see all orders processed by the staff member Jane Doe.

**Answer:**
```javascript
// First, find Jane's staff ID
var jane = db.staff.findOne({first_name: "Jane", last_name: "Doe"});

// Then, find all orders processed by her
db.orders.find({ "staff.staff_id": jane._id });
```
**Concept:** This demonstrates querying based on a value in a nested/embedded document (`staff.staff_id`). We first find the `_id` for the staff member and then use it to filter the `orders` collection.

---

## Intermediate Level Questions

### Question 7: Count Orders Per Staff Member

**Task:** Write a query to find out how many orders each staff member has processed. Show the staff member's first name, last_name, and their total order count.

**Answer:**
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$staff.staff_id",
      first_name: { $first: "$staff.first_name" },
      last_name: { $first: "$staff.last_name" },
      order_count: { $sum: 1 }
    }
  },
  {
    $sort: {
      order_count: -1
    }
  },
  {
      $project: {
          _id: 0,
          first_name: 1,
          last_name: 1,
          order_count: 1
      }
  }
]);
```
**Concepts:**
- **`$group`:** Groups documents by a specified identifier.
- **`$sum: 1`:** An accumulator expression that counts the documents in each group.
- **`$first`:** Returns the value from the first document in a group for a given field.

### Question 8: Calculate Total Revenue Per Day

**Task:** Write a query to calculate the total revenue for each day of sales.

**Answer:**
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$order_date" } },
      daily_revenue: { $sum: "$total_price" }
    }
  },
  {
    $project: {
        _id: 0,
        sales_day: "$_id",
        daily_revenue: 1
    }
  },
  {
    $sort: {
      sales_day: 1
    }
  }
]);
```
**Concepts:**
- **`$dateToString`:** Converts a date object to a string, allowing us to group all orders from the same day.
- **`$sum: "$total_price"`:** Sums the numeric values of the `total_price` field for all documents in each group.

### Question 9: Find the Most Popular Menu Item

**Task:** Write a query to find out which menu item has been ordered the most.

**Answer:**
```javascript
db.orders.aggregate([
  {
    $unwind: "$items"
  },
  {
    $group: {
      _id: "$items.name",
      total_sold: { $sum: "$items.quantity" }
    }
  },
  {
      $project: {
          _id: 0,
          name: "$_id",
          total_sold: 1
      }
  },
  {
    $sort: {
      total_sold: -1
    }
  },
  {
    $limit: 1
  }
]);
```
**Concepts:** This query combines multiple stages. It first `$unwind`s the `items` array, then groups by the item's name to `$sum` the quantity sold, and finally sorts the results to find the top seller.

### Question 10: List All Ingredients for the 'Bacon Cheeseburger'

**Task:** Write a query that lists all the ingredients and their quantities needed for the 'Bacon Cheeseburger'.

**Answer:**
```javascript
db.menu_items.aggregate([
    {
        $match: { name: "Bacon Cheeseburger" }
    },
    {
        $unwind: "$recipe"
    },
    {
        $lookup: {
            from: "ingredients",
            localField: "recipe.ingredient_id",
            foreignField: "_id",
            as: "ingredient_detail"
        }
    },
    {
        $unwind: "$ingredient_detail"
    },
    {
        $project: {
            _id: 0,
            name: "$recipe.name",
            quantity_needed: "$recipe.quantity_needed",
            unit: "$ingredient_detail.unit"
        }
    }
]);
```
**Concept:** This demonstrates finding a document and then using `$lookup` on its nested array to enrich the data by joining with another collection to get ingredient details like the `unit`.