const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());





app.listen(process.env.PORT || 3002, () => {
    console.log(`Server running on port ${process.env.PORT}.`);
});