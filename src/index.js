const express = require('express');
const app = express();
const port = 3000;
const dbSetup = require('./database/setup');
const allRoutes = require('./routes/eventRoutes')

app.use(express.json());

//SETUP DATABASE
dbSetup();

app.use(allRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
