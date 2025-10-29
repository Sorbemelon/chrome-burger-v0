-- Schema: CREATE TABLE "twofer" ("input" TEXT, "response" TEXT);
-- Task: update the twofer table and set the response based on the input.

UPDATE twofer
SET response = CASE
    WHEN input IS NOT NULL AND input != '' 
        THEN ('One for ' || input || ', one for me.')
    ELSE 'One for you, one for me.'
END;
