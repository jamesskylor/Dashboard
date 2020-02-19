CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    avatar VARCHAR(2048),
);

CREATE TABLE userData {
    id PRIMARY KEY,
    linkedURL VARCHAR(2048),
    githubURL VARCHAR(2048),
    eduLVL VARCHAR(8),
    expArea VARCHAR(64),
    techFounder CHAR,
    coFounder CHAR,
    accomplishments TEXT,
    location VARCHAR(128),
    applicationStat VARCHAR(16),
    publicity CHAR,
}

CREATE TABLE companyData {
    id PRIMARY KEY,
    name VARCHAR(50),
    site VARCHAR(2048),
    description TEXT,
    verticality VARCHAR(32),
    product VARCHAR(128),
    raisondetre TEXT,
    fulltime CHAR,
    progress VARCHAR(32),
    progressPlus TEXT,
    incorporated CHAR,
    publicity CHAR,
}

CREATE TABLE updates {
    id INT,
    updateDate TIMESTAMPTZ,
    
}

INSERT INTO users ( )
VALUES ( );