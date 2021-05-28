const express = require('express');
const app = express();
const port = 3000;
const dbSetup = require('./database/setup');

//REQUIRE ROUTES
const allRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes')

//SEEDERS
const {seedAdmin} = require('./seeders/admin')
console.log(seedAdmin())

app.use(express.json());

//SETUP DATABASE
dbSetup();

app.use('/auth', authRoutes);
app.use(allRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
