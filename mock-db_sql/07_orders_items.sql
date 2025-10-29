-- Mock Data for OrderItems
-- Order 1 (total: 34.00)
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES
(1, 2, 1), -- 1 Bacon Cheeseburger (14.00)
(1, 1, 1), -- 1 All-American (12.50)
(1, 5, 1), -- 1 Classic Fries (5.00)
(1, 7, 1); -- 1 Soda (2.50)

-- Order 2 (total: 19.50)
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES
(2, 3, 1), -- 1 Aloha Burger (13.50)
(2, 6, 1); -- 1 Onion Rings (6.00)

-- Order 3 (total: 25.00)
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES
(3, 1, 2); -- 2 All-American (2 * 12.50 = 25.00)

-- Order 4 (total: 9.50)
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES
(4, 5, 1), -- 1 Classic Fries (5.00)
(4, 7, 1), -- 1 Soda (2.50)
(4, 8, 1); -- 1 Bottled Water (2.00)