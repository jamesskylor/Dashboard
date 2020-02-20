const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./routes');
//const db = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res)=>{
    res.json({ info: 'API for DashDB' });
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.get('/userData/:id', db.getUDataById);
app.get('/companyData/:id', db.getCDataById);
app.post('/users', db.createUser);
app.post('/userData/:id', db.createUData);
app.post('/companyData/:id', db.createCData);
app.put('/users/:id', db.updateUser);
app.put('/userData/:id', db.updateUData);
app.put('/companyData/:id', db.updateCData);
app.delete('/users/:id', db.deleteUser);
app.delete('/userData/:id', db.deleteUData);
app.delete('/companyData/:id', db.deleteCData);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});