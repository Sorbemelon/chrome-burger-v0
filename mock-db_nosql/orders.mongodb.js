// To run this script, make sure your database is selected in the VS Code extension.
use("chrome-burger-db");

// This command will delete all existing documents in the 'orders' collection.
// Comment it out if you want to append the data instead of replacing it.
db.getCollection("orders").deleteMany({});

// Insert the documents into the 'orders' collection.
db.getCollection("orders").insertMany([
  {
    _id: ObjectId("634d00000000000000000041"),
    order_date: ISODate("2025-10-26T12:05:00Z"),
    total_price: Decimal128("34.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000032"),
        name: "Bacon Cheeseburger",
        price: Decimal128("14.00"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000031"),
        name: "The All-American",
        price: Decimal128("12.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000037"),
        name: "Soda",
        price: Decimal128("2.50"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000042"),
    order_date: ISODate("2025-10-26T12:10:00Z"),
    total_price: Decimal128("19.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000033"),
        name: "The Aloha Burger",
        price: Decimal128("13.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000036"),
        name: "Onion Rings",
        price: Decimal128("6.00"),
        quantity: 1,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000043"),
    order_date: ISODate("2025-10-26T12:15:00Z"),
    total_price: Decimal128("25.00"),
    staff: {
      staff_id: ObjectId("634d00000000000000000011"),
      first_name: "Jane",
      last_name: "Doe",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000031"),
        name: "The All-American",
        price: Decimal128("12.50"),
        quantity: 2,
      },
    ],
  },
  {
    _id: ObjectId("634d00000000000000000044"),
    order_date: ISODate("2025-10-26T12:20:00Z"),
    total_price: Decimal128("9.50"),
    staff: {
      staff_id: ObjectId("634d00000000000000000013"),
      first_name: "Emily",
      last_name: "Jones",
    },
    items: [
      {
        menu_item_id: ObjectId("634d00000000000000000035"),
        name: "Classic Fries",
        price: Decimal128("5.00"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000037"),
        name: "Soda",
        price: Decimal128("2.50"),
        quantity: 1,
      },
      {
        menu_item_id: ObjectId("634d00000000000000000038"),
        name: "Mineral Water",
        price: Decimal128("2.00"),
        quantity: 1,
      },
    ],
  },
]);