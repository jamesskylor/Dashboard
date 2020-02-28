CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    passwordhash TEXT NOT NULL,
    avatar VARCHAR(2048)
);

CREATE TABLE userData (
    id INT PRIMARY KEY,
    linkedURL VARCHAR(2048),
    githubURL VARCHAR(2048),
    eduLVL VARCHAR(8) NOT NULL,
    expArea VARCHAR(64) NOT NULL,
    techFounder CHAR NOT NULL,
    coFounder CHAR NOT NULL,
    accomplishments TEXT,
    location VARCHAR(128) NOT NULL,
    applicationStat VARCHAR(16) NOT NULL,
    publicity CHAR NOT NULL
);

CREATE TABLE companyData (
    id INT PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    site VARCHAR(2048) NOT NULL,
    description TEXT,
    verticality VARCHAR(32) NOT NULL,
    product VARCHAR(128) NOT NULL,
    raisondetre TEXT,
    fulltime CHAR NOT NULL,
    progress VARCHAR(32) NOT NULL,
    progressPlus TEXT,
    incorporated CHAR NOT NULL,
    publicity CHAR NOT NULL
);

CREATE TABLE updates (
    id INT NOT NULL,
    updateDate TEXT,
    launch INT,
    users INT,
    userLearning TEXT,
    goals TEXT,
    improvement TEXT,
    biggestObstacle TEXT,
    news TEXT,
    morale INT,
    revenue FLOAT,
    moneyInTheBank FlOAT,
    monthlyBurnRate FLOAT,
    productUpdates TEXT,
    marketing TEXT,
    offersAccepted INT,
    offersDeclined INT,
    offersOutstanding INT,
    hiresFires TEXT,
    support TEXT                 
);

INSERT INTO updates (id,updateDate, launch, users, userLearning, goals, improvement, biggestObstacle, news, morale,revenue, moneyInTheBank, monthlyBurnRate, productUpdates, marketing, offersAccepted, offersDeclined, offersOutstanding, hiresFires, support)
VALUES ('1','2017-07-24', '1','100', 'learning', 'Learng more about users', 'grow start-up', 'Finding Users', 'talked to potential LPS', '10', '2000.50', '100','10',  'product doing well', 'Got pres from major news outlets', '10', '20', '5', 'Hired Great senior executive of marketing fired old vp', 'need help');

INSERT INTO users (name, email, passwordhash, avatar)
VALUES ('Jason X', 'jason@temporary.placeholder', 'thisIsTheOnlyUnhashedPassword', 'http://www.doesntexist.com');

INSERT INTO userData (id, linkedURL, githubURL, eduLVL, expArea, techFounder, coFounder, accomplishments, location, applicationStat, publicity)
VALUES (1, 'http://www.thelinkedin.url/doesnt-exist', 'http://www.notgithub.com', 'HS', 'Java', 'Y', 'Y', 'Did stuff', 'Waterloo, Ontario', 'Not Submitted', 'Y');

INSERT INTO companyData (id, name, site, description, verticality, product, raisondetre, fulltime, progress, progressPlus, incorporated, publicity)
VALUES (1, 'Jason Inc.', 'http://jason.xorheez', 'Entertainment', 'B2C', 'We sell halloween decor and services', 'Not spooky enough', 'Y', 'Pretty early', 'Does not exist', 'Y', 'Y');