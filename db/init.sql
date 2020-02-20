CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    avatar VARCHAR(2048)
);

CREATE TABLE userData (
    id INT PRIMARY KEY,
    linkedURL VARCHAR(2048),
    githubURL VARCHAR(2048),
    eduLVL VARCHAR(8),
    expArea VARCHAR(64),
    techFounder CHAR,
    coFounder CHAR,
    accomplishments TEXT,
    location VARCHAR(128),
    applicationStat VARCHAR(16),
    publicity CHAR
);

CREATE TABLE companyData (
    id INT PRIMARY KEY,
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
    publicity CHAR
);

CREATE TABLE updates (
    id INT,
    updateDate TIMESTAMPTZ,
    
);

INSERT INTO users (name, email, avatar)
VALUES ('Jason X', 'jason@temporary.placeholder', 'http://www.doesntexist.com');

INSERT INTO userData (id, linkedURL, githubURL, eduLVL, expArea, techFounder, coFounder, accomplishments, location, applicationStat, publicity)
VALUES (1, 'http://www.thelinkedin.url/doesnt-exist', 'http://www.notgithub.com', 'HS', 'Java', 'Y', 'Y', 'Did stuff', 'Waterloo, Ontario', 'Not Submitted', 'Y');

INSERT INTO companyData (id, name, site, description, verticality, product, raisondetre, fulltime, progress, progressPlus, incorporated, publicity)
VALUES (1, 'Jason Inc.', 'http://jason.xorheez', 'Entertainment', 'B2C', 'We sell halloween decor and services', 'Not spooky enough', 'Y', 'Pretty early', 'Does not exist', 'Y', 'Y');