CREATE TABLE IF NOT EXISTS "hikes"(
  "id"                              SERIAL            PRIMARY KEY  NOT NULL,
  "hikeDate"                       VARCHAR(100)      NOT NULL,
  "name"                        VARCHAR(100)      NOT NULL,
  "distance"                       VARCHAR(100)  NOT NULL,
  "location"                           VARCHAR(200)      NOT NULL,  
  "weather"                           VARCHAR(200)      NOT NULL
);