const express = require('express');
const app = express();
const config = require('./config');

app.use(express.json());
app.use('/articles', require('./routes/articles'));

const port = config.port;
app.listen(port, () => console.log(`Running on port ${port}`));

module.exports = app;
