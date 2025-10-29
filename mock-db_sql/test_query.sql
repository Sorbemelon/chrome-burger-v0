-- Write a query to calculate the total revenue for each day of sales.

SELECT 
    DATE(order_date) AS date, 
    SUM(total_price) AS daily_revenue
FROM orders
GROUP BY DATE(order_date)
ORDER BY DATE(order_date) ASC;