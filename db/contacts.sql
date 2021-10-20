-- contacts table
create table contact2(
    id INT NOT NULL AUTO_INCREMENT,
firstname VARCHAR(100) NOT NULL UNIQUE,
lastname VARCHAR(100),
email VARCHAR(100) NOT NULL UNIQUE,
relationship VARCHAR(100) NOT NULL UNIQUE,
PRIMARY KEY (id)
)ENGINE=Innodb;

create table favoriteContact (
id INT NOT NULL AUTO_INCREMENT,
firstname VARCHAR(100) NOT NULL UNIQUE,
lastname VARCHAR(100),
email VARCHAR(100) NOT NULL UNIQUE,
relationship VARCHAR(100) NOT NULL UNIQUE,
PRIMARY KEY (id)
)ENGINE=Innodb;

create table workContact (
id INT NOT NULL AUTO_INCREMENT,
firstname VARCHAR(100) NOT NULL UNIQUE,
lastname VARCHAR(100),
email VARCHAR(100) NOT NULL UNIQUE,
relationship VARCHAR(100) NOT NULL UNIQUE,
PRIMARY KEY (id)
)ENGINE=Innodb;