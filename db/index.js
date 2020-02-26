const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./mdlrQuery');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

const isProduction = process.env.NODE_ENV === 'production';
const origin = { // Change the https://www.example.com to whatever the site that needs to access this data is later ****************************************************************8
  origin: isProduction ? 'https://www.example.com' : '*',
}
app.use(cors(origin));

const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 36, // 5 requests,
})

app.use(limiter)

if(!isProduction) {
    process.env.API_KEY = 'notTheRealAPIKey';
}

app.get('/', (req, res)=>{
    res.json({ info: 'API for DashDB' });
});

app.get('/id', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    const email = req.header('email');
    const password = req.header('key');
    console.log(email+" "+password);
    db.query('SELECT passwordhash FROM users WHERE email = $1', [email], (error, result) => {
        if(error) throw error;
        if(result.rows.length < 1) {
            res.status(401).json({ status:'error', message: 'Invalid Login' });
        }
        else {
            var hash = result.rows[0].passwordhash;
            bcrypt.compare(password, hash, function(err, result) {
                if(err) throw err;
                if(result) {
                    db.query('SELECT id FROM users WHERE email = $1', [email], (err, results) => {
                        if(err) throw err;
                        res.status(200).json(results.rows);
                    });
                }
                else {
                    res.status(401).json({ status:'error', message: 'Invalid Login'});
                }
            });
        }
    });
});

app.get('/users', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    db.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
});
app.get('/updates', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    db.query('SELECT * FROM updates', (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
});

app.get('/updates/:id', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    db.query('SELECT * FROM updates', (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
});


app.get('/users/:id', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    const id = parseInt(req.params.id);
    db.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
}
);

app.get('/userData/:id', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    const id = parseInt(req.params.id);
    db.query('SELECT * FROM userData WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows);
    });
});

app.get('/companyData/:id', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    const id = parseInt(req.params.id);
    db.query('SELECT * FROM companyData WHERE id = $1', [id], (err, results) => {
        res.status(200).json(results.rows);
    });
});

app.post('/users',
    [
        check('name').isLength({ min: 1, max: 64 }),
        check('email').isLength({ min: 1, max: 64 }),
        check('password').isLength({ min: 6, max: 50 }),
        check('avatar').isLength({ min: 0, max: 2048 })
    ],
    (req, res) => {
        if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        const {name, email, password, avatar} = req.body;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                db.query('INSERT INTO users (name, email, passwordhash, avatar) VALUES ($1, $2, $3, $4)',
                    [name, email, hash, avatar],
                    (err, results) => {
                        if(err) throw err;
                        // results.insertID doesn't exist
                        res.status(201).send(`User added with ID: ${results.insertID}`);
                    }
                );
            });
        });
    }
);

app.post('/userData/:id',
    // Dunno how to check ID (or any parameters for that matter)
    [
        check('linkedURL').isLength({ min: 0, max: 2048 }),
        check('githubURL').isLength({ min: 0, max: 2048 }),
        check('eduLVL').isLength({ min: 1, max: 8 }),
        check('expArea').isLength({ min: 1, max: 64 }),
        check('techFounder').isLength({ min: 1, max: 1 }),
        check('coFounder').isLength({ min: 1, max: 1 }),
        check('accomplishments').isLength({ min: 0, max: 65000}),
        check('location').isLength({ min: 1, max: 128 }),
        check('applicationStat').isLength({ min: 1, max: 16 }),
        check('publicity').isLength({ min: 1, max: 1 })
    ],
    (req, res) => {
        if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
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
);

app.post('/companyData/:id',
    [
        check('name').isLength({ min: 1, max: 64 }),
        check('site').isLength({ min: 1, max: 2048 }),
        check('description').isLength({ min: 1, max: 65000 }),
        check('verticality').isLength({ min: 1, max: 32 }),
        check('product').isLength({ min: 1, max: 128 }),
        check('raisondetre').isLength({ min: 1, max: 65000 }),
        check('fulltime').isLength({ min: 1, max: 1 }),
        check('progress').isLength({ min: 1, max: 32 }),
        check('progressPlus').isLength({ min: 1, max: 65000 }),
        check('incorporated').isLength({ min: 1, max: 1 }),
        check('publicity').isLength({ min: 1, max: 1 })
    ], 
    (req, res) => {
        if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
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
);

app.post('/updates/:id',
    [
        check('userLearning').isLength({ min: 1, max: 100 }),
        check('goals').isLength({ min: 1, max: 128 }),
        check('improvement').isLength({ min: 1, max: 65000 }),
        check('biggestObstacle').isLength({ min: 1, max: 100 }),
        check('news').isLength({ min: 1, max: 32 }),
        check('productUpdates').isLength({ min:1, max: 100 }),
        check('marketing').isLength({ min:1, max: 100 }),
        check('hiresFires').isLength({ min:1, max: 100})
    ],  
    (req, res) => {
        if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } 
        
        const id = parseInt(req.params.id);
        const {updateDate, launch, users, userLearning, goals, improvement, biggestObstacle, news, morale, expenses, renvenue, moneyInTheBank, monthlyBurnRate, productUpdates, marketing, offersAccepted, offersDeclined, offersOutstanding, hiresFires} = req.body;
        db.query(
            'INSERT INTO updates (id, updateDate, launch, users, userLearning, goals, improvement, biggestObstacle, news, morale, expenses, revenue, moneyInTheBank, monthlyBurnRate, productUpdates, marketing, offersAccepted, offersDeclined, offersOutstanding, hiresFires) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)',
            [id, updateDate, launch, users, userLearning, goals, improvement, biggestObstacle, news, morale, expenses, renvenue, moneyInTheBank, monthlyBurnRate, productUpdates, marketing, offersAccepted, offersDeclined, offersOutstanding, hiresFires],
            (err, results) => {
                if(err) throw err;
                res.status(201).send(`Company data added with ID: ${results.insertID}`);
            }
        );
    }
);

app.put('/users/cont/:id',
    [
        check('name').isLength({ min: 1, max: 64 }),
        check('email').isLength({ min: 1, max: 64 }),
        check('avatar').isLength({ min: 0, max: 2048 })
    ],
    (req, res) => {
        if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
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
);

app.put('/users/pass/:id',
    [
        check('password').isLength({ min: 6, max: 50 })
    ],
    (req, res) => {
        if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        const id = parseInt(req.params.id);
        const {password} = req.body;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                db.query(
                    'UPDATE users SET passwordhash = $1 WHERE id = $2',
                    [hash, id],
                    (err, results) => {
                        if (err) throw err;
                        res.status(200).send(`Modified with ID: ${id}`);
                    }
                );
            });
        });
    }
)

app.put('/userData/:id',
    [
        check('linkedURL').isLength({ min: 0, max: 2048 }),
        check('githubURL').isLength({ min: 0, max: 2048 }),
        check('eduLVL').isLength({ min: 1, max: 8 }),
        check('expArea').isLength({ min: 1, max: 64 }),
        check('techFounder').isLength({ min: 1, max: 1 }),
        check('coFounder').isLength({ min: 1, max: 1 }),
        check('accomplishments').isLength({ min: 0, max: 65000}),
        check('location').isLength({ min: 1, max: 128 }),
        check('applicationStat').isLength({ min: 1, max: 16 }),
        check('publicity').isLength({ min: 1, max: 1 })
    ],
    (req, res) => {
        if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(JSON.stringify(errors.array()));
            return res.status(422).json({ errors: errors.array() });
        }
        
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
);

app.put('/companyData/:id',
    [
        check('name').isLength({ min: 1, max: 64 }),
        check('site').isLength({ min: 1, max: 2048 }),
        check('description').isLength({ min: 1, max: 65000 }),
        check('verticality').isLength({ min: 1, max: 32 }),
        check('product').isLength({ min: 1, max: 128 }),
        check('raisondetre').isLength({ min: 1, max: 65000 }),
        check('fulltime').isLength({ min: 1, max: 1 }),
        check('progress').isLength({ min: 1, max: 32 }),
        check('progressPlus').isLength({ min: 1, max: 65000 }),
        check('incorporated').isLength({ min: 1, max: 1 }),
        check('publicity').isLength({ min: 1, max: 1 })
    ],
    (req, res) => {
        if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(JSON.stringify(errors.array()));
            return res.status(422).json({ errors: errors.array() });
        }
        
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
);

app.delete('/users/:id', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    const id = parseInt(req.params.id);
    db.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).send(`User deleted with ID: ${id}`);
    });
});

app.delete('/userData/:id', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    const id = parseInt(req.params.id);
    db.query('DELETE FROM userData WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).send(`User data deleted with ID: ${id}`);
    });
});

app.delete('/companyData/:id', (req, res) => {
    if (!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized.' });
    }
    const id = parseInt(req.params.id);
    db.query('DELETE FROM companyData WHERE id = $1', [id], (err, results) => {
        if(err) throw err;
        res.status(200).send(`Company data deleted with ID: ${id}`);
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});