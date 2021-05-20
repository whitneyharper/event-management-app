const mongoose = require('mongoose')

const url = `mongodb+srv://wharper:Jplummer1@cluster0.nsgjo.mongodb.net/EventManagement?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
};

module.exports = function () {
    mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
}
