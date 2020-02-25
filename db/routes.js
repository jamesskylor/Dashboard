const db = require('./mdlrQuery');
const { body, check } = require('express-validator');

/*
Information that the JS needs

SELECT * FROM users

SELECT * FROM users WHERE id = $1

SELECT * FROM userData WHERE id = $1

SELECT * FROM companyData WHERE id = $1

INSERT INTO users (name, email, avatar) VALUES ($1, $2, $3)

INSERT INTO userData (id, linkedURL, githubURL, eduLVL, expArea, techFounder, coFounder, accomplishments, location, applicationStat, publicity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)

INSERT INTO companyData (id, name, site, description, verticality, product, raisondetre, fulltime, progress, progressPlus, incorporated, publicity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)

The three UPDATE ___ SET ___ WHERE id = $#

*/

// works
const getUsers = (req, res) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
}

// works
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
}

// works
const getUDataById = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('SELECT * FROM userData WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
}

// works
const getCDataById = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('SELECT * FROM companyData WHERE id = $1', [id], (err, results) => {
        res.status(200).json(results.rows);
    });
}

// works
const createUser = (req, res) => {
    const {name, email, avatar} = req.body;
    db.query('INSERT INTO users (name, email, avatar) VALUES ($1, $2, $3)', [name, email, avatar], (err, results) => {
        if(err) throw err;
        // results.insertID doesn't exist
        res.status(201).send(`User added with ID: ${results.insertID}`);
    });
}

// works
const createUData = (req, res) => {
    const id = parseInt(req.params.id);
    const {linkedURL, githubURL, eduLVL, expArea, techFounder, coFounder, accomplishments, location, applicationStat, publicity} = req.body;
    db.query(
        'INSERT INTO userData (id, linkedURL, githubURL, eduLVL, expArea, techFounder, coFounder, accomplishments, location, applicationStat, publicity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [id, linkedURL, githubURL, eduLVL, expArea, techFounder, coFounder, accomplishments, location, applicationStat, publicity],
        (err, results) => {
            if(err) throw err;
            res.status(201).send(`User data added with ID: ${results.insertID}`);
        }
    );
}

// works
const createCData = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, site, description, verticality, product, raisondetre, fulltime, progress, progressPlus, incorporated, publicity} = req.body;
    db.query(
        'INSERT INTO companyData (id, name, site, description, verticality, product, raisondetre, fulltime, progress, progressPlus, incorporated, publicity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        [id, name, site, description, verticality, product, raisondetre, fulltime, progress, progressPlus, incorporated, publicity],
        (err, results) => {
            if(err) throw err;
            res.status(201).send(`Company data added with ID: ${results.insertID}`);
        }
    );
}

// works
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email, avatar} = req.body;
    db.query(
        'UPDATE users SET name = $1, email = $2, avatar = $3 WHERE id = $4',
        [name, email, avatar, id],
        (err, results) => {
            if(err) throw err;
            res.status(200).send(` modified with ID: ${id}`);
        }
    );
}

// works
const updateUData = (req, res) => {
    const id = parseInt(req.params.id);
    const {linkedURL, githubURL, eduLVL, expArea, techFounder, coFounder, accomplishments, location, applicationStat, publicity} = req.body;
    db.query(
        'UPDATE userData SET linkedURL = $1, githubURL = $2, eduLVL = $3, expArea = $4, techFounder = $5, coFounder = $6, accomplishments = $7, location = $8, applicationStat = $9, publicity = $10 WHERE id = $11',
        [linkedURL, githubURL, eduLVL, expArea, techFounder, coFounder, accomplishments, location, applicationStat, publicity, id],
        (err, results) => {
            if(err) throw err;
            res.status(200).send(` modified with ID: ${id}`);
        }
    );
}

// works
const updateCData = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, site, description, verticality, product, raisondetre, fulltime, progress, progressPlus, incorporated, publicity} = req.body;
    db.query(
        'UPDATE companyData SET name = $1, site = $2, description = $3, verticality = $4, product = $5, raisondetre = $6, fulltime = $7, progress = $8, progressPlus = $9, incorporated = $10, publicity = $11 WHERE id = $12',
        [name, site, description, verticality, product, raisondetre, fulltime, progress, progressPlus, incorporated, publicity, id],
        (err, results) => {
            if(err) throw err;
            res.status(200).send(` modified with ID: ${id}`);
        }
    );
}

// works
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).send(`User deleted with ID: ${id}`);
    });
}

// works
const deleteUData = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('DELETE FROM userData WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).send(`User data deleted with ID: ${id}`);
    });
}

// works
const deleteCData = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('DELETE FROM companyData WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).send(`Company data deleted with ID: ${id}`);
    });
}

// Functions using db.query

module.exports = {
    getUsers,
    getUserById,
    getUDataById,
    getCDataById,
    createUser,
    createUData,
    createCData,
    updateUser,
    updateUData,
    updateCData,
    deleteUser,
    deleteUData,
    deleteCData,
}