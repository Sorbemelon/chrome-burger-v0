-- Write a query to find out which menu item has been ordered the most.

SELECT
     m.name AS "Menu Name",
     SUM(o.quantity) AS "Total Ordered" 
FROM orderitems o
JOIN menuitems m ON o.item_id = m.item_id
GROUP BY m.name
ORDER BY "Total Ordered" DESC;