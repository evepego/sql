const name = "Eve-ANDRE-BRENNER"
const promo = "B2A"


const q1 = `
  SELECT Name
  FROM Track
  WHERE Milliseconds < (SELECT Milliseconds
  FROM Track
  WHERE TrackId = 3457)
`

const q2 = `
  SELECT t.Name
  FROM Track t
  JOIN MediaType m
  ON t.MediaTypeId = m.MediaTypeId
  WHERE m.name = (SELECT m.name
  FROM Track t
  JOIN MediaType m ON t.MediaTypeId = m.MediaTypeId
  WHERE t.name = 'Rehab')
`

const q3 = `
  SELECT p.Name, COUNT(p.Name) "Nombre chanson", SUM(t.Milliseconds) "durée totale playliste", (SUM(t.Milliseconds)/COUNT(p.Name)) "temps moyen d'une chanson"
  FROM Playlist p
  JOIN PlaylistTrack pt
  ON p.PlaylistId = pt.PlaylistId
  JOIN Track t
  ON pt.TrackId = t.TrackId
  GROUP BY p.Name
`

const q6 = `
  SELECT c.LastName, i.BillingCountry, i.Total
  FROM Customer c
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  WHERE i.BillingCountry <> 'France'
  INTERSECT
  SELECT c.LastName, i.BillingCountry, i.Total
  FROM Customer c
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  WHERE i.Total > (
  SELECT MAX(Total)
  FROM Invoice
  WHERE BillingCountry = 'France'
  )
`

const q10 = `
  SELECT ar.Name AS "Artiste",
  COUNT(ar.Name) AS "Nombre de chansons par Artiste",
  AVG(t.UnitPrice) AS "Prix moyen des chansons",
  MAX(ar.ArtistId) AS "Nombre maximum de chansons"
  FROM Playlist p
  JOIN PlaylistTrack pt
  ON p.PlaylistId = pt.PlaylistId
  JOIN Track t
  ON pt.TrackId = t.TrackId
  JOIN Album al
  ON t.AlbumId = al.AlbumId
  JOIN Artist ar
  ON al.ArtistId = ar.ArtistId
  GROUP BY p.Name, ar.Name
  ORDER BY p.Name
`

const q14 = `
  SELECT i.InvoiceId,
  AVG(il.UnitPrice) AS "Cout moyen par chanson",
  SUM(t.Milliseconds) AS "Duree total des chansons",
  (il.UnitPrice/(t.Milliseconds/1000)) AS "Coût des chansons par seconde"
  FROM Invoice i
  JOIN InvoiceLine il
  ON i.InvoiceId = il.InvoiceId
  JOIN Track t
  ON il.TrackId = t.TrackId
  GROUP BY i.InvoiceId, (il.UnitPrice/(t.Milliseconds/1000))
  ORDER BY AVG(il.UnitPrice)
`

const q16 = `
  SELECT e.LastName, e.FirstName, SUM(i.InvoiceId) AS "Ventes", e.EmployeeId
  FROM Employee e
  JOIN Customer c
  ON e.EmployeeId = c.SupportRepId
  JOIN Invoice i
  ON c.CustomerId = i.CustomerId
  WHERE e.EmployeeId = 3
  GROUP BY e.LastName, e.FirstName, e.EmployeeId
`

const q18 = `
  CREATE DATABASE role_user CHARACTER SET 'utf8'
  CREATE TABLE IF NOT EXISTS User_Group (
    user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    group_id INT NOT NULL, 
  )

  CREATE TABLE IF NOT EXISTS Group (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
  )

  CREATE TABLE IF NOT EXISTS User (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    superuser BOOLEAN NOT NULL, 
    PRIMARY KEY (id)
  )

  CREATE TABLE IF NOT EXISTS Group_Role (
    group_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL,
  )

  CREATE TABLE IF NOT EXISTS Role (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
  )

  CREATE TABLE IF NOT EXISTS User_Role (
    user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL,
  )

  CREATE TABLE IF NOT EXISTS Role_Permission (
    role_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    permission_id INT NOT NULL,
  )

  CREATE TABLE IF NOT EXISTS Permission (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
  );
`

const q19 = `
    INSERT INTO Track (Name, MediaTypeId, Composer, Milliseconds)
    VALUES
    ('Factice', 1, 'Josman', 198600),
    ('High life' 1, 'Josman', 205800),
    ('Blues', 1, 'A2H', 153000)
`

const q20 = `
    INSERT INTO  Employee (FirstName, LastName, Country)
    VALUES
    ('Eve', 'Andre', 'France'),
    ('Manon', 'Fargues', 'France')
`

const q21 = `
    DELETE FROM Invoice
    WHERE CONVERT(YEAR, InvoiceDate) = '2010'
`

const q22 = `
    UPDATE Invoice
    SET BillingCountry = 'France'
    WHERE CONVERT(YEAR, InvoiceDate) BETWEEN '2011' AND '2014'
`

const q24 = `
    ALTER TABLE Employee
    ADD  COLUMN Salary INT NOT NULL;
`

const q25 = `
    ALTER TABLE Employee
    ADD COLUMN Salary_random INT NOT NULL DEFAULT 'FLOOR(RAND()*(100000 - 30000 + 1)+30000);
`

const q26 = `
    ALTER TABLE Invoice
    DROP BillingPostCode;
`

// NE PAS TOUCHER CETTE SECTION
const tp = {name: name, promo: promo, queries: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26]}
module.exports = tp
