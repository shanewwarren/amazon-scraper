DROP TABLE IF EXISTS Store;
CREATE TABLE Store (
  Id INTEGER PRIMARY KEY
  Name TEXT
);

DROP TABLE IF EXISTS Product;
CREATE TABLE Product(
  Id INTEGER PRIMARY KEY,
  Name TEXT,
  Description TEXT,
  Price DECIMAL,
  StoreId INTEGER,
  Url TEXT,
  Created DATETIME,
  Modified DATETIME
);

DROP TABLE IF EXISTS ChangeLog;
CREATE TABLE ChangeLog (
    Id INTEGER PRIMARY KEY,
    Table TEXT,
    Column TEXT,
    OldValue TEXT,
    NewValue TEXT,
    TransactionId INTEGER
);

DROP TABLE IF EXISTS Transaction;
CREATE TABLE Transaction (
    Id INTEGER PRIMARY KEY,
    TransactionDate DATETIME
);

-- create table ProductChangeLog (
--   person_id integer,
--   car_id integer
-- );
