SELECT 
    a.id, 
    a.name, 
    a.city,
    COUNT(m.id) AS messages_received
FROM 
    advisors a
LEFT JOIN 
    messages m ON a.id = m.advisor_id
GROUP BY 
    a.id, 
    a.name, 
    a.city
ORDER BY 
    messages_received DESC
LIMIT 5;